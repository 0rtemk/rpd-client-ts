import useStore from '../../store/useStore';
import JsonChangeValue from './changeable-elements/JsonChangeValue';
import { Box } from '@mui/material';
import Loader from '../../helperComponents/Loader';
import { FC } from 'react';

const DisciplinePlace: FC = () => {
    const data = useStore.getState().jsonData;

    return (
        <Box>
            <Box component='h2'>Место дисциплины в структуре ОПОП</Box>
            {Object.keys(data).length ? 
                <Box sx={{py: 2}}>
                    Дисциплина 
                    <Box component='span' sx={{ fontWeight: '600' }} > «{data.disciplins_name}» </Box> 
                    относится к 
                    <Box component='span' sx={{ fontWeight: '600' }} > {data.place} </Box> 
                    учебного плана направления 
                    <Box component='span' sx={{ fontWeight: '600' }} > «{data.direction_of_study}» </Box>.
                    Дисциплина преподается в 
                    <Box component='span' sx={{ fontWeight: '600' }} > {data.semester} </Box> 
                    семестре, на 
                    <Box component='span' sx={{ fontWeight: '600' }} > {Math.ceil(Number(data.semester) / 2)} </Box>
                    курсе, форма промежуточной аттестации – 
                    <Box component='span' sx={{ fontWeight: '600' }} > {data.certification}</Box>.
                </Box> : 
                <Loader />
            }

            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <JsonChangeValue elementName='place_more_text'/>
            </Box>
        </Box>
    );
}

export default DisciplinePlace;