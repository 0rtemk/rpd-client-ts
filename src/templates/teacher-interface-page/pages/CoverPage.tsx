import { FC } from 'react';
import { Box } from '@mui/material';
import useStore from '../../../store/useStore';
import Loader from '../../../helperComponents/Loader';

const CoverPage: FC = () => {
    const jsonData = useStore.getState().jsonData;

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
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Название дисциплины</Box>
                <Box>{jsonData.disciplins_name || <Loader />}</Box>
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Направление подготовки</Box>
                <Box>{jsonData.direction || <Loader />}</Box>
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Профиль</Box>
                <Box>{jsonData.profile || <Loader />}</Box>
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Уровень высшего образования</Box>
                <Box>{jsonData.education_level || <Loader />}</Box>
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Форма обучения</Box>
                <Box>{jsonData.education_form || <Loader />}</Box>
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Год обучения</Box>
                <Box>{jsonData.year || <Loader />}</Box>
            </Box>
        </Box>
    );
}

export default CoverPage;