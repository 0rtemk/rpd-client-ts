import { useState, useRef, FC } from 'react';
import { Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import axios from 'axios';
import useStore from '../../../store/useStore';
import Loader from '../../../helperComponents/Loader';
import TextEditor from './TextEditor';
import { VariantType, useSnackbar } from 'notistack';

interface JsonChangeValue {
    elementName: string;
}

const JsonChangeValue: FC<JsonChangeValue> = ({ elementName }) => {
    const { updateJsonData } = useStore();
    const elementValue = useStore.getState().jsonData[elementName];
    const { enqueueSnackbar } = useSnackbar();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [changeableValue, setChangeableValue] = useState<string>(elementValue);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const saveContent = async (htmlValue: string) => {
        setIsEditing(false);
        const templateId = useStore.getState().jsonData.id;

        try {
            const response = await axios.put(`/api/update-json-value/${templateId}`, {
                fieldToUpdate: elementName,
                value: htmlValue
            });

            const variant: VariantType = 'success'
            enqueueSnackbar('Данные успешно сохранены', {variant});
            updateJsonData(elementName, htmlValue)
            setChangeableValue(htmlValue);
        } catch (error) {
            const variant: VariantType = 'error'
            enqueueSnackbar('Ошибка сохранения данных', {variant});
        }
    };

    if (!changeableValue) {
        return <Loader />
    }

    const TextareaAutosize = styled(BaseTextareaAutosize)(() => `
        box-sizing: border-box;
        width: 100%;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: #1C2025;
        background: #ffffff;
        border: 1px solid #DAE2ED;
        box-shadow: 0px 2px 2px #F3F6F9;
      
        &:hover {
          border-color: #3399FF;
        }
      
        &:focus {
          border-color: #3399FF;
          box-shadow: 0 0 0 3px #b6daff;
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );

    return (
        <>
            {isEditing ? (
                // <Box>
                //     <TextareaAutosize
                //         ref={textAreaRef}
                //         aria-label="empty textarea"
                //         placeholder="Empty"
                //         id={elementName}
                //         defaultValue={changeableValue}
                //         sx={{my: 1}}
                //     />
                //     <Button
                //         variant="outlined"
                //         size="small"
                //         endIcon={<SaveAltIcon color='primary' />}
                //         onClick={() => handleSaveClick()}
                //     >сохранить изменения</Button>
                // </Box>
                <TextEditor value={changeableValue} saveContent={saveContent} setIsEditing={setIsEditing}/>
            ) : (
                <Box>
                    <Box dangerouslySetInnerHTML={{ __html: changeableValue }} sx={{py: 1}}></Box>
                    <Button
                        variant="outlined"
                        size="small"
                        endIcon={<EditIcon color='primary' />}
                        onClick={() => handleEditClick()}
                    >редактировать</Button>
                </Box>
            )}
        </>
    );
}

export default JsonChangeValue;