import { Button, List } from "@mui/material";
import RpdListItemComponent from "./RpdListItem";
import { FC } from "react";
import { RpdListProps } from "../../types/RpdListTypes";

const RpdList: FC<RpdListProps> = ({ RpdListItems, setChoise }) => {
    return (
        <List dense>
            {RpdListItems.map((item) => (
                <RpdListItemComponent key={item.id} id={item.id} text={item.text} setChoise={setChoise} />
            ))}
            <Button sx={{ m: "10px 40px"}} onClick={() => setChoise("selectTemplate")}>Вернуться к выбору шаблона</Button>
        </List>
    );
}

export default RpdList;
