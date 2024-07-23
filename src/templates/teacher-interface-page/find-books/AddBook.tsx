import { ChangeEvent, FC, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShowBooks from './ShowBooks';
import useStore from '../../../store/useStore';
import showSuccessMessage from '../../../utils/showSuccessMessage';
import showErrorMessage from '../../../utils/showErrorMessage';
import { axiosBase } from '../../../fetchers/baseURL';

interface AddBook {
    elementName: string;
}

interface BookData {
    title: string;
    author: string;
    biblio: string;
    url: string;
    thumb?: string;
    // ... другие поля, если они есть
}

const AddBook: FC<AddBook> = ({ elementName }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [bookName, setBookName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const jsonData = useStore.getState().jsonData[elementName];
    const [booksData, setBooksData] = useState<BookData[]>(jsonData);

    const [addedBooks, setAddedBooks] = useState<string[]>([]);
    const { updateJsonData } = useStore();
    const elementValue: string[] = useStore.getState().jsonData[elementName];

    const handleOpenDialog = () => {
        setOpen(true);
        setBooksData([]);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setError(false);
    };

    const handleBookNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBookName(event.target.value);
        if (error) setError(false);
    };

    const handleFindBooks = async () => {
        if (!bookName) {
            setError(true);
            return;
        }
        setError(false);

        try {
            const response = await axiosBase.post('find-books', { bookName });
            setBooksData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const saveContent = async (htmlValue: string[]) => {
        const templateId = useStore.getState().jsonData.id;

        try {
            await axiosBase.put(`update-json-value/${templateId}`, {
                fieldToUpdate: elementName,
                value: htmlValue
            });

            updateJsonData(elementName, htmlValue);
            setAddedBooks(htmlValue);
            showSuccessMessage('Данные успешно сохранены');
        } catch (error) {
            showErrorMessage('Ошибка сохранения данных');
            console.error(error);
        }
        handleCloseDialog();
    };

    const handleAddBookToList = (biblio: string) => {
        saveContent([...addedBooks, biblio]);
    };

    return (
        <>
            <List>
                {elementValue && elementValue.map((biblio, index) => (
                    <ListItem key={index}>
                        <ListItemText>
                            <Box>{biblio}</Box>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>

            <Button
                variant="outlined"
                size="small"
                onClick={handleOpenDialog}
                endIcon={<AddIcon />}
            >
                Добавить
            </Button>

            <Dialog open={open} onClose={handleCloseDialog} sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "800px",
                    },
                },
            }}>
                <DialogTitle>Поиск книг</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ключевые слова"
                        fullWidth
                        variant="standard"
                        value={bookName}
                        onChange={handleBookNameChange}
                        error={error}
                        helperText={error ? 'Ошибка. Поле обязательно для заполнения' : ''}
                    />
                    {booksData && <ShowBooks books={booksData} onAddBookToList={handleAddBookToList} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFindBooks} color="primary">Найти</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddBook;