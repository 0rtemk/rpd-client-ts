import React, { useState } from 'react';
import { Editor, EditorState, ContentState, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onChange = (state) => {
    setEditorState(state);
    // тут можно вызвать конвертацию в HTML и установить результат в стейт или передать его родительскому компоненту
  };

  const getHtmlOutput = () => {
    const currentContent = editorState.getCurrentContent();
    const rawContentState = convertToRaw(currentContent);
    const markup = stateToHTML(currentContent);
    // Теперь переменная markup содержит HTML, который вы можете использовать
    console.log(markup); // для примера, выводим в консоль
    return markup;
  };

  return (
    <div>
      <Editor editorState={editorState} onChange={onChange} />
      <button onClick={getHtmlOutput}>Convert to HTML</button>
      {/* Вывод HTML можно также отобразить в компоненте, если он вам нужен */}
    </div>
  );
};

export default TextEditor;