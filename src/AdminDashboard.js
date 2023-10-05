import React, { useState } from 'react';

const AdminPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingDocument, setEditingDocument] = useState(null);
  const [editedContent, setEditedContent] = useState({});
  const [selectedDocument, setSelectedDocument] = useState({});

  const dummyData = [
    {
      email: 'user1@example.com',
      documents: [
        {
          id: 1,
          name: 'Document 1',
          lastModified: '2023-10-05',
          content: {
            "asd": "2",
            "asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa": "2",
            "asdfv": "1"
          },
          summary: 'Summary of Document 1',
        },
        {
          id: 2,
          name: 'Document 2',
          lastModified: '2023-10-06',
          content: {
            "asd": "2",
            "asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa": "2",
            "asdfv": "1"
          },
          summary: 'Summary of Document 2',
        },
      ],
    },
    {
      email: 'user2@example.com',
      documents: [
        {
          id: 3,
          name: 'Document 3',
          lastModified: '2023-10-07',
          content: {
            "asd": "2",
            "asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa": "2",
            "asdfv": "1"
          },
          summary: 'Summary of Document 3',
        },
        {
          id: 4,
          name: 'Document 4',
          lastModified: '2023-10-08',
          content: {
            "asd": "2",
            "asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa": "2",
            "asdfv": "1"
          },
          summary: 'Summary of Document 4',
        },
      ],
    },
    {
      email: 'user3@example.com',
      documents: [
        {
          id: 5,
          name: 'Document 5',
          lastModified: '2023-10-09',
          content: {
            "asd": "2",
            "asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa": "2",
            "asdfv": "1"
          },
          summary: 'Summary of Document 5',
        },
        {
          id: 6,
          name: 'Document 6',
          lastModified: '2023-10-10',
          content: {
            "asd": "2",
            "asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa": "2",
            "asdfv": "1"
          },
          summary: 'Summary of Document 6',
        },
      ],
    },
  ];

  const extractKeyValuePairs = (content) => {
    // Extract key and value pairs from content object
    const keyValuePairs = [];
    for (const key in content) {
      const value = content[key];
      keyValuePairs.push({ key, value });
    }
    return keyValuePairs;
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSelectedDocument({}); // Clear selected document when changing users
  };

  const handleEditClick = (document) => {
    setEditingDocument(document);
    setEditedContent(document.content);
  };

  const handleSaveClick = () => {
    // Handle saving edited content here
    if (editingDocument) {
      // Update the content of the selected document with editedContent
      editingDocument.content = editedContent;
      console.log("Updated content:", editedContent);
    }
    setEditingDocument(null); // Clear editing mode after saving
  };

  const handleCancelClick = () => {
    setEditingDocument(null); // Cancel editing mode
  };

  const handleSummaryClick = (document) => {
    // Set the selected document when clicking the "Summary" button
    setSelectedDocument(document);
  };

  const handleDownloadClick = (document) => {
    // Handle downloading the document here
    console.log("Downloading document:", document.name);
  };

  return (
    <div className="p-4 bg-blue-100">
      <h1 className="text-2xl font-bold">User List</h1>
      <table className="w-full mt-4 border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black text-center">User Name</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((user) => (
            <tr
              key={user.email}
              onClick={() => handleUserClick(user)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border border-black text-center p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-center">{`Documents Uploaded by ${selectedUser.email}`}</h2>
          <table className="w-full mt-4 border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black text-center p-2">Name of Document</th>
                <th className="border border-black text-center p-2">Last Modified</th>
                <th className="border border-black text-center p-2">File Content</th>
                <th className="border border-black text-center p-2">Edit</th>
                <th className="border border-black text-center p-2">Summary View</th>
                <th className="border border-black text-center p-2">Download</th> {/* Added Download column */}
              </tr>
            </thead>
            <tbody>
              {selectedUser.documents.map((document) => (
                <tr key={document.id} className="border border-black">
                  <td className="border border-black text-center p-2">{document.name}</td>
                  <td className="border border-black text-center p-2">{document.lastModified}</td>
                  <td className="border border-black text-center p-2">
                    {editingDocument === document ? (
                      <textarea
                        value={JSON.stringify(editedContent, null, 2)}
                        onChange={(e) => setEditedContent(JSON.parse(e.target.value))}
                        className="w-full h-24 p-2 border border-gray-300"
                      />
                    ) : (
                      <pre className="p-2">
                        {JSON.stringify(document.content, null, 2).slice(1, -1).trim()}
                      </pre>
                    )}
                  </td>
                  <td className="border border-black text-center p-2">
                    {editingDocument === document ? (
                      <>
                        <button
                          onClick={handleSaveClick}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEditClick(document)}
                        className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td className="border border-black text-center p-2">
                    <button
                      onClick={() => handleSummaryClick(document)}
                      className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                    >
                      Summary
                    </button>
                  </td>
                  <td className="border border-black text-center p-2">
                    <button
                      onClick={() => handleDownloadClick(document)}
                      className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Display the selected document summary */}
          <div className="text-center mt-4">
            {selectedDocument.summary && (
              <div>
                <h3 className="text-lg font-bold">{`${selectedDocument.name} Summary`}</h3>
                <textarea
                  value={selectedDocument.summary}
                  readOnly
                  className="w-full border-collapse border border-blue-500 mt-2 resize-both p-1 m-1"
                  style={{ minHeight: "100px", minWidth: "100px" }}
                ></textarea>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;