import { useState, useEffect, useRef, FC, ChangeEvent } from 'react';

interface EditableCellProps {
    value: string;
    onValueChange: (value: string) => void;
}

export const EditableCell: FC<EditableCellProps> = ({ value, onValueChange }) => {
    const [inputValue, setInputValue] = useState<string>(value);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
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