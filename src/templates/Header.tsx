import { FC, useContext } from 'react';
import defaultUser from "../../public/default-user-img.png";
import { Container, Box, IconButton } from '@mui/material';
import useWindowSize from '../hooks/useWindowSize';
import HeaderMenuMobile from './header/HeaderMenuMobile';
import HeaderLogo from './header/HeaderLogo';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../store/useAuth';
import { Logout } from '@mui/icons-material';

const Header: FC = () => {
    const size = useWindowSize();
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