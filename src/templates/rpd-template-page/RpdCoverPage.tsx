import ChangeableCoverPage from './rpd-changeable-elements/ChangeableCoverPage';
import { Box } from '@mui/material';

export default function RpdCoverPage() {
    return (
        <Box>
            <Box component='h2'>Титульный лист</Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <ChangeableCoverPage title="uniName" />
            </Box>
            <Box sx={{ p: 1, border: '1px dashed grey', my: 1 }}>
                <ChangeableCoverPage title="ApprovalField" />
            </Box>
        </Box>
    );
}