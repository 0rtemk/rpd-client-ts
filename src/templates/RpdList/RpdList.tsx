import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import RpdListItemComponent from "./RpdListItem";
import { FC } from "react";
import { RpdListProps } from "../../types/RpdListTypes";
import Can from "../../ability/Can";
import { useNavigate } from "react-router-dom";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useStore from "../../store/useStore";

const RpdList: FC<RpdListProps> = ({ RpdListItems, setChoise }) => {
    const jsonData = useStore.getState().jsonData;
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ py: 1 }}>
                <SimpleTreeView>
                    <TreeItem itemId="disciplins_name" label={jsonData.disciplins_name} sx={{px: 3}}>
                        <TreeItem itemId="direction" label={`${jsonData.direction}, ${jsonData.profile}`} disabled />
                        <TreeItem itemId="education_level" label={`Уровень образования - ${jsonData.education_level}`} disabled />
                        <TreeItem itemId="education_form" label={`Форма обучения - ${jsonData.education_form}`} disabled />
                        <TreeItem itemId="year" label={`Год набора - ${jsonData.year}`} disabled />
                    </TreeItem>
                </SimpleTreeView>
            </Box>
            <Divider />
            <List dense>
                {RpdListItems.map((item) => (
                    <RpdListItemComponent key={item.id} id={item.id} text={item.text} setChoise={setChoise} />
                ))}
            </List>
            <Divider />
            <List dense>
                <Can I="get" a="teacher_interface">
                    <ListItem disableGutters sx={{ p: 0 }}>
                        <ListItemIcon sx={{ pl: 3 }}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemButton onClick={() => setChoise("selectTemplate")} sx={{ color: 'black', px: 0 }}>
                            <ListItemText primary={
                                <Typography style={{ color: 'black', fontFamily: "Arial", fontSize: "16px" }}>Вернуться к выбору шаблона</Typography>
                            } />
                        </ListItemButton>
                    </ListItem>
                </Can>
                <Can I="get" a="rop_interface">
                    <ListItem disableGutters sx={{ p: 0 }}>
                        <ListItemIcon sx={{ pl: 3 }}>
                            <PictureAsPdfIcon />
                        </ListItemIcon>
                        <ListItemButton onClick={() => setChoise("testPdf")} sx={{ color: 'black', px: 0 }}>
                            <ListItemText primary={
                                <Typography style={{ color: 'black', fontFamily: "Arial", fontSize: "16px" }}>Сформировать PDF</Typography>
                            } />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters sx={{ p: 0 }}>
                        <ListItemIcon sx={{ pl: 3 }}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemButton onClick={() => navigate("/manager")} sx={{ color: 'black', px: 0 }}>
                            <ListItemText primary={
                                <Typography style={{ color: 'black', fontFamily: "Arial", fontSize: "16px" }}>Вернуться в менеджер шаблонов</Typography>
                            } />
                        </ListItemButton>
                    </ListItem>
                </Can>
            </List>
        </>
    );
}

export default RpdList;
