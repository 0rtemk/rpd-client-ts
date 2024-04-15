import { useState, useEffect, FC } from 'react';
import axios from "axios";

import useStore from "../../store/store";
import EditableCell from "./changeable-elements/EditableCell";
import EditableNumber from "./changeable-elements/EditableNumber";
import JsonChangeValue from './changeable-elements/JsonChangeValue';
import Loader from "../../helperComponents/Loader";
import {
  Box, Button, ButtonGroup, TableContainer, Table, TableHead,
  TableBody, TableRow, TableCell, Paper
} from '@mui/material';

interface DisciplineContent {
  theme: string;
  lectures: number;
  seminars: number;
  independent_work: number;
}

interface ObjectHours {
  all: number;
  lectures: number;
  seminars: number;
  lect_and_sems: number;
  independent_work: number;
}

interface DisciplineContentData {
  [id: string]: DisciplineContent;
}

const DisciplineContentPage: FC = ()  => {
    const initialData = useStore.getState().jsonData.content as DisciplineContentData | undefined;
    const initialDataLength = initialData ? Object.keys(initialData).length : 0;

    const { updateJsonData } = useStore();
    const [data, setData] = useState<DisciplineContentData | undefined>(initialData);
    const [nextId, setNextId] = useState<number>(initialDataLength);
    const [summ, setSumm] = useState<ObjectHours>({
        all: 0,
        lectures: 0,
        seminars: 0,
        lect_and_sems: 0,
        independent_work: 0
    });

    const summHours = () => {
        let all = 0;
        let lectures = 0;
        let seminars = 0;
        let lect_and_sems = 0;
        let independent_work = 0;

        if (data) {
            Object.keys(data).forEach((key)  => {
                const row = data[key];
                all += row.lectures + row.seminars + row.independent_work;
                lectures += row.lectures;
                seminars += row.seminars;
                lect_and_sems += row.lectures + row.seminars;
                independent_work += row.independent_work;
            });

            setSumm({
                all: all,
                lectures: lectures,
                seminars: seminars,
                lect_and_sems: lect_and_sems,
                independent_work: independent_work
            })
        }
    }

    useEffect(() => {
        summHours();
    }, [data]);

    const handleAddRow = () => {
        setNextId(nextId + 1);
        const newData = { ...data, [nextId]: { theme: '', lectures: '', seminars: '', independent_work: '' } };
        setData(newData);
    };

    const handleValueChange = (id: number, key: string, value: string | number) => {
        if(!data) return;

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

        const filteredData = Object.entries(data).reduce((acc: DisciplineContentData, [key, value]) => {
            if (value.theme || value.lectures || value.seminars || value.independent_work) {
                acc[key] = value;
            }
            return acc;
        }, {});

        try {
            const response = await axios.put(`/api/update-json-value/${fileName}`, {
                fieldToUpdate: "content",
                value: filteredData
            });

            updateJsonData("content", filteredData);
            setData(filteredData);
        } catch (error) {
            console.error(error);
        }
    };

    if (!data) return <Loader />

    return (
        <Box>
            <Box component='h2'>Содержание дисциплины</Box>
            <TableContainer component={Paper} sx={{ my: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small" className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" width="180px">Наименование разделов и тем дисциплины</TableCell>
                            <TableCell align="center" width="70px">Всего (академ. часы)</TableCell>
                            <TableCell align="center" width="70px">Лекции</TableCell>
                            <TableCell align="center" width="120px">Практические (семинарские) занятия</TableCell>
                            <TableCell align="center" width="100px">Всего часов контактной работы</TableCell>
                            <TableCell align="center" width="140px">Самостоятельная работа обучающегося</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(data).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <EditableCell
                                        value={data[row].theme}
                                        onValueChange={(value: string) => handleValueChange(index, 'theme', value)}
                                    />
                                </TableCell>
                                <TableCell style={{ alignContent: 'center', textAlign: 'center' }}>
                                    {data[row].lectures + data[row].seminars + data[row].independent_work}
                                </TableCell>
                                <TableCell>
                                    <EditableNumber
                                        value={data[row].lectures}
                                        onValueChange={(value: number) => handleValueChange(index, 'lectures', value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <EditableNumber
                                        value={data[row].seminars}
                                        onValueChange={(value: number) => handleValueChange(index, 'seminars', value)}
                                    />
                                </TableCell>
                                <TableCell style={{ alignContent: 'center', textAlign: 'center' }}>
                                    {data[row].lectures + data[row].seminars}
                                </TableCell>
                                <TableCell>
                                    <EditableNumber
                                        value={data[row].independent_work}
                                        onValueChange={(value: number) => handleValueChange(index, 'independent_work', value)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>Итого за семестр / курс</TableCell>
                            <TableCell>{summ.all}</TableCell>
                            <TableCell>{summ.lectures}</TableCell>
                            <TableCell>{summ.seminars}</TableCell>
                            <TableCell>{summ.lect_and_sems}</TableCell>
                            <TableCell>{summ.independent_work}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <ButtonGroup variant="outlined" aria-label="Basic button group" size="small">
                <Button onClick={handleAddRow}>Добавить строку</Button>
                <Button onClick={saveData}>Сохранить изменения</Button>
            </ButtonGroup>

            <Box component='h2' sx={{ py: 2 }}>Содержание дисциплины </Box>
            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& ul': {
                    p: 1
                },
                '& li': {
                    ml: "60px",
                },
                '& p': {
                    p: 1
                }
            }}>
                <JsonChangeValue elementName='content_more_text' />
            </Box>
            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& p': {
                    p: 1
                }
            }}>
                <JsonChangeValue elementName='content_template_more_text' />
            </Box>
        </Box>
    );
}

export default DisciplineContentPage;