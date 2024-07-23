import { FC, useEffect, useState } from "react";
import { TemplateConstructorType } from "../../../types/TemplateConstructorTypes";
import useStore from "../../../store/useStore";
import showErrorMessage from "../../../utils/showErrorMessage";
import Loader from "../../../helperComponents/Loader";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import showSuccessMessage from "../../../utils/showSuccessMessage";
import TemplateStatus from "../../../helperComponents/TemplateStatus";
import useAuth from "../../../store/useAuth";
import TemplateMenu from "./templateMenu/TemplateMenu";
import { axiosBase } from "../../../fetchers/baseURL";

interface TemplateStatusObject {
    date: string,
    status: string,
    user: string
}

interface TemplateData {
    id: number;
    id_profile_template: number;
    discipline: string;
    teachers: string[];
    teacher: string;
    semester: number;
    status: TemplateStatusObject;
}

export interface CreateTemplateDataParams {
    id_1c: number;
    complectId: number | undefined;
    teacher: string;
    year: string | undefined;
    discipline: string;
    userName: string | undefined;
}

const CreateRpdTemplateFrom1CExchange: FC<TemplateConstructorType> = ({ setChoise }) => {
    const selectedTemplateData = useStore.getState().selectedTemplateData;
    const complectId = useStore.getState().complectId;
    const [data, setData] = useState<TemplateData[]>();
    const [selectedTeachers, setSelectedTeachers] = useState<{ [key: number]: string }>({});
    const userName = useAuth.getState().userName;

    const handleChange = (templateId: number) => (event: SelectChangeEvent) => {
        setSelectedTeachers(prevSelectedTeachers => ({
            ...prevSelectedTeachers,
            [templateId]: event.target.value,
        }));
    };

    const fetchData = async () => {
        try {
            const response = await axiosBase.post('find-rpd', { complectId });
            setData(response.data);
        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
            console.error(error);
        }
    };

    const createTemplateData = async (id: number, discipline: string) => {
        const teacher = selectedTeachers[id];
        if (!teacher) {
            showErrorMessage('Ошибка. Необходимо выбрать преподавателя')
            return
        };
        try {
            const params: CreateTemplateDataParams = {
                id_1c: id,
                complectId,
                teacher,
                year: selectedTemplateData.year,
                discipline,
                userName
            };

            const response = await axiosBase.post('create-profile-template-from-1c', { params });

            if (response.data === "record exists") showErrorMessage("Ошибка. Шаблон с текущими данными уже существует");
            if (response.data === "template created") {
                showSuccessMessage("Шаблон успешно создан");
                fetchData();
            };
        } catch (error) {
            showErrorMessage("Ошибка. Не удалось создать шаблон");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) return <Loader />

    return (
        <>
            <Box>Шаг 3. Создание шаблона на основе выгрузки 1C</Box>
            <Box sx={{ py: 2, fontSize: "18px", fontWeight: "600" }}>Шаблоны:</Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "600", fontSize: "18px", py: 2 }}>Название дисциплины</TableCell>
                            <TableCell sx={{ fontWeight: "600", fontSize: "18px", py: 2 }}>Семестр</TableCell>
                            <TableCell sx={{ fontWeight: "600", fontSize: "18px", py: 2 }}>Преподаватель, ответственный за РПД</TableCell>
                            <TableCell sx={{ fontWeight: "600", fontSize: "18px", py: 2 }}>Статус</TableCell>
                            <TableCell sx={{ fontWeight: "600", fontSize: "18px", py: 2 }}>Выбрать</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ maxWidth: "400px" }}>{row.discipline}</TableCell>
                                <TableCell sx={{ maxWidth: "40px" }}>{row.semester}</TableCell>
                                <TableCell>
                                    <FormControl fullWidth variant="outlined" size="small">
                                        <InputLabel id={`select-label-${row.id}`}>Преподаватель</InputLabel>
                                        {row.teacher ?
                                            <Select
                                                labelId={`select-label-${row.id}`}
                                                id={`select-${row.id}`}
                                                value={row.teacher}
                                                label="Преподаватель"
                                                disabled
                                            >
                                                <MenuItem key={row.teacher} value={row.teacher}>
                                                    {row.teacher}
                                                </MenuItem>
                                            </Select> :
                                            <Select
                                                labelId={`select-label-${row.id}`}
                                                id={`select-${row.id}`}
                                                value={selectedTeachers[row.id] || ''}
                                                label="Преподаватель"
                                                onChange={handleChange(row.id)}
                                            >
                                                {row.teachers.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <TemplateStatus status={row.status} />
                                </TableCell>
                                <TableCell>
                                    {row.status.status === "Выгружен из 1С" ?
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => createTemplateData(row.id, row.discipline)}
                                        >Создать шаблон</Button>
                                        :
                                        <TemplateMenu 
                                            id={row.id_profile_template} 
                                            teacher={row.teacher}
                                            status={row.status.status}
                                            fetchData={fetchData}
                                        />
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setChoise("workingType")}>
                Назад
            </Button>
        </>
    )
}

export default CreateRpdTemplateFrom1CExchange;