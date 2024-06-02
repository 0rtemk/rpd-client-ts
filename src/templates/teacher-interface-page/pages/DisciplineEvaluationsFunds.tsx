import { FC } from 'react';
import JsonChangeValue from '../changeable-elements/JsonChangeValue';
import { Box } from '@mui/material';

const DisciplineEvaluationsFunds: FC = () => {
    return (
        <Box>
            <Box component='h2' sx={{ pb: 2 }}>Фонды оценочных средств по дисциплине</Box>
            <JsonChangeValue elementName='assessment_tools_template'/>
        </Box>
    );
}

export default DisciplineEvaluationsFunds;