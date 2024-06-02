import { ListItem, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { FC } from "react";
import { RpdListItem as RpdListItemProps } from "../../types/RpdListTypes";

const RpdListItem: FC<RpdListItemProps & { setChoise: (choise: string) => void }> = ({ id, text, setChoise }) => {
    return (
        <ListItem disableGutters sx={{ p: 0 }}>
            <ListItemIcon sx={{ pl: 3 }}>
                <ListAltIcon />
            </ListItemIcon>
            <ListItemButton onClick={() => setChoise(id)} sx={{ color: 'black', px: 0 }} disabled={id === "approvalPage"}>
                <ListItemText primary={
                    <Typography style={{ color: 'black', fontFamily: "Arial", fontSize: "16px" }}>{text}</Typography>
                } />
            </ListItemButton>
        </ListItem>
    );
}

export default RpdListItem;