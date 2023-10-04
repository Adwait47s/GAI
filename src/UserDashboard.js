import React, { useState } from 'react';

function UserPage() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfSummary, setPdfSummary] = useState(''); 

  let file
  
  const handlePdfDrop = (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf(file);
    }
  };

  const handlePdfSelect = (event) => {
    file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf(file);
    }
  };

  const clearSelectedPdf = () => {
    setSelectedPdf(null);
    setPdfSummary(''); 
  };

  const handleUpload = () => {
    if (!selectedPdf) {
      alert('No PDF chosen. Please select a PDF file before uploading.');
      return;
    }
    // backend, file should be on backend
    const dummySummary = 'This is a dummy PDF summary.';

    // backend, replace the summary with the backend summary
    setPdfSummary(dummySummary);

    setSelectedPdf(null);
  };

  return (
    <div className="bg-blue-200">
      <h1 className="text-black text-center text-4xl font-bold  py-10">Welcome User !</h1>
      <div
        className="bg-slate-100 text-center mx-96 py-6 border-2 rounded-lg border-black space-y-5"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handlePdfDrop}
      >
        {selectedPdf ? (
          <div>
            <p className="text-2xl bg-slate mb-4">PDF Selected: {selectedPdf.name}</p>
            <button
              onClick={clearSelectedPdf}
              className="rounded-lg border-2 border-black text-black bg-red-300 px-20 py-2 hover:text-white hover:bg-red-500 font-medium active:bg-red-300 active:text-black"
            >
              Clear PDF
            </button>
          </div>
        ) : (
          <div>
            <p className="text-3xl bg-slate my-4">Drop PDF here</p>
            <p className="my-4">or</p>
            <label className="cursor-pointer rounded-lg border-2 border-black text-black bg-blue-300 px-20 py-2 hover:text-white hover:bg-blue-500 font-medium active:bg-blue-300 active:text-black">
              Select PDF from your device
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handlePdfSelect}
              />
            </label>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleUpload}
          className="p-2 m-1 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
        >
          Upload
        </button>
      </div>

      <p className="font-bold mx-32 p-1 m-1">PDF Summary:</p>
      <div className="border-2 border-black mx-32 pb-80 rounded-md pl-2 m-1">
        {pdfSummary}
      </div>
    </div>
  );
}

export default UserPage;
