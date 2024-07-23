import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC, useEffect, useState } from "react";
import useAuth from "../../store/useAuth";
import { TemplateConstructorType } from "../../types/TemplateConstructorTypes";
import showErrorMessage from "../../utils/showErrorMessage";
import Loader from "../../helperComponents/Loader";
import useStore from "../../store/useStore";
import TemplateStatus from "../../helperComponents/TemplateStatus";
import showSuccessMessage from "../../utils/showSuccessMessage";
import { axiosBase } from "../../fetchers/baseURL";

interface TemplateStatusObject {
    date: string,
    status: string,
    user: string
}

interface TemplateData {
    id: number;
    disciplins_name: string;
    faculty: string;
    direction: string;
    profile: string;
    education_level: string;
    education_form: string;
    year: number;
    status: TemplateStatusObject;
}

export interface employedTemplateParams {
    id: number;
    userName: string | undefined;
}

const TeacherInterfaceTemplates: FC<TemplateConstructorType> = ({ setChoise }) => {
    const userName = useAuth.getState().userName;
    const { setJsonData } = useStore();
    const [data, setData] = useState<TemplateData[]>();

    const fetchData = async () => {
        try {
            const response = await axiosBase.post('find-teacher-templates', { userName });
            setData(response.data);
        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
            console.error(error);
        }
    };

    const employedTemplate = async (id: number) => {
        try {
            const params: employedTemplateParams = {
                id,
                userName
            }
            const responce = await axiosBase.post('employed-teacher-template', { params });
            if (responce.data === "success") {
                showSuccessMessage("Статус шаблона успешно изменен");
                fetchData();
            }

        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const uploadTemplateData = async (id: number) => {
        try {
            const response = await axiosBase.post(`rpd-profile-templates`, {id});
            setJsonData(response.data);
            setChoise("coverPage");
        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
            console.error(error);
        }
    }

    if (!data) return <Loader />

    return (
        <Box sx={{
            my: 4,
            p: 2,
            ml: 2,
            backgroundColor: '#fefefe',
            width: "100%"
        }}>
            <Box component="h2" sx={{ py: 1 }}>Выбор шаблона для редактирования</Box>
            <Box sx={{ py: 2, fontSize: "18px", fontWeight: "600" }}>Шаблоны:</Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "600" }}>Название дисциплины</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Институт</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Уровень образования</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Направление обучения</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Профиль</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Форма обучения</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Год набора</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Статус</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Выбрать</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.disciplins_name}</TableCell>
                                <TableCell>{row.faculty}</TableCell>
                                <TableCell>{row.education_level}</TableCell>
                                <TableCell>{row.direction}</TableCell>
                                <TableCell>{row.profile}</TableCell>
                                <TableCell>{row.education_form}</TableCell>
                                <TableCell>{row.year}</TableCell>
                                <TableCell>
                                    <TemplateStatus status={row.status} />
                                </TableCell>
                                <TableCell sx={{ minWidth: "140px" }}>
                                    {row.status.status === "Взят в работу" ?
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            size="small"
                                            onClick={() => uploadTemplateData(row.id)}
                                        >Открыть</Button>
                                        :
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => employedTemplate(row.id)}
                                        >Взять в работу</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TeacherInterfaceTemplates;