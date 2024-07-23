import { useState, FC, MouseEvent } from 'react';
import { Button, Box, Menu, MenuItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useStore from '../../../store/useStore';
import TextEditor from './TextEditor';
import showSuccessMessage from '../../../utils/showSuccessMessage';
import showErrorMessage from '../../../utils/showErrorMessage';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DownloadIcon from '@mui/icons-material/Download';
import { axiosBase } from '../../../fetchers/baseURL';

interface JsonChangeValue {
    elementName: string;
}

const JsonChangeValue: FC<JsonChangeValue> = ({ elementName }) => {
    const { updateJsonData } = useStore();
    const elementValue = useStore.getState().jsonData[elementName];

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [changeableValue, setChangeableValue] = useState<string>(elementValue || "");

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const saveContent = async (htmlValue: string) => {
        setIsEditing(false);
        const templateId = useStore.getState().jsonData.id;

        try {
            await axiosBase.put(`update-json-value/${templateId}`, {
                fieldToUpdate: elementName,
                value: htmlValue
            });

            showSuccessMessage('Данные успешно сохранены');
            updateJsonData(elementName, htmlValue)
            setChangeableValue(htmlValue);
        } catch (error) {
            showErrorMessage('Ошибка сохранения данных');
            console.error(error);
        }
    };

    return (
        <Box sx={{ 
            p: 1, 
            border: '1px dashed grey', 
            my: 1, 
            textAlign: 'justify',
            '& ol': {
                p: 1
            },
            '& li': {
                ml: "60px",
            },
            '& p': {
                p: 1,
                textIndent: "1.5em"
            }
        }}>
            {isEditing ? (
                <TextEditor value={changeableValue} saveContent={saveContent} setIsEditing={setIsEditing} />
            ) : (
                <Box>
                    {changeableValue ?
                        <Box dangerouslySetInnerHTML={{ __html: changeableValue }} sx={{ py: 1 }}></Box>
                        :
                        <Box sx={{
                            py: 2,
                            color: "grey",
                            fontStyle: "italic"
                        }}>Данные не найдены</Box>
                    }
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            variant="outlined"
                            size="small"
                            endIcon={<EditIcon color='primary' />}
                            onClick={() => handleEditClick()}
                        >редактировать</Button>
                        <IconButton
                            id="basic-button"
                            size="small"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreHorizIcon sx={{ color: "black" }} />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem disabled>
                                <ListItemIcon>
                                    <DownloadIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                                        Загрузить данные из шаблона<br/> другого года (в разработке)
                                    </Typography>
                                </ListItemText>
                            </MenuItem>
                            <MenuItem disabled>
                                <ListItemIcon>
                                    <DownloadIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="button" display="block" gutterBottom color="grey" m="0">
                                        Загрузить данные из шаблона<br/> другого института (в разработке)
                                    </Typography>
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default JsonChangeValue;