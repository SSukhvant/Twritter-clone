"use client"
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!containerRef.current) return;

    const options = {
        scale: 2, // Adjust the scale as needed
        quality: 0.8, // Adjust the quality (0 to 1)
      };

      html2canvas(containerRef.current, options)
      .then((canvas) => {
        // Convert the canvas to a JPEG image with recommended quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        
        // Create a download link
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'myDynamicImage.jpg';
        link.click();
      })
      .catch((error) => {
        console.error('Error creating image:', error);
      });
  };

  return (
    <div>
      <div ref={containerRef} className='h-[400px] w-[400px] bg-[#ffd900]'>
        <p>HTML To Image</p>
      </div>

      <button className="text-white" onClick={handleDownload}>Download Image</button>
    </div>
  );
};

export default Page;
