import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState, ContentState, Editor } from 'draft-js';
import {
  toggleBold,
  toggleItalic,
  toggleUnderline
} from 'contenido';

interface TextEditorProps {
  value: string;
  saveContent: (htmlValue: string) => Promise<void>;
  cancelEdit: () => void;
}

const TextEditor: FC<TextEditorProps> = ({ value, saveContent, cancelEdit }) => {
  const content = stateFromHTML(value);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(content));
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  const toolbarButtons = [
    { name: 'Bold', handler: toggleBold, icon: <FormatBoldIcon /> },
    { name: 'Italic', handler: toggleItalic, icon: <FormatItalicIcon /> },
    { name: 'Underline', handler: toggleUnderline, icon: <FormatUnderlinedIcon /> },
  ];

  const handleSaveClick = async () => {
    const htmlValue = stateToHTML(editorState.getCurrentContent());
    await saveContent(htmlValue);
  };

  return (
    <>
      <Box sx={{
        border: '1px solid grey',
        width: '100%',
        borderRadius: '5px 5px 0 0',
        mt: 2
      }}
      >
        {toolbarButtons.map(btn => (
          <IconButton
            size="small"
            key={btn.name}
            onMouseDown={(e) => {
              e.preventDefault();
              btn.handler(editorState, setEditorState);
            }}
            style={{
              color: 'black'
            }}
          >
            {btn.icon}
          </IconButton>
        ))}
      </Box>
      <Box
        gap={4}
        p={1}
        sx={{
          border: '1px solid grey',
          borderRadius: '0 5px 5px 5px',
          mb: 2,
          '& .public-DraftStyleDefault-block': {
            margin: '10px 0',
            textIndent: '1.5em',
            lineHeight: '22px'
          },
          '& ol, ul': {
            paddingLeft: '1.5em',
          },
          '& .public-DraftStyleDefault-orderedListItem div': {
            margin: '0',
            textIndent: '0'
          },
          '& .public-DraftStyleDefault-unorderedListItem div': {
            margin: '0',
            textIndent: '0'
          }
        }}
        className='textEditor'
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          ref={editorRef}
        />
      </Box>
      <Button
        variant="outlined"
        size="small"
        endIcon={<SaveAltIcon color='primary' />}
        onClick={handleSaveClick}
      >сохранить изменения</Button>
      <Button
        variant="outlined"
        size="small"
        onClick={cancelEdit}
        sx={{ ml: 1 }}
      >отмена</Button>
    </>
  );
}

export default TextEditor;