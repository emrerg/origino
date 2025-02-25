'use client'
import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

export default function PDFViewer() {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set worker source using CDN
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const loadPDF = async () => {
      try {
        setIsLoading(true);
        
        // Direct link to your PDF file - replace with your actual PDF URL
        const pdfUrl = 'https://origino-journey.s3.us-east-2.amazonaws.com/test-analysis-report.pdf';

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        // Make PDF responsive
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Calculate scale based on device width
        const windowWidth = window.innerWidth;
        const viewport = page.getViewport({ scale: 1.0 });
        const scale = (windowWidth * 0.95) / viewport.width;
        
        const scaledViewport = page.getViewport({ scale });

        // Set canvas dimensions
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setIsLoading(false);
      }
    };

    loadPDF();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      {isLoading && (
        <div className="flex justify-center items-center p-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-auto shadow-lg bg-white"
      />
    </div>
  );
}
