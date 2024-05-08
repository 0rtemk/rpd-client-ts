import axios from 'axios';
import PdfReader from './PdfReader.js';
import { useState } from 'react';

export default function TestPdf() {
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  const TestPdf = async () => {
    try {
      const response = await axios.get("/api/generate-pdf", { responseType: 'blob' });
      setFileName(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке PDF файла:', error);
    }
  };

  return (
    <div>
      <button onClick={() => TestPdf()}>Создать и отправить pdf</button>
      {fileName && <PdfReader file={fileName} />}
    </div>
  );
}