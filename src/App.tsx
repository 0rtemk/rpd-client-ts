import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Header from './templates/Header';
import Manager from './templates/Manager';
import RPDTemplate from './templates/RPDTemplate';
import TeacherInterface from './templates/TeacherInterface';
import { AuthContext } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';
import SignIn from "./pages/SignIn";


import './styles.css';
import './styles-new.css';
import SignUp from './pages/SignUp';


function App() {
  //@NOTE Типизация
  //@ts-expect-error
  const { isUserLogged } = useContext(AuthContext);
  // const isUserLogged = true

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
              <>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </>
            )}
            <Route
              path="*"
              element={<Navigate to={isUserLogged ? "/" : "/sign-in"} />}
            />
          </Routes>
        </Router>
      </SnackbarProvider>
    </>
  )
}

export default App;
