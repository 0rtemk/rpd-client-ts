import { Box } from '@mui/material';
import { FC } from 'react';
import useStore from '../../../store/useStore';

const ScopeDisciplinePage: FC = () => {
    const jsonData = useStore.getState().jsonData;
    const summHours = () => {
        let summ = 0;
        for(let value of jsonData.study_load) {
            summ += Number(value.id);
        }
        return summ;
    }
    
    return (
        <Box>
            <Box component="h2">Объем дисциплины</Box>
            <Box sx={{py: 2}}>
                Объем дисциплины составляет 
                <Box component='span' sx={{ fontWeight: '600' }}> {jsonData.zet} </Box> 
                зачетных единиц, всего 
                <Box component='span' sx={{ fontWeight: '600' }}> {summHours()} </Box> 
                академических часа(ов)
            </Box>
        </Box>
    );
}

export default ScopeDisciplinePage;