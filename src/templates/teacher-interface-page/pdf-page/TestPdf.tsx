import axios from 'axios';
import PdfReader from './PdfReader.js';
import { useState } from 'react';
// import useStore from '../../../store/store.jsx';


export default function TestPdf() {
    // const data = useStore.getState().jsonData;
    const [fileName, setFileName] = useState(null);

    const TestPdf = async () => {
        try {
          const response = await axios.get("/api/generate-pdf", { responseType: 'blob' }); 
          setFileName(response.data);
          
          console.log(response.data);
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