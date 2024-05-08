import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './templates/Header';
import Manager from './templates/Manager';
import RPDTemplate from './templates/RPDTemplate';
import TeacherInterface from './templates/TeacherInterface';
import { SnackbarProvider } from 'notistack';


import './styles.css';
import './styles-new.css';

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Header />
          <Routes>
            <Route path="/manager" element={<Manager />} />
            <Route path="/rpd-template" element={<RPDTemplate />} />
            <Route path="/teacher-interface" element={<TeacherInterface />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </>
  )
}

export default App;
