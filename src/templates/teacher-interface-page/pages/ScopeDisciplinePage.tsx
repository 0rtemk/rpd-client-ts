import { Box } from '@mui/material';
import { FC } from 'react';

const ScopeDisciplinePage: FC = () => {
    return (
        <Box>
            <Box component="h2">Объем дисциплины</Box>
            <Box sx={{py: 2}}>
                Объем дисциплины составляет 
                <Box component="span"> 4 </Box> 
                зачетных единиц, всего 
                <Box component="span"> 144 </Box> 
                академических часа(ов)
            </Box>
        </Box>
    );
}

export default ScopeDisciplinePage;