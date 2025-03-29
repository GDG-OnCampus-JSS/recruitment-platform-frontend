'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

type FileViewerProps = {
  fileUrl: string;
  className?: string;
};

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const FileViewer: React.FC<FileViewerProps> = ({ fileUrl, className = '' }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: any) => {
    console.error('Failed to load PDF:', error);
    setError('Failed to load PDF document. Please check the URL and CORS configuration.');
  };

  return (
    <div className={`overflow-hidden rounded-lg ${className}`} style={{ width: 290, height: 150 }}>
      {error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : (
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          <Page pageNumber={1} width={300} />
        </Document>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(FileViewer), { ssr: false });
