import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import useStore from "../../../store/store";
import Loader from "../../../helperComponents/Loader";
import { useNavigate } from "react-router-dom";

interface CreateRpdTemplateFromYear {
    setChoise: (value: string) => void;
}

interface TemplateData {
    id: number;
    disciplins_name: string;
    teacher: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CreateRpdTemplateFromYear: FC<CreateRpdTemplateFromYear> = ({ setChoise }) => {
    const selectedTemplateData = useStore.getState().selectedTemplateData;
    const { setJsonData } = useStore();
    const [data, setData] = useState<TemplateData[]>();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const uploadTempllateData = async (disciplinsName: string, id: number) => {
        console.log(disciplinsName, id);
        try {
            const response = await axios.post('/api/find-or-create-profile-template', {
                disciplinsName,
                id,
            });

            if (response.data.status === "record exists") handleOpen()
            // setJsonData(response.data);
            console.log(response.data);
            // navigate("/teacher-interface");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (!data) return <Loader />

    return (
        <>
            <Box>Шаг 3. Создание шаблона на текущий год на основе выбранного</Box>
            <Box sx={{ py: 2, fontSize: "18px", fontWeight: "600" }}>Шаблоны:</Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "600" }}>Название дисциплины</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Год шаблона</TableCell>
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
                                <TableCell>{selectedTemplateData.year}</TableCell>
                                <TableCell>{row.teacher}</TableCell>
                                <TableCell>Шаблон загружен</TableCell>
                                <TableCell>
                                    <Button variant="outlined" size="small" onClick={() => uploadTempllateData(row.disciplins_name, row.id)}>Создать шаблон</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ fontSize: "20px", fontWeight: "600" }}>Ошибка. Шаблон уже существует</Box>
                    <Box sx={{ py: 2}}>Перейти к шаблону?</Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                        <Button variant="outlined">Перейти</Button>
                        <Button variant="outlined" onClick={handleClose}>Закрыть</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default CreateRpdTemplateFromYear;