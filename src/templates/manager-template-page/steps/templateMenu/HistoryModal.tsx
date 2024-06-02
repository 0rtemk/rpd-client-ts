import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface history {
    date: string;
    user: string;
    status: string;
}
interface HistoryModal {
    history: history[];
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}

const HistoryModal: FC<HistoryModal> = ({ history, openDialog, setOpenDialog }) => {
    const formattedDate = (date: string) => format(parseISO(date), 'd MMMM yyyy, HH:mm', { locale: ru });

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>История шаблона</DialogTitle>
            <DialogContent>
                <Box>
                    {history.map((data, index) => (
                        <>
                            <Box key={index} sx={{ p: 1 }}>
                                <Box>{formattedDate(data.date)}</Box>
                                <Box>{data.user}</Box>
                                <Box>{data.status}</Box>
                            </Box>
                            {(index < history.length - 1) &&
                                <Box sx={{textAlign: "center"}}>
                                    <ArrowDownwardIcon fontSize="large"/>
                                </Box>
                            }
                        </>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">Закрыть</Button>
            </DialogActions>
        </Dialog>
    )
}

export default HistoryModal;