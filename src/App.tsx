import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './templates/Header';
import Manager from './templates/Manager';
import RPDTemplate from './templates/RPDTemplate';
import TeacherInterface from './templates/TeacherInterface';

import RpdCoverPage from './templates/rpd-template-page/RpdCoverPage';

import CoverPage from './templates/teacher-interface-page/CoverPage';
import ApprovalPage from './templates/teacher-interface-page/ApprovalPage';
import AimsPage from './templates/teacher-interface-page/AimsPage';
import DisciplinePlace from './templates/teacher-interface-page/DisciplinePlace';
import PlannedResultsPage from './templates/teacher-interface-page/PlannedResultsPage';
import ScopeDisciplinePage from './templates/teacher-interface-page/ScopeDisciplinePage';
import DisciplineContentPage from './templates/teacher-interface-page/DisciplineContentPage';
import DisciplineSupportPage from './templates/teacher-interface-page/DisciplineSupportPage';
import DisciplineEvaluationsFunds from './templates/teacher-interface-page/DisciplineEvaluationsFunds';
import ResourceSupportPage from './templates/teacher-interface-page/ResourceSupportPage';

import TestPdf from './templates/teacher-interface-page/pdf-page/TestPdf';

import './styles.css';
import './styles-new.css';

function App() {
  return (
    <>
        <Router>
          <Header />
          <Routes>
            <Route path="/manager" element={<Manager />} />
            <Route path="/rpd-template" element={<RPDTemplate />} >
              <Route path="cover-page" element={<RpdCoverPage />} />
            </Route>
            <Route path="/teacher-interface" element={<TeacherInterface />} >
              <Route path="cover-page" element={<CoverPage />} />
              <Route path="approval-page" element={<ApprovalPage />} />
              <Route path="aims-page" element={<AimsPage />} />
              <Route path="discipline-place" element={<DisciplinePlace />} />
              <Route path="discipline-planned-results" element={<PlannedResultsPage />} />
              <Route path="discipline-scope" element={<ScopeDisciplinePage />} />
              <Route path="discipline-content" element={<DisciplineContentPage />} />
              <Route path="discipline-support" element={<DisciplineSupportPage />} />
              <Route path="discipline-evaluations-funds" element={<DisciplineEvaluationsFunds />} />
              <Route path="resource-support" element={<ResourceSupportPage />} />

              <Route path="test-pdf" element={<TestPdf />} />
            </Route>
          </Routes>
        </Router>
    </>
  )
}

export default App;
