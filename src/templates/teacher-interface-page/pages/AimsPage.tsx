import { FC } from 'react';
import JsonChangeValue from '../changeable-elements/JsonChangeValue';
import { Box } from '@mui/material';

const AimsPage: FC = () => {

    return (
        <Box>
            <Box component='h2' sx={{ pb: 2 }}>Цели и задачи освоения дисциплины</Box>
            <JsonChangeValue elementName='goals' />
        </Box>
    );
}

export default AimsPage;