
import React, { useState } from "react";

const AdminPage = () => {
  const [pdfLogs, setPdfLogs] = useState([
    // Dummy data for PDF logs for now
    // data from backend
    {
      username: "User1",
      time: "	10/04/2023, 10:30 AM",
      pdfName: "Document1.pdf",
      summary: "This is a windows homepage screenshot",
      action: "Uploaded",
    },
    {
      username: "User2",
      time: "	10/04/2023, 11:45 AM",
      pdfName: "Document2.pdf",
      // summary long for testing purpose
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at purus nec libero facilisis vulputate. Sed in interdum purus. Nulla facilisi. Sed sed risus non arcu gravida malesuada a in turpis. Pellentesque sed mauris nec justo aliquet rhoncus. Sed et libero quis lectus mattis ultrices. Fusce vitae vestibulum nunc. Fusce vitae lacus et tortor vehicula tincidunt vel eget lorem. Nunc efficitur arcu nec turpis blandit, in dignissim risus pharetra. Vestibulum auctor justo at justo feugiat, eget consectetur ligula interdum. Vivamus et lacus eget ligula malesuada egestas vel eu justo Suspendisse sed arcu at justo rhoncus bibendum. Maecenas dapibus arcu id dolor dignissim, in laoreet odio ultricies. .",
      action: "Uploaded",
    },
    {
      username: "User3",
      time: "	10/04/2023, 02:15 PM",
      pdfName: "Document3.pdf",
      summary: "This is a blank document ",
      action: "Uploaded",
    },
    {
      username: "User4",
      time: "	10/04/2023, 03:30 PM",
      pdfName: "Document4.pdf",
      summary: "This is an image of the sky",
      action: "Uploaded",
    },
    {
      username: "User5",
      time: "	10/04/2023, 04:45 PM",
      pdfName: "Document5.pdf",
      summary: "This is a personal Aadhar document",
      action: "Uploaded",
    },
  ]); // state to store PDF logs

  const [selectedPdf, setSelectedPdf] = useState(null); // state to track selected PDF
  const [editing, setEditing] = useState(false); // state to track editing mode
  const [editedSummary, setEditedSummary] = useState(""); // state to store edited summary

  var newPdfLog

  // function to handle PDF upload
  const handlePdfUpload = async (event) => {
    // backend , upload pdf to backend for scan 
    const pdfn = await (event.target.files[0].name) // name of the pdf
    const formattedTime = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });

    newPdfLog = {
      username: "UserX", // backend ,replace with the actual username from backend
      time: formattedTime, 
      pdfName: pdfn,
      summary: "New Summary", // backend, get actual summary from backend
      action: "Uploaded",
    };

  };

  const handlePdfsubmit = () => {
    if (!newPdfLog) {
      alert("No PDF attached. Please select a PDF to upload.");
      return;
    }
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
    setPdfLogs([...pdfLogs, newPdfLog]); // backend, to upload the newly added pdf infomation to logs
  }


  // function to handle viewing PDF summary
  const handleViewSummary = (pdf) => {
    setSelectedPdf(pdf);
    setEditing(false);
  };

  // function to start editing the summary
  const handleEditSummary = () => {
    setEditing(true);
    setEditedSummary(selectedPdf.summary);
  };

  // function to save the edited summary
  const handleSaveSummary = () => {
    const currentTime = new Date().toLocaleString();
    //  new log entry to append on pdf log
    const editedLog = {
      username: "Admin", // backend , username of admin from backend
      time: currentTime,
      pdfName: selectedPdf.pdfName,
      summary: editedSummary,
      action: "Edited",
    };

    // backend , update the PDF summary in pdfLogs state to backend
    const updatedPdfLogs = pdfLogs.map((pdf) =>
      pdf === selectedPdf ? { ...pdf, summary: editedSummary } : pdf
    );

    // backend, append the new log entry to backend
    updatedPdfLogs.push(editedLog);

    setPdfLogs(updatedPdfLogs);
    setEditing(false);
    setSelectedPdf({ ...selectedPdf, summary: editedSummary }); // Update the selectedPdf state with the edited summary
  };

  // function to cancel editing
  const handleCancelEdit = () => {
    setEditing(false);
  };

  return (
    <div className="bg-blue-200 h-screen flex flex-col ">

      <div className="container mx-auto mt-4 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Welcome Admin !</h2>

        {/* PDF Upload Section */}
        <div className="mt-4">
          <label className="text-lg font-semibold">Upload New PDF:</label>
          <div className="flex mt-1">
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfUpload}
              className="border p-2 w-60"
            />
            <button
              onClick={handlePdfsubmit}
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
            >
              Upload
            </button>
          </div>
        </div>

        {/* PDF Logs Section */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">PDF Upload Logs</h3>
          <table className="w-full border-collapse border border-blue-500 mt-4">
            <thead>
              <tr>
                <th className="border border-blue-500 p-2">Username</th>
                <th className="border border-blue-500 p-2">Action</th>
                <th className="border border-blue-500 p-2">Time</th>
                <th className="border border-blue-500 p-2">PDF Name</th>
                <th className="border border-blue-500 p-2">Summary</th>
              </tr>
            </thead>
            <tbody>
              {pdfLogs.map((pdf, index) => (
                <tr key={index}>
                  <td className="border border-blue-500 p-2">{pdf.username}</td>
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
            {editing ? (
              <>
                <textarea
                  value={editedSummary}
                  onChange={(e) => setEditedSummary(e.target.value)}
                  className="w-full border-collapse border border-blue-500 mt-2 resize-both p-1 m-1"
                  style={{ minHeight: "100px", minWidth: "100px" }}
                ></textarea>
                <div className="mt-2">
                  <button
                    onClick={handleSaveSummary}
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white p-2 m-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <textarea
                  value={selectedPdf.summary}
                  readOnly
                  className="w-full border-collapse border border-blue-500 mt-2 resize-both p-1 m-1"
                  style={{ minHeight: "100px", minWidth: "100px" }}
                ></textarea>
                <button
                  onClick={handleEditSummary}
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                >
                  Edit Summary
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
