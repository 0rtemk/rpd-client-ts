import Selectors from "./manager-template-page/Selectors";
import JsonParser from "../store/JsonParser";
import { Container, Box, Divider, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


//тут вообще свалка пока
export default function Manager() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >

            <JsonParser profileServerKey="ivt_bakalavr" />

            <Box
                my={4}
                p={2}
                ml={2}
                sx={{
                    backgroundColor: '#fefefe',
                    width: "100%"
                }}
            >
                <Box component='h2' sx={{ py: 1 }}>Подготовка комплекта РПД функционал РОП</Box>

                <Box sx={{ py: 1, maxWidth: "500px"}}>
                    <Selectors />
                </Box>
                <Divider />
                <Box component='h2' sx={{ py: 1 }}>Создание комплекта РПД на новый учебный год</Box>
                {/* Редактирование комплекта РПД */}
                <Box>
                    <Button>Создать комплект РПД</Button>
                </Box>
                {/* <Box>
                    После нажатия на кнопку загружаются данные и  отображается список из названия дисциплин и
                    преподавателей ответственных за РПД. При клике мыши по дисциплине открывается РПД.
                </Box> */}
                <Box>
                    <table>
                        <tbody>
                            <tr>
                                <th>название дисциплины</th>
                                <th>преподаватель, ответственный за РПД</th>
                                <th>статус</th>
                            </tr>
                            <tr>
                                <td>Введение в программирование</td>
                                <td>
                                    <select name="teachers" id="teachers">
                                        {/* из шаблона РПД прошлого года */}
                                        <option value="">предыдущий год: Беднякова Т.М.</option>
                                        {/* сисок преподавателей из 1С, у кого дисциплина в нагрузке */}
                                        <option value="">Беднякова Т.М.</option>
                                        <option value="">Ушаноква М.Ю.</option>
                                        <option value="">Сычева Т.М.</option>
                                    </select>
                                </td>
                                <td>
                                    шаблон сформирован
                                    {/* отправлена преподавателю
                                в работе
                                загружена преподавателем
                                на согласовании РОП
                                готова к загрузке на сайт
                                загружена на сайт */}
                                </td>
                            </tr>
                            <tr>
                                <td>Информатика</td>
                                <td>
                                    <select name="teachers" id="teachers">
                                        {/* из шаблона РПД прошлого года */}
                                        <option value="">предыдущий год: Бархатова И.А.</option>
                                        {/* сисок преподавателей из 1С, у кого дисциплина в нагрузке */}
                                        <option value="">Бархатова И.А.</option>
                                        <option value="">Крейдер О.А.</option>
                                        <option value="">Черемисина Е.Н.</option>
                                    </select>
                                </td>
                                <td>
                                    шаблон сформирован
                                    {/* отправлена преподавателю
                                в работе
                                загружена преподавателем
                                на согласовании РОП
                                готова к загрузке на сайт
                                загружена на сайт */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
                <Box>
                    <Button>Сохранить изменения</Button>
                    <Button>Отправить РПД преподавателю </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Box>Протокол заседания №</Box>
                        <Box sx={{ px: 2 }}>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/>
                        </Box>
                        <Box>от</Box>
                        <Box sx={{ px: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Basic date picker" slotProps={{ textField: { size: 'small' } }} />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Button>Сохранить изменения</Button>
                </Box>
            </Box>
        </Container>
    );
}