import { FC, useContext } from 'react';
import defaultUser from "../../public/default-user-img.png";
import { Container, Box, Button, IconButton } from '@mui/material';

import useWindowSize from '../hooks/useWindowSize';
import HeaderNavbar from './header/HeaderNavbar';
import HeaderMenuMobile from './header/HeaderMenuMobile';
import HeaderLogo from './header/HeaderLogo';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../store/useAuth';
import { Logout } from '@mui/icons-material';

const Header: FC = () => {
    const size = useWindowSize();
    //@NOTE Типизация
    //@ts-expect-error
    const { handleLogOut, isUserLogged } = useContext(AuthContext);
    const userName = useAuth.getState().userName;

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
            {/* {size.width && size.width > 1090 &&
                <HeaderNavbar />
            } */}
            {size.width && size.width > 1090 && isUserLogged &&
                <Box className='heder-profile'>
                    <Box component='img' src={defaultUser} alt='user logo' />
                    <Box className='header-profile-name'>{ userName }</Box>
                    <IconButton onClick={handleLogOut}>
                        <Logout />
                    </IconButton>
                </Box>
            }
            {size.width && size.width < 1090 &&
                <HeaderMenuMobile />
            }
        </Container>
    );
}

export default Header;