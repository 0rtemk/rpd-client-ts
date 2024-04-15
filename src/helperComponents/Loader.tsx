import { Box, CircularProgress } from '@mui/material';

export default function Loader () {
    return (
        <Box sx={{p: 1, display: 'flex'}}>
            <CircularProgress color="inherit" size="1rem"/> 
            <Box sx={{px: 1}}>
                Loading...
            </Box>
        </Box>
    );
}