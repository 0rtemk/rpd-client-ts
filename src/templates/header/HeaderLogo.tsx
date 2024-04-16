import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const HeaderLogo: FC = () => {
    return (
        <Box sx={{ px: 1 }}>
            <Typography 
                variant="overline" 
                display="block" 
                sx={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "14px"
                }}>
                Конструктор РПД
            </Typography>
        </Box>
    );
}

export default HeaderLogo;