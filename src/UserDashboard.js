import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { userId } = useParams();
  const [pdfLogs, setPdfLogs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [fetchedSummary, setFetchedSummary] = useState('');

  useEffect(() => {
    // Fetch user-specific PDF logs when the component mounts
    fetch(`https://word-extractor-apis.onrender.com/files/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPdfLogs(data);
      })
      .catch((error) => {
        console.error('Error fetching user PDF logs:', error);
      });
  }, [userId]);

  const handleViewSummary = (pdf) => {
    setSelectedPdf(pdf);

    // Fetch the summary from the backend using the fetch API
    fetch(`https://word-extractor-apis.onrender.com/files/${userId}/${pdf.id}/summary`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFetchedSummary(data.summary);
      })
      .catch((error) => {
        console.error('Error fetching summary:', error);
      });
  };

  return (
    <div className="bg-blue-200 h-screen flex flex-col">
      <div className="container mx-auto mt-4 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Welcome User {userId}!</h2>

        {/* PDF Logs Section */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Your Uploaded PDFs</h3>
          <table className="w-full border-collapse border border-blue-500 mt-4">
            <thead>
              <tr>
                <th className="border border-blue-500 p-2">Action</th>
                <th className="border border-blue-500 p-2">Time</th>
                <th className="border border-blue-500 p-2">PDF Name</th>
                <th className="border border-blue-500 p-2">Summary</th>
              </tr>
            </thead>
            <tbody>
              {pdfLogs.map((pdf) => (
                <tr key={pdf.id}>
                  <td className="border border-blue-500 p-2">{pdf.action}</td>
                  <td className="border border-blue-500 p-2">{pdf.time}</td>
                  <td className="border border-blue-500 p-2">{pdf.pdfName}</td>
                  <td className="border border-blue-500 p-2">
                    <button
                      onClick={() => handleViewSummary(pdf)}
                      className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                    >
                      Summary
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PDF Summary Section */}
        {selectedPdf && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">PDF Summary</h3>
            <p>{selectedPdf.pdfName} Summary</p>
            <textarea
              value={fetchedSummary}
              readOnly
              className="w-full border-collapse border border-blue-500 mt-2 resize-both p-1 m-1"
              style={{ minHeight: '100px', minWidth: '100px' }}
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
