import { Box, Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import { FC } from "react"

interface BookData {
    title: string;
    author: string;
    biblio: string;
    url: string;
    thumb?: string;
    // ... другие поля, если они есть
  }
  
  interface ShowBooksProps {
    books: BookData[];
    onAddBookToList: (biblio: string) => void;
  }

  
  const ShowBooks: FC<ShowBooksProps> = ({ books, onAddBookToList }) => {
    return (
        <>
            {books.map((book, index) => (
                <>
                    <Box key={index} sx={{ display: "flex" }}>
                        <Box sx={{ width: "120px", py: 2 }}>
                            <Box component="img" src={book.thumb} sx={{ width: "120px" }}></Box>
                        </Box>
                        <Box sx={{ px: 2 }}>
                            <List>
                                <ListItem>
                                    <ListItemText>
                                        <Box component="b">Название: </Box>
                                        {book.title}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Box component="b">Автор: </Box>
                                        {book.author}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Box component="b">Аннотация: </Box>
                                        {book.biblio.replace(/<b>.*?<\/b>|<br>/g, '')}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Box component="b">Ссылка на книгу в библиотечной системе: </Box>
                                        <Box component="a" href={book.url} target="_blank">{book.url}</Box>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                    <Box sx={{textAlign: "end", py: 1}}>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => onAddBookToList(book.biblio.replace(/<b>.*?<\/b>|<br>/g, ''))}
                        >Добавить к списку</Button>
                    </Box>
                    <Divider />
                </>
            ))}
        </>
    )
}

export default ShowBooks;