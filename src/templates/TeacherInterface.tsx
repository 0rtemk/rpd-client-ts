import { useState } from 'react';
import { Container, Box } from '@mui/material';
import RpdList from './RpdList/RpdList';
import { FC } from 'react';
import { RpdListItems } from './constants/teacherInterfaceItems';

import AimsPage from './teacher-interface-page/AimsPage';
import ApprovalPage from './teacher-interface-page/ApprovalPage';
import CoverPage from './teacher-interface-page/CoverPage';
import DisciplineContentPage from './teacher-interface-page/DisciplineContentPage';
import DisciplineEvaluationsFunds from './teacher-interface-page/DisciplineEvaluationsFunds';
import DisciplinePlace from './teacher-interface-page/DisciplinePlace';
import DisciplineSupportPage from './teacher-interface-page/DisciplineSupportPage';
import PlannedResultsPage from './teacher-interface-page/PlannedResultsPage';
import ResourceSupportPage from './teacher-interface-page/ResourceSupportPage';
import ScopeDisciplinePage from './teacher-interface-page/ScopeDisciplinePage';
import TestPdf from './teacher-interface-page/pdf-page/TestPdf';  // Assuming PDF Test view

const TeacherInterface: FC = () => {
    const [choise, setChoise] = useState<string>("coverPage");

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box minWidth={400} maxWidth={400} my={4} mr={2}>
                <Box height={550} py={1} sx={{ position: "sticky", top: "20px", backgroundColor: '#fefefe' }}>
                    <RpdList RpdListItems={RpdListItems} setChoise={setChoise}/>
                </Box>
            </Box>
            <Box my={4} p={2} ml={2} sx={{ backgroundColor: '#fefefe', width: "100%"}}>
                {choise === "coverPage" && <CoverPage />}
                {choise === "approvalPage" && <ApprovalPage />}
                {choise === "aimsPage" && <AimsPage />}
                {choise === "disciplinePlace" && <DisciplinePlace />}
                {choise === "disciplinePlannedResults" && <PlannedResultsPage />}
                {choise === "disciplineScope" && <ScopeDisciplinePage />}
                {choise === "disciplineContent" && <DisciplineContentPage />}
                {choise === "disciplineSupport" && <DisciplineSupportPage />}
                {choise === "disciplineEvaluationsFunds" && <DisciplineEvaluationsFunds />}
                {choise === "resourceSupport" && <ResourceSupportPage />}
                {choise === "testPdf" && <TestPdf />}
            </Box>
        </Container>
    );
}

export default TeacherInterface;
