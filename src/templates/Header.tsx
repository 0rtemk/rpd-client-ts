import { FC } from 'react';
import defaultUser from "../../public/default-user-img.png";
import { Container, Box } from '@mui/material';

import useWindowSize from '../hooks/useWindowSize';
import HeaderNavbar from './header/HeaderNavbar';
import HeaderMenuMobile from './header/HeaderMenuMobile';
import HeaderLogo from './header/HeaderLogo';

const Header: FC = () => {
    const size = useWindowSize();

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fefefe'
            }}
        >
            <HeaderLogo /> 
            {size.width && size.width > 1090 &&
                <HeaderNavbar />
            }
            {size.width && size.width > 1090 &&
                <Box className='heder-profile'>
                    <Box component='img' src={defaultUser} alt='user logo' />
                    <Box className='header-profile-name'>Беднякова Т. М.</Box>
                </Box>
            }
            {size.width && size.width < 1090 &&
                <HeaderMenuMobile />
            }
        </Container>
    );
}

export default Header;