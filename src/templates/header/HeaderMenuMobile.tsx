import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Menu, MenuItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { BorderColor, Description, ListAlt, AccountCircle, Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import useStore from '../../store/store';

function HeaderMenuMobile() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { jsonData } = useStore();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={
                    <MenuIcon sx={{ color: "black" }} />
                }
                sx={{
                    color: "black",
                    my: "10px"
                }}
            >
                Меню
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ListAlt />
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/manager" style={{ textDecoration: "none" }}>
                            <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                                Интерфейс РОП
                            </Typography>
                        </Link>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose} disabled={Object.keys(jsonData).length ? false : true}>
                    <ListItemIcon>
                        <Description />
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/teacher-interface" style={{ textDecoration: "none" }}>
                            <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                                Интерфейс преподавателя
                            </Typography>
                        </Link>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <BorderColor />
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/rpd-template" style={{ textDecoration: "none" }}>
                            <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                                Шаблон РПД
                            </Typography>
                        </Link>
                    </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem disabled>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                            Беднякова Т. М.
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem disabled>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                            Выйти
                        </Typography>
                    </ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default HeaderMenuMobile;