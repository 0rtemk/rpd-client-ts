import { useState } from 'react';
import { Container, Box } from '@mui/material';
import RpdList from './RpdList/RpdList';
import { FC } from 'react';
import { RpdListItems } from '../constants/teacherInterfaceItems';

import AimsPage from './teacher-interface-page/pages/AimsPage';
import ApprovalPage from './teacher-interface-page/pages/ApprovalPage';
import CoverPage from './teacher-interface-page/pages/CoverPage';
import DisciplineContentPage from './teacher-interface-page/pages/DisciplineContentPage';
import DisciplineEvaluationsFunds from './teacher-interface-page/pages/DisciplineEvaluationsFunds';
import DisciplinePlace from './teacher-interface-page/pages/DisciplinePlace';
import DisciplineSupportPage from './teacher-interface-page/pages/DisciplineSupportPage';
import PlannedResultsPage from './teacher-interface-page/pages/PlannedResultsPage';
import ResourceSupportPage from './teacher-interface-page/pages/ResourceSupportPage';
import ScopeDisciplinePage from './teacher-interface-page/pages/ScopeDisciplinePage';
import TestPdf from './teacher-interface-page/pdf-page/TestPdf';  // Assuming PDF Test view
import TeacherInterfaceTemplates from './teacher-interface-page/TeacherInterfaceTemplates';
import useAuth from '../store/useAuth';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export const TeacherInterface: FC = () => {
    const userRole = useAuth.getState().userRole;
    const [choise, setChoise] = useState<string>(userRole === "rop" ? "coverPage" : "selectTemplate");
    const jsonData = useStore.getState().jsonData;
    const navigate = useNavigate();

    if (!Object.keys(jsonData).length) {
        if (userRole === "rop") navigate("/manager");
        if (userRole === "teacher" && choise !== "selectTemplate") setChoise("selectTemplate");
    }

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {choise === "selectTemplate" ?
                <TeacherInterfaceTemplates setChoise={setChoise} />
                :
                <>
                    <Box minWidth={400} maxWidth={400} my={4} mr={2}>
                        <Box py={1} sx={{ position: "sticky", top: "20px", backgroundColor: '#fefefe' }}>
                            <RpdList RpdListItems={RpdListItems} setChoise={setChoise} />
                        </Box>
                    </Box>
                    <Box my={4} p={2} ml={2} sx={{ backgroundColor: '#fefefe', width: "100%" }}>
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
                </>
            }
        </Container>
    );
}