import {List} from "@mui/material";
import RpdListItem from "./RpdListItem";
import { FC } from "react";

interface ListItem {
    href: string;
    text: string;
}

interface RpdListProps {
    RpdList: ListItem[];
}

const RpdList: FC<RpdListProps> = ({RpdList}) => {
    return (
        <List dense>
            {RpdList.map((ListItem, index) => {
                return (
                    <RpdListItem key={index} href={ListItem.href} text={ListItem.text}/>
                )
            })}            
        </List>
    )
}

export default RpdList;