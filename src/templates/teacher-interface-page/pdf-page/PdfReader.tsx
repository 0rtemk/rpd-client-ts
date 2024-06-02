import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useEffect, useState } from 'react';

export default function PdfReader({ file }) {
  const [defaultLayoutPluginInstance] = useState(defaultLayoutPlugin());
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    if (file) {
      const newFileUrl = URL.createObjectURL(file);
      setFileUrl(newFileUrl);
      return () => {
        URL.revokeObjectURL(newFileUrl);
      };
    }
  }, [file]);
  
  return (
    <>
      {file && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            plugins={[defaultLayoutPluginInstance]}
          ></Viewer>
        </Worker>
      )}
      {!file && <>No file is selected yet</>}
    </>
  );
}