import { useState, useRef, FC } from 'react';
import { Button, Box, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import axios from 'axios';
import useStore from '../../../store/store';
import Loader from '../../../helperComponents/Loader';
import TextEditor from './TextEditor';
import { AlertColor } from '@mui/material/Alert';

interface AlertInfo {
    show: boolean;
    type: AlertColor;
    message: string;
}

interface JsonChangeValueProps {
    elementName: string;
    editable?: boolean;
}

const JsonChangeValue: FC<JsonChangeValueProps> = ({ elementName, editable = true }) => {   
    const fileName = "ivt_bakalavr";
    const { updateJsonData } = useStore();
    const elementValue = useStore.getState().jsonData[elementName];

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [changeableValue, setChangeableValue] = useState<string>(elementValue);
    const [alertInfo, setAlertInfo] = useState<AlertInfo>({ show: false, type: 'success', message: '' });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    const saveContent = async (htmlValue: string) => {
        setIsEditing(false);
        try {
            const response = await axios.put(`/api/update-json-value/${fileName}`, {
                fieldToUpdate: elementName,
                value: htmlValue
            });
            
            updateJsonData(elementName, htmlValue);
            setChangeableValue(htmlValue);
            setAlertInfo({ show: true, type: 'success', message: 'Изменения успешно сохранены.' });
        } catch (error) {
            console.error(error);
            setAlertInfo({ show: true, type: 'error', message: 'Ошибка сохранения изменений' });
        }        
    };

    if (!changeableValue) {
        return <Loader />;
    }

    return (
        <>
            {alertInfo.show && (
                <Alert severity={alertInfo.type} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                    {alertInfo.message}
                </Alert>
            )}
            {isEditing ? (
                <TextEditor value={changeableValue} saveContent={saveContent} cancelEdit={cancelEdit} />
            ) : (
                <Box>
                    <Box dangerouslySetInnerHTML={{ __html: changeableValue }} sx={{py: 1}}></Box>
                    {editable && (
                    <Button
                        variant="outlined"
                        size="small"
                        endIcon={<EditIcon color='primary' />}
                        onClick={handleEditClick}
                    >редактировать</Button>
                    )}
                </Box>
            )}
        </>
    );
}

export default JsonChangeValue;
