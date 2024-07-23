import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Header from './templates/Header';
import { AuthContext } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';

import './styles-new.css';
import useAuth from './store/useAuth';
import { Manager } from './templates/Manager';
import { RPDTemplate } from './templates/RPDTemplate';
import { TeacherInterface } from './templates/TeacherInterface';
import { SignIn } from './templates/SignIn';

function App() {
  const { isUserLogged } = useContext(AuthContext);
  const userRole = useAuth.getState().userRole;

  const userRedirect = () => {
    if(!isUserLogged) return "/sign-in";
    if(userRole === "rop") return "/manager";
    if(userRole === "teacher") return "/teacher-interface";
    if(userRole === "admin") return "/rpd-template";
    
    return "/sign-in";
  }

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Header />
          <Routes>
            {isUserLogged ? (
              <>
                <Route path="/manager" element={<Manager />} />
                <Route path="/rpd-template" element={<RPDTemplate />} />
                <Route path="/teacher-interface" element={<TeacherInterface />} />
              </>
            ) : (
              <Route path="/sign-in" element={<SignIn />} />
            )}
            <Route
              path="*"
              element={<Navigate to={userRedirect()} />}
            />
          </Routes>
        </Router>
      </SnackbarProvider>
    </>
  )
}

export default App;
