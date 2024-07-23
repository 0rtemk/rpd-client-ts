import { FC, useEffect, useRef, useState } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import {
  Editor,
  isBold,
  toggleBold,
  isItalic,
  toggleItalic,
  isUnderline,
  toggleUnderline,
  getDefaultKeyBindingFn,
  shortcutHandler,
  isOL,
  isUL,
  toggleOL,
  toggleUL,
  focusOnEditor
} from 'contenido';

import { IconButton, Box, Button } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';

interface TestEditor {
  value: string;
  saveContent: (htmlValue: string) => Promise<void>;
  setIsEditing: (value: boolean) => void;
}

const TextEditor: FC<TestEditor> = ({ value, saveContent, setIsEditing }) => {
  const content = stateFromHTML(value);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(content));
  const editorRef = useRef(null);

  useEffect(() => focusOnEditor(editorRef), [editorRef]);

  const toolbarButtons = [
    { name: 'Bold', handler: toggleBold, detector: isBold, icon: <FormatBoldIcon /> },
    { name: 'Italic', handler: toggleItalic, detector: isItalic, icon: <FormatItalicIcon /> },
    { name: 'Underline', handler: toggleUnderline, detector: isUnderline, icon: <FormatUnderlinedIcon /> },
    { name: 'Ordered List', handler: toggleOL, detector: isOL, icon: <FormatListNumberedIcon /> },
    { name: 'Unordered List', handler: toggleUL, detector: isUL, icon: <FormatListBulletedIcon /> },
  ]

  const handleSaveClick = async () => {
    const htmlValue = stateToHTML(editorState.getCurrentContent());
    saveContent(htmlValue);
  };

  return (
    <>
      <Box sx={{
        border: '1px solid grey',
        width: '180px',
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
              btn.handler(editorState, setEditorState)
            }}
            style={{
              color: btn.detector(editorState) ? 'skyblue' : 'black'
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
          handleKeyCommand={shortcutHandler(setEditorState)}
          keyBindingFn={getDefaultKeyBindingFn}
          editorRef={editorRef}
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
        endIcon={<DeleteIcon color='primary' />}
        onClick={() => setIsEditing(false)}
      >отменить изменения</Button>
    </>
  )
}

export default TextEditor;