import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import useAuth from "../../store/useAuth";
import { TemplateConstructorType } from "../../types/TemplateConstructorTypes";
import showErrorMessage from "../../utils/showErrorMessage";
import Loader from "../../helperComponents/Loader";
import useStore from "../../store/useStore";
import TemplateStatus from "../../helperComponents/TemplateStatus";
import showSuccessMessage from "../../utils/showSuccessMessage";

interface TemplateStatusObject {
    date: string,
    status: string,
    user: string
}

interface TemplateData {
    id: number;
    disciplins_name: string;
    faculty: string;
    direction_of_study: string;
    profile: string;
    level_education: string;
    form_education: string;
    year: number;
    status: TemplateStatusObject;
}

const TeacherInterfaceTemplates: FC<TemplateConstructorType> = ({ setChoise }) => {
    const userName = useAuth.getState().userName;
    const { setJsonData } = useStore();
    const [data, setData] = useState<TemplateData[]>();

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/find-teacher-templates', {
                userName
            });
            setData(response.data);
        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
        }
    };

    const employedTemplate = async (id: number) => {
        try {
            const responce = await axios.post('/api/employed-teacher-template', {
                id,
                userName
            });
            if (responce.data === "success") {
                showSuccessMessage("Статус шаблона успешно изменен");
                fetchData();
            }

        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const uploadTemplateData = async (id: number) => {
        try {
            const response = await axios.get(`/api/rpd-profile-templates?id=${id}`);
            setJsonData(response.data);
            setChoise("coverPage");
        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
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
                                <TableCell>{row.level_education}</TableCell>
                                <TableCell>{row.direction_of_study}</TableCell>
                                <TableCell>{row.profile}</TableCell>
                                <TableCell>{row.form_education}</TableCell>
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