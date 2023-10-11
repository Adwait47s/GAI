import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

let uploadedDocumentsAdmin = []; 

const AdminPage = () => {
  const navigate = useNavigate();
  
  const [selectedPdf, setSelectedPdf] = useState(null);

  

  const dummyData = [];
  // JavaScript script to generate dummy data
  // Get the data from the backend
  for (let i = 1; i <= 20; i++) {
    const user = {
      email: `user${i}@gmail.com`,
      documents: [],
    };

    const numDocuments = Math.floor(Math.random() * 9) + 2;

    for (let j = 1; j <= numDocuments; j++) {
      const document = {
        id: j,
        name: `Document ${j}`,
        uploaded: `2023-10-${j < 10 ? '0' + j : j}`,
        lastModified: `2023-10-${j < 10 ? '0' + j : j}`,
        content: {
          asd: "2",
          asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: "2",
          asdfv: "1",
        },
        summary: `Summary of Document ${j}`,
      };
      user.documents.push(document);
    }

    dummyData.push(user);
  }

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
  };

  const handleUpload = async () => {
    if (!selectedPdf) {
      alert('No PDF chosen. Please select a PDF file before uploading.');
      return;
    }
    
    const j = uploadedDocumentsAdmin.length + 1;
    const currentDate = new Date().toLocaleString();
    const pdfName = selectedPdf.name;

    const newDocument = {
      id: j,
      name: pdfName,
      uploaded: currentDate,
      lastModified: currentDate,
      content: {
        asd: "2",
        asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: "2",
        asdfv: "1",
      },
      summary: `Summary of Document ${pdfName}`,
    };

    uploadedDocumentsAdmin.push(newDocument);
    setSelectedPdf(null);
    console.log(uploadedDocumentsAdmin);
  };

  const handleUserClick = (user) => {
    navigate('/AdminViewInfo', { state: { userEmail: user.email, userDoc: user.documents } });
  };

  return (
    <>
      <div className="p-4 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200">
        <h2 className="text-3xl text-center text-gray-800 font-semibold mb-4">Upload Document</h2>
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
                className="rounded-lg border-2 border-black text-black bg-red-300 px-20 py-2 hover:text-white hover:bg-red-500 font-medium active-bg-red-300 active:text-black"
              >
                Clear PDF
              </button>
            </div>
          ) : (
            <div>
              <p className="text-3xl bg-slate my-4">Drop PDF here</p>
              <p className="my-4">or</p>
              <label className="cursor-pointer rounded-lg border-2 border-black text-black bg-blue-300 px-20 py-2 hover:text-white hover-bg-blue-500 font-medium active-bg-blue-300 active:text-black">
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

        <div className="flex flex-col items-center mt-4">
          <button
            onClick={handleUpload}
            className="p-2 m-1 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
          >
            Upload
          </button>
          <button
            className="p-2 m-1 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
            onClick={() => navigate('/AdminDocuments', { state: { AdminDoc :uploadedDocumentsAdmin } })}
          >
            View Uploaded Documents
          </button>
        </div>

        <div className="mt-4"></div>

        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">User List</h1>

        <div className="mt-4"></div>

        <table className="w-full mt-4 bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                User Name
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((user, index) => (
              <tr
                key={user.email}
                onClick={() => handleUserClick(user)}
                className={`cursor-pointer ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'
                  } hover-bg-blue-300 transition duration-300`}
              >
                <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;
