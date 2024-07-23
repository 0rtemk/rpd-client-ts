import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { FC, useState, MouseEvent } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useAuth from "../../../../store/useAuth";
import showErrorMessage from "../../../../utils/showErrorMessage";
import showSuccessMessage from "../../../../utils/showSuccessMessage";
import useStore from "../../../../store/useStore";
import { useNavigate } from "react-router-dom";
import HistoryModal from "./HistoryModal";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HistoryIcon from '@mui/icons-material/History';
import { axiosBase } from "../../../../fetchers/baseURL";

interface TemplateMenu {
    id: number;
    teacher: string;
    status: string;
    fetchData: () => Promise<void>;
}

const TemplateMenu: FC<TemplateMenu> = ({ id, teacher, status, fetchData }) => {
    const { setJsonData } = useStore();
    const userName = useAuth.getState().userName;
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [history, setHistory] = useState(undefined);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const statusValidate = () => {
        if(status === "Отправлен преподавателю" || status === "Взят в работу") return false
        return true
    }

    const sendTemplateToTeacher = async (id: number, teacher: string) => {
        try {
            const responce = await axiosBase.post(`send-template-to-teacher`, {
                id,
                teacher,
                userName
            });

            if (responce.data === "UserNotFound") showErrorMessage("Ошибка. Пользователь не найден");
            if (responce.data === "TemplateAlreadyBinned") showErrorMessage("Ошибка. Данный шаблон уже отправлен преподавателю");
            if (responce.data === "binnedSuccess") {
                showSuccessMessage("Шаблон успешно отправлен преподавателю");
                fetchData();
            };
        } catch (error) {
            showErrorMessage("Ошибка отправки шаблона");
            console.error(error);
        }
    }

    const uploadTemplateData = async () => {
        try {
            const response = await axiosBase.post(`rpd-profile-templates`, { id });
            setJsonData(response.data);
            navigate("/teacher-interface");
        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
            console.error(error);
        }
    }

    const getTemplateHistory = async () => {
        try {
            const response = await axiosBase.post(`get-template-history`, { id });
            setHistory(response.data);
            setOpenDialog(true);
        } catch (error) {
            showErrorMessage('Ошибка при получении данных');
            console.error(error);
        }
    }

    return (
        <>
            <IconButton
                id="basic-button"
                size="small"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreHorizIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => uploadTemplateData()}>
                    <ListItemIcon>
                        <OpenInBrowserIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                            Открыть
                        </Typography>
                    </ListItemText>
                </MenuItem>
                {statusValidate() &&
                    <MenuItem onClick={() => sendTemplateToTeacher(id, teacher)}>
                        <ListItemIcon>
                            <ReplyIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                                Отправить преподавателю
                            </Typography>
                        </ListItemText>
                    </MenuItem>
                }
                <MenuItem>
                    <ListItemIcon>
                        <DeleteForeverIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                            Удалить
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => getTemplateHistory()}>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                            История шаблона
                        </Typography>
                    </ListItemText>
                </MenuItem>
            </Menu>
            {history && <HistoryModal history={history} openDialog={openDialog} setOpenDialog={setOpenDialog}/>}
        </>
    )
}

export default TemplateMenu;