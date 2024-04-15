import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import RpdList from './teacher-interface-page/RpdList/RpdList';
import { FC } from 'react';

interface RpdListItems {
    href: string;
    text: string;
}

const RPDTemplate: FC = () => {
    const RpdListItems: RpdListItems[] = [
        {
            href: "/rpd-template/cover-page",
            text: "Титульный лист"
        }
    ]

    return (
        <Container 
            maxWidth="xl"
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Box
                minWidth={400}
                maxWidth={400}
                my={4}
                mr={2}
            >
                <Box
                    height={550}
                    py={1}
                    sx={{
                        position: "sticky",
                        top: "20px",
                        backgroundColor: '#fefefe'
                    }}
                >
                    <RpdList RpdList={RpdListItems}/>
                </Box>
            </Box>
            <Box
                my={4}
                p={2}
                ml={2}
                sx={{ backgroundColor: '#fefefe', width: "100%"}}
            >
                <Outlet />
            </Box>
        </Container>
    );
}

export default RPDTemplate;