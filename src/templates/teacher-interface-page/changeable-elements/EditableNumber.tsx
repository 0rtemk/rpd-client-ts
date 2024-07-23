import { ChangeEvent, FC, useState } from 'react';

interface EditableNumberProps {
    value: number;
    onValueChange: (value: number) => void;
}

export const EditableNumber: FC<EditableNumberProps> = ({ value, onValueChange }) => {
    const [inputValue, setInputValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        if(value >= 0) setInputValue(value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        onValueChange(inputValue);
    };

    if (isEditing) {
        return (
            <input
                type='number'
                autoFocus
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                style={{width: '100%'}}
            />
        );
    }

    return (
        <div 
            onClick={handleDivClick}
            style={{alignContent: 'center', textAlign: 'center'}}
        >{value}</div>
    );
}