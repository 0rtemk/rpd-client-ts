import { Link, Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import RpdList from './teacher-interface-page/RpdList/RpdList';
import { FC } from 'react';

interface RpdListItems {
    href: string;
    text: string;
}

const TeacherInterface: FC = () => {
    const RpdListItems: RpdListItems[] = [
        {
            href: "/teacher-interface/cover-page",
            text: "Титульный лист"
        },
        {
            href: "/teacher-interface/approval-page",
            text: "Лист согласования"
        },
        {
            href: "/teacher-interface/aims-page",
            text: "Цели и задачи освоения дисциплины"
        },
        {
            href: "/teacher-interface/discipline-place",
            text: "Место дисциплины в структуре ОПОП"
        },
        {
            href: "/teacher-interface/discipline-planned-results",
            text: "Планируемые результаты обучения по дисциплине (модулю)"
        },
        {
            href: "/teacher-interface/discipline-scope",
            text: "Объем дисциплины"
        },
        {
            href: "/teacher-interface/discipline-content",
            text: "Содержание дисциплины"
        },
        {
            href: "/teacher-interface/discipline-support",
            text: "Перечень учебно-методического обеспечения по дисциплине"
        },
        {
            href: "/teacher-interface/discipline-evaluations-funds",
            text: "Фонды оценочных средств по дисциплине"
        },
        {
            href: "/teacher-interface/resource-support",
            text: "Ресурсное обеспечение"
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
                    <Box>
                        <Link to="/teacher-interface/test-pdf">Тест отпраки pdf</Link>
                    </Box>
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

export default TeacherInterface;