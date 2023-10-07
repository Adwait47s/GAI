// AdminViewInfo.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminViewInfo = () => {
    const [editingDocument, setEditingDocument] = useState(null);
    const [editedContent, setEditedContent] = useState({});
    const [selectedDocument, setSelectedDocument] = useState({});


    const location = useLocation();
    const userEmail = location.state.userEmail;
    const userDoc = location.state.userDoc;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // previous page
    };

    const handleEditClick = (document) => {
        setEditingDocument(document);
        setEditedContent(document.content);
    };


    const handleSaveClick = () => {
        // Handle saving edited content here
        if (editingDocument) {
            // backend , Update the content of the selected document with editedContent
            editingDocument.content = editedContent;
            console.log("Updated content:", editedContent);
        }
        setEditingDocument(null); // Clear editing mode after saving
    };

    const handleCancelClick = () => {
        setEditingDocument(null); // Cancel editing mode
    };

    const handleSummaryClick = (document) => {
        // Set the selected document when clicking the Summary button
        setSelectedDocument(document);
        
        const centerX = (window.innerWidth - 500) / 2;
const centerY = (window.innerHeight - 500) / 2;

const summaryWindow = window.open(
  '',
  '_blank',
  `width=500,height=500,resizable=yes,scrollbars=yes,left=${centerX},top=${centerY}`
);

summaryWindow.document.open();
summaryWindow.document.write(`
  <html>
  <head>
    <title>Summary of ${document.name}</title>
    <!-- Include Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-blue-100 p-4">
    <h2 class="text-2xl font-semibold">Summary of ${document.name}</h2>
    <div class="mt-4">
      <textarea readonly class="w-full h-60 p-2 border border-blue-500 resize-both rounded-md">${document.summary}</textarea>
    </div>
  </body>
  </html>
`);

summaryWindow.document.close();

    };

    const handleDownloadClick = (document) => {
        // backend , Handle downloading the document here
        console.log("Downloading document:", document.name);
    };
    return (
        <div className="p-4 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200">
            <button
                onClick={handleGoBack}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md focus:ring focus:ring-indigo-200"
            >
                Go Back
            </button>
            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Documents Uploaded by {userEmail}
            </h1>

            {/*  code  to display the documents of the selected user */}
            <table className="w-full mt-4 bg-white rounded-lg shadow">
                <thead>
                    <tr>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Name of Document
                        </th>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Last Modified
                        </th>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            File Content
                        </th>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Edit
                        </th>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Summary View
                        </th>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Download
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userDoc.map((document, index) => (
                        <tr
                            key={document.id}
                            className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'
                                } hover:bg-blue-300 transition duration-300`}
                        >
                            <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                {document.name}
                            </td>
                            <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                {document.lastModified}
                            </td>
                            <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                {editingDocument === document ? (
                                    <textarea
                                        value={JSON.stringify(editedContent, null, 2)}
                                        onChange={(e) => setEditedContent(JSON.parse(e.target.value))}
                                        className="w-full h-24 p-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <pre className="p-2">{JSON.stringify(document.content, null, 2).slice(1, -1).trim()}</pre>
                                )}
                            </td>
                            <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                {editingDocument === document ? (
                                    <>
                                        <button
                                            onClick={handleSaveClick}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelClick}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleEditClick(document)}
                                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:ring focus:ring-indigo-200"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                            <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                <button
                                    onClick={() => handleSummaryClick(document)}
                                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:ring focus:ring-indigo-200"
                                >
                                    Summary
                                </button>
                            </td>
                            <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                <button
                                    onClick={() => handleDownloadClick(document)}
                                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:ring focus:ring-indigo-200"
                                >
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Display the selected document summary */}
            {/* <div className="text-center mt-4">
        {selectedDocument.summary && (
          <div>
            <h3 className="text-2xl font-semibold">{`${selectedDocument.name} Summary`}</h3>
            <textarea
              value={selectedDocument.summary}
              readOnly
              className="w-full border border-blue-500 mt-2 resize-both p-2 m-1 rounded-md"
              style={{ minHeight: "100px", minWidth: "100px" }}
            ></textarea>
          </div>
        )}
      </div> */}
        </div>
    );
};

export default AdminViewInfo;
