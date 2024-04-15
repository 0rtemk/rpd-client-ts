import { ListItem, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';
import { FC } from "react";

interface RpdListItems {
    href: string;
    text: string;
}

const RpdListItem: FC<RpdListItems> = ({href, text}) => {
    return (
        <ListItem disableGutters sx={{p: 0}}>
            <ListItemIcon sx={{justifyContent: "right"}}>
                <ListAltIcon />
            </ListItemIcon>
            <ListItemButton component={Link} to={href} color="black">
                <ListItemText primary={
                    <Typography style={{ color: 'black', fontFamily: "Arial", fontSize: "16px" }}>{text}</Typography>
                } />
            </ListItemButton>
        </ListItem>
    )
}

export default RpdListItem;