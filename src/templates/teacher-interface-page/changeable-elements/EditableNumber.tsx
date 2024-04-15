import { useState } from 'react';

function EditableNumber({ value, onValueChange }) {
    const [inputValue, setInputValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const value = Number(e.target.value)
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

export default EditableNumber;