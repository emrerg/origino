'use client'
import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'; // Import the worker

export default function PDFViewer() {
  const canvasRef = useRef(null);

  const pdfUrl =
    'https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/preview';

  useEffect(() => {
    // Set the worker source
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const loadPDF = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />;
}
