import { FC, useContext, useMemo } from 'react';
import defaultUser from "../../public/default-user-img.png";
import { Container, Box, IconButton } from '@mui/material';
import useWindowSize from '../hooks/useWindowSize';
import HeaderMenuMobile from './header/HeaderMenuMobile';
import HeaderLogo from './header/HeaderLogo';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../store/useAuth';
import { Logout } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: FC = () => {
    const size = useWindowSize();
    const { handleLogOut, isUserLogged } = useContext(AuthContext);
    const userName = useAuth.getState().userName;
    const userRole = useAuth.getState().userRole;

    const getUserRole = useMemo(() => {
        switch (userRole) {
            case "admin":
                return "Администратор";
            case "teacher":
                return "Преподаватель";
            case "rop":
                return "Руководитель образовательной программы";
            default:
                return "Неавторизованный пользователь";
        }
    }, [userRole])

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fefefe',
                height: "80px"
            }}
        >
            <HeaderLogo />
            {size.width && size.width > 1090 && isUserLogged &&
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ px: 1 }}>
                        <AccountCircleIcon sx={{ fontSize: "40px" }} />
                    </Box>
                    <Box>
                        <Box>{userName}</Box>
                        <Box sx={{ fontSize: "12px", fontWeight: 400, color: "#B2B2B2" }}>{getUserRole}</Box>
                    </Box>
                    <Box sx={{ px: 1 }}>
                        <IconButton onClick={handleLogOut}>
                            <Logout />
                        </IconButton>
                    </Box>
                </Box>
            }
            {size.width && size.width < 1090 &&
                <HeaderMenuMobile />
            }
        </Container>
    );
}

export default Header;