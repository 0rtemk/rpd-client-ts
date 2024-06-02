import { FC } from 'react';
import JsonChangeValue from '../changeable-elements/JsonChangeValue';
import { Box } from '@mui/material';

const DisciplineSupportPage: FC = () => {
    return (
        <Box>
            <Box component='h2' sx={{ pb: 2 }}>Перечень учебно-методического обеспечения по дисциплине </Box>
            <JsonChangeValue elementName='methodological_support_template'/>
        </Box>
    );
}

export default DisciplineSupportPage;