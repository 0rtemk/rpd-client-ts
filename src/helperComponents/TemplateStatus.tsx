import { Box } from "@mui/material";
import { FC } from "react";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface TemplateStatusObject {
    date: string,
    status: string,
    user: string
}

interface TemplateStatus {
    status: TemplateStatusObject
}

const TemplateStatus: FC<TemplateStatus> = ({status}) => {
    const formattedDate = format(parseISO(status.date), 'd MMMM yyyy, HH:mm', { locale: ru });
    return (
        <Box>
            <Box>{status.status}</Box>
            <Box sx={{
                color: "grey",
                fontSize: "12px"
            }}>{formattedDate}</Box>
        </Box>
    )
}

export default TemplateStatus;