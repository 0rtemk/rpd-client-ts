import { FC } from 'react';
import JsonChangeValue from './changeable-elements/JsonChangeValue';
import { Box } from '@mui/material';

const AimsPage: FC = () => {

    return (
        <Box>
            <Box component='h2'>Цели и задачи освоения дисциплины</Box>
            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& ol': {
                    p: 1
                },
                '& li': {
                    ml: "60px",
                },
                '& p': {
                    p: 1
                }
            }}>
                <JsonChangeValue elementName='goals' />
            </Box>
        </Box>
    );
}

export default AimsPage;