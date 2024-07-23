import { useState } from 'react';
import useStore from '../../../store/useStore.js';
import { Box, Button } from '@mui/material';
import showErrorMessage from '../../../utils/showErrorMessage.js';
import { PdfReader } from './PdfReader.js';
import { axiosBase } from '../../../fetchers/baseURL.js';

export default function TestPdf() {
  const [fileName, setFileName] = useState<Blob | MediaSource | undefined>(undefined);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const TestPdf = async () => {
    setDisableButton(true);
    const id = useStore.getState().jsonData.id;

    const params = {
      id: id
    }
    
    try {
      const response = await axiosBase.get("generate-pdf", { responseType: 'blob', params });
      setFileName(response.data);
    } catch (error) {
      showErrorMessage("Ошибка при загрузке PDF файла. Не все поля шаблона заполнены");
      console.error(error);
    }
    // setDisableButton(false);
  };

  return (
    <Box>
      <Button 
        onClick={() => TestPdf()} 
        variant="outlined" 
        size="small"
        disabled={disableButton}
      >Сформировать PDF файл</Button>
      {fileName && <PdfReader file={fileName} />}
    </Box>
  );
}