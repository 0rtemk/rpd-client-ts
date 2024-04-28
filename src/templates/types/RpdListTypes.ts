export interface RpdListItem {
    id: string;
    text: string;
}

export interface RpdListProps {
    RpdListItems: RpdListItem[];
    setChoise: (choise: string) => void;
}