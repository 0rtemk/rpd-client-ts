import { FC } from 'react';
import { Box } from '@mui/material';
import JsonChangeValue from './changeable-elements/JsonChangeValue';

const CoverPage: FC = () => {
    return (
        <Box>
            <Box component='h2'>Титульный лист</Box>
            <Box sx={{ py: 2 }}>
                Федеральное государственное бюджетное образовательное учреждение 
                высшего образования Университет «Дубна» (государственный университет «Дубна»)
            </Box>
            <Box sx={{ py: 2 }}>
                Институт системного анализа и управления<br />
            </Box>
            <Box sx={{ py: 2 }}>
                Кафедра распределенных информационно-вычислительных систем<br />
            </Box>
            <Box sx={{ py: 2 }}>
                Утверждаю <br />
                и.о. проректора по учебно-методической работе <br />
                __________________/ Анисимова О.В. <br />
                __________________202_ год <br />
            </Box>
            <Box sx={{ fontWeight: '600', py: 2}}>Рабочая программа дисциплины</Box>
            <Box sx={{ p: 1, border: '1px solid grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Название дисциплины</Box>
                <JsonChangeValue elementName='disciplins_name' editable={false}/>
            </Box>
            <Box sx={{ p: 1, border: '1px solid grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Направление подготовки</Box>
                <JsonChangeValue elementName='direction_of_study' editable={false}/>
            </Box>
            <Box sx={{ p: 1, border: '1px solid grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Профиль</Box>
                <JsonChangeValue elementName='profile' editable={false}/>
            </Box>
            <Box sx={{ p: 1, border: '1px solid grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Уровень высшего образования</Box>
                <JsonChangeValue elementName='level_education' editable={false}/>
            </Box>
            <Box sx={{ p: 1, border: '1px solid grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Форма обучения</Box>
                <JsonChangeValue elementName='form_education' editable={false}/>
            </Box>
            <Box sx={{ p: 1, border: '1px solid grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>год обучения</Box>
                <JsonChangeValue elementName='year' editable={false}/>
            </Box>
        </Box>
    );
}

export default CoverPage;
