import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Header from './templates/Header';
import Manager from './templates/Manager';
import RPDTemplate from './templates/RPDTemplate';
import TeacherInterface from './templates/TeacherInterface';
import { AuthContext } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';
import SignIn from "./templates/SignIn";

import './styles.css';
import './styles-new.css';
import useAuth from './store/useAuth';

function App() {
  //@NOTE Типизация
  //@ts-expect-error
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
