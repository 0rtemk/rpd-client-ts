import useStore from "../../store/store";
import axios from "axios";
import { FC, useState } from 'react';
import EditableCell from "./changeable-elements/EditableCell";
import { Box, Button, ButtonGroup, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Loader from "../../helperComponents/Loader";
import { PlannedResultsData } from "../types/DisciplineContentPageTypes";

const PlannedResultsPage: FC = () => {
    const initialData = useStore.getState().jsonData.competencies as PlannedResultsData | undefined;
    const initialDataLength = initialData ? Object.keys(initialData).length : 0;

    const { updateJsonData } = useStore();
    const [data, setData] = useState<PlannedResultsData | undefined>(initialData);
    const [nextId, setNextId] = useState<number>(initialDataLength);

    const handleAddRow = () => {
        setNextId(nextId + 1);
        const newData = { ...data, [nextId]: { competence: '', indicator: '', results: '' } };
        setData(newData);
    };

    const handleValueChange = (id: number, key: string, value: string) => {
        if (!data) return;

        const newData = {
            ...data,
            [id]: {
                ...data[id],
                [key]: value,
            },
        };
        setData(newData);
    };

    const saveData = async () => {
        if(!data) return;
        //change this later
        const fileName = "ivt_bakalavr";

        const filteredData = Object.entries(data).reduce((acc: PlannedResultsData, [key, value]) => {
            if (value.competence || value.indicator || value.results) {
                acc[key] = value;
            }
            return acc;
        }, {});

        try {
            const response = await axios.put(`/api/update-json-value/${fileName}`, {
                fieldToUpdate: "competencies",
                value: filteredData
            });

            updateJsonData("competencies", filteredData);
            setData(filteredData);
        } catch (error) {
            console.error(error);
        }
    };

    if (!data) return <Loader />

    return (
        <Box>
            <Box component='h2'>Планируемые результаты обучения по дисциплине (модулю)</Box>
            <TableContainer component={Paper} sx={{ my: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small" className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                Формируемые компетенции(код и наименование)
                            </TableCell>
                            <TableCell align="center">
                                Индикаторы достижения компетенций (код и формулировка)
                            </TableCell>
                            <TableCell align="center">
                                Планируемые результаты обучения по дисциплине (модулю)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(data).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <EditableCell
                                        value={data[row].competence}
                                        onValueChange={(value: string) => handleValueChange(index, 'competence', value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <EditableCell
                                        value={data[row].indicator}
                                        onValueChange={(value: string) => handleValueChange(index, 'indicator', value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <EditableCell
                                        value={data[row].results}
                                        onValueChange={(value: string) => handleValueChange(index, 'results', value)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ButtonGroup variant="outlined" aria-label="Basic button group" size="small">
                <Button onClick={handleAddRow}>Добавить строку</Button>
                <Button onClick={saveData}>Сохранить изменения</Button>
            </ButtonGroup>
        </Box>
    );
}

export default PlannedResultsPage;