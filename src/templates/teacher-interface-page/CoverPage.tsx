import { FC } from 'react';
import JsonChangeValue from './changeable-elements/JsonChangeValue';
import { Box } from '@mui/material';
import useStore from '../../store/useStore';
import Loader from '../../helperComponents/Loader';

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
                { jsonData.disciplins_name ? 
                    <Box>{jsonData.disciplins_name}</Box> : 
                    <Loader />
                }
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Направление подготовки</Box>
                { jsonData.direction_of_study ? 
                    <Box>{jsonData.direction_of_study}</Box> : 
                    <Loader />
                }
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Профиль</Box>
                { jsonData.profile ? 
                    <Box>{jsonData.profile}</Box> : 
                    <Loader />
                }
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Уровень высшего образования</Box>
                { jsonData.level_education ? 
                    <Box>{jsonData.level_education}</Box> : 
                    <Loader />
                }
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Форма обучения</Box>
                { jsonData.form_education ? 
                    <Box>{jsonData.form_education}</Box> : 
                    <Loader />
                }
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <Box sx={{ fontWeight: '600' }}>Год обучения</Box>
                { jsonData.year ? 
                    <Box>{jsonData.year}</Box> : 
                    <Loader />
                }
            </Box>
        </Box>
    );
}

export default CoverPage;