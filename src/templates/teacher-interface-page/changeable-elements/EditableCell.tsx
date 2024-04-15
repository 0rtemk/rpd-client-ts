import { useState, useEffect, useRef } from 'react';

function EditableCell({ value, onValueChange }) {
    const [inputValue, setInputValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + "px";
        }
    }, [isEditing, inputValue]);

    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        onValueChange(inputValue);
    };

    if (isEditing) {
        return (
            <textarea
                ref={textAreaRef}
                autoFocus
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                style={{ height: "auto", overflowY: "hidden" }}
            />
        );
    }

    return (
        <div 
            onClick={handleDivClick}
            style={{ whiteSpace: 'pre-wrap' }}
        >{value}</div>
    );
}

export default EditableCell;