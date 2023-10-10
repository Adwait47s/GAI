import React, { useState, useEffect } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid';

function UserPage() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfSummary, setPdfSummary] = useState('');
  const [documents, setDocuments] = useState([]);
  const [jwtToken] = useState(localStorage.getItem('jwtToken'));

  const fetchDocuments = async () => {
    try {
      const response = await fetch('https://word-extractor-apis.onrender.com/files', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDocuments(data.files);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []); // Fetch documents when the component mounts

  const handlePdfDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf(file);
    }
  };

  const handlePdfSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf(file);
    }
  };

  const clearSelectedPdf = () => {
    setSelectedPdf(null);
    setPdfSummary('');
  };

  const handleUpload = async () => {
    if (!selectedPdf) {
      alert('No PDF chosen. Please select a PDF file before uploading.');
      return;
    }
    const storageRef = ref(storage, `${selectedPdf.name + v4()}`);
    uploadBytes(storageRef, selectedPdf).then(( ) => {
      alert('Uploaded a file!');
    });

    

    const formData = new FormData();
    formData.append('file_name', selectedPdf.name);
    formData.append('file_content', null);
    formData.append('file_link', 'link');

    try {
      const response = await fetch('https://word-extractor-apis.onrender.com/files', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Successful upload, fetch documents again to update the table
        fetchDocuments();
      } else {
        // Handle upload error
        const errorData = await response.json();
        console.error('Upload error:', errorData.message || 'An error occurred during upload.');
      }
    } catch (error) {
      console.error('Network error during upload:', error);
    } finally {
      clearSelectedPdf();
    }
  };


  return (
    <div className="bg-blue-200 h-screen p-8">
      <h1 className="text-black text-center text-4xl font-bold  py-10">Welcome User!</h1>
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

      {/* <p className="font-bold mx-32 p-1 m-1">PDF Summary:</p>
      <div className="border-2 border-black mx-32 pb-80 rounded-md pl-2 m-1">
        {pdfSummary}
      </div> */}
      {documents === null ? (
        <p className="text-center text-2xl mt-4">Loading...</p>
      ) : documents.length === 0 ? (
        <p className="text-center text-2xl mt-4">No documents available.</p>
      ):(
        <table className="w-full border-collapse border border-blue-500 mt-4">
          <thead>
            <tr>
              <th className="border border-blue-500 p-2">Document Name</th>
              <th className="border border-blue-500 p-2">Updated Date (IST)</th>
              <th className="border border-blue-500 p-2">Content</th>
              <th className="border border-blue-500 p-2">Download Link</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id}>
                <td className="border border-blue-500 p-2">{document.name}</td>
                <td className="border border-blue-500 p-2">
                  {new Date(document.updated_at).toLocaleString('en-US', {
                    timeZone: 'Asia/Kolkata',
                  })}
                </td>
                <td className="border border-blue-500 p-2">{JSON.stringify(document.content)}</td>
                <td className="border border-blue-500 p-2">
                  <a href={document.link} download>
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserPage;
