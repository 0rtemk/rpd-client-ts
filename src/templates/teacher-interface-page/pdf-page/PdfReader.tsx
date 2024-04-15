import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfReader({ file }) {
  return (
    <div className="container">
      <h5>View PDF</h5>
      <div className="viewer">
        {file && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={URL.createObjectURL(file)}></Viewer>
          </Worker>
        )}
        {!file && <>No file is selected yet</>}
      </div>
    </div>
  );
}