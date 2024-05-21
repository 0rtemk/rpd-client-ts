import { createContext, useState, useEffect } from "react";
import axios from "axios";
import inMemoryJWT from "../utils/inMemoryJWT";
import config from "../config";
import Loader from "../helperComponents/Loader";
import showErrorMessage from "../utils/showErrorMessage";
import useAuth from "../store/useAuth";

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});

export const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/resource`,
});

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthContext = createContext({});

//@NOTE Типизация
//@ts-expect-error
const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [data, setData] = useState();
  const { updateAbility, updateUserName } = useAuth();

  const handleFetchProtected = () => {
    ResourceClient.get("/protected")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => showErrorMessage(error.response.data.error));
  };

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then(() => {
        setIsUserLogged(false);
        inMemoryJWT.deleteToken();
        updateAbility();
        updateUserName(undefined);
        setData(undefined);
      })
      .catch((error) => showErrorMessage(error.response.data.error));
  };

  //@NOTE Типизация
  //@ts-expect-error
  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      })
      .catch((error) => showErrorMessage(error.response.data.error));
  };

  //@NOTE Типизация
  //@ts-expect-error
  const handleSignIn = (data) => {
    AuthClient.post("/sign-in", data)
      .then((res) => {
        const { fullname, role, accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        updateAbility(role);
        updateUserName(fullname);
        setIsUserLogged(true);
      })
      .catch((error) => showErrorMessage(error.response.data.error));
  };

  useEffect(() => {
    AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsAppReady(true);
        setIsUserLogged(false);
      });
  }, []);

  useEffect(() => {
    //@NOTE Типизация
    //@ts-expect-error
    const handlePersistedLogOut = (event) => {
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    window.addEventListener("storage", handlePersistedLogOut);

    return () => {
      window.removeEventListener("storage", handlePersistedLogOut);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isAppReady,
        isUserLogged,
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <>
          <Loader />
        </>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
