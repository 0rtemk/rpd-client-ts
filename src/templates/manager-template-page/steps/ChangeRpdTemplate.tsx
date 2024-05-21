import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import useStore from "../../../store/useStore";
import Loader from "../../../helperComponents/Loader";
import { useNavigate } from "react-router-dom";
import { VariantType, enqueueSnackbar } from "notistack";

interface ChangeRpdTemplate {
    setChoise: (value: string) => void;
}

interface TemplateData {
    id: number;
    disciplins_name: string;
    teacher: string;
}

const ChangeRpdTemplate: FC<ChangeRpdTemplate> = ({ setChoise }) => {
    const selectedTemplateData = useStore.getState().selectedTemplateData;
    const { setJsonData } = useStore();
    const [data, setData] = useState<TemplateData[]>();
    const navigate = useNavigate();

    const fetchData = async () => {
        const params = {
            faculty: selectedTemplateData.faculty,
            levelEducation: selectedTemplateData.levelEducation,
            directionOfStudy: selectedTemplateData.directionOfStudy,
            profile: selectedTemplateData.profile,
            formEducation: selectedTemplateData.formEducation,
            year: Number(selectedTemplateData.year)
        };

        try {
            const response = await axios.get('/api/find-by-criteria', { params });
            setData(response.data);
        } catch (error) {
            const variant: VariantType = 'error'
            enqueueSnackbar('Ошибка при получении данных', {variant});
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const uploadTempllateData = async (id: number) => {
        try {
            const response = await axios.get(`/api/rpd-profile-templates?id=${id}`);
            setJsonData(response.data);
            navigate("/teacher-interface");
        } catch (error) {
            const variant: VariantType = 'error'
            enqueueSnackbar('Ошибка при получении данных', {variant});
        }
    }

    if (!data) return <Loader />

    return (
        <>
            <Box>Шаг 3. Выбор шаблона для редактирования</Box>
            <Box sx={{ py: 2, fontSize: "18px", fontWeight: "600" }}>Шаблоны:</Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "600" }}>Название дисциплины</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Преподаватель, ответственный за РПД</TableCell>
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
                                <TableCell>{row.teacher}</TableCell>
                                <TableCell>Шаблон сформирован</TableCell>
                                <TableCell>
                                    <Button variant="outlined" size="small" onClick={() => uploadTempllateData(row.id)}>Выбрать шаблон</Button>
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
    );
}

export default ChangeRpdTemplate;