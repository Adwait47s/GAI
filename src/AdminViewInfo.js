import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";


const AdminViewInfo = () => {
    const [editingDocument, setEditingDocument] = useState(null);
    const [editedContent, setEditedContent] = useState({});
    const [selectedDocument, setSelectedDocument] = useState({});
    const [newKeyValuePair, setNewKeyValuePair] = useState({ key: '', value: '' });
    const [showEditWindow, setShowEditWindow] = useState(false);
    const [jwtToken] = useState(localStorage.getItem("jwtToken"));

    const location = useLocation();
    const userEmail = location.state.userEmail;
    const userId = location.state.userId;
    const [userDocs, setUserDocs] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserDocs = async () => {
            try {
                const response = await Axios.get(
                    "https://word-extractor-apis.onrender.com/admin/userdocs",
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                        params: {
                            user_id: userId, // Replace 'userId' with the actual user ID
                        },
                    }
                );

                if (response.data.ok === 1 && response.data.docs) {
                    setUserDocs(response.data.docs);
                }
            } catch (error) {
                console.error("Error fetching user documents:", error);
            }
        };

        fetchUserDocs();
    }, [jwtToken, userId, editingDocument]); // Make sure to provide 'userId' as a dependency if it's used here.


    const handleGoBack = () => {
        navigate(-1); // Previous page
    };

    const handleEditClick = (document) => {
        // Create a copy of document.content without the 'summary' key
        const { summary, ...editedContent } = document.content;

        setEditingDocument(document);
        setEditedContent(editedContent);
        setShowEditWindow(true);
    };

    const handleSummaryClick = (document) => {
        setSelectedDocument(document);

        const centerX = (window.innerWidth - 500) / 2;
        const centerY = (window.innerHeight - 500) / 2;

        const summaryWindow = window.open(
            '',
            '_blank',
            `width=750,height=500,resizable=yes,scrollbars=yes,left=${centerX},top=${centerY}`
        );

        summaryWindow.document.open();
        summaryWindow.document.write(`
            <html>
            <head>
                <title>Summary of ${document.name}</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-blue-100 p-4">
                <h2 class="text-2xl font-semibold">Summary of ${document.name}</h2>
                <div class="mt-4">
                    <textarea readonly class="w-full h-full p-2 border border-blue-500 resize-both rounded-md">${document.content.summary}</textarea>
                </div>
            </body>
            </html>
        `);
        summaryWindow.document.close();
    };


    const renderEditWindow = () => {
        if (!showEditWindow || !editingDocument) return null;

        const handleEditKey = (oldKey, newKey, newValue) => {
            const updatedContent = { ...editedContent };
            if (oldKey !== newKey) {
                // copy of the object with the new key and value
                updatedContent[newKey] = newValue;

                // Delete the old key
                delete updatedContent[oldKey];
            } else {
                // If the old key is the same as the new key, just update the value
                updatedContent[oldKey] = newValue;
            }

            setEditedContent(updatedContent);
        };

        const handleDeleteKey = (key) => {
            // Delete the key from editedContent
            const updatedContent = { ...editedContent };
            delete updatedContent[key];
            setEditedContent(updatedContent);
        };

        const handleAddKeyValuePair = () => {

            const key = newKeyValuePair.key;
            const value = newKeyValuePair.value;

            if (key.trim() === '' || value.trim() === '') {
                // Check if the key or value is empty (after trimming whitespace)
                alert("Key and Value cannot be empty.");
            } else if (editedContent[key] !== undefined) {
                alert(`Key "${key}" already exists. Please use a different key.`);
            } else {
                const updatedContent = { ...editedContent, [key]: value };
                setEditedContent(updatedContent);
                setNewKeyValuePair({ key: '', value: '' });
            }

        };

        const handleSaveClick = async () => {
            const key = newKeyValuePair.key;
            const value = newKeyValuePair.value;

            if (key.trim() !== '' || value.trim() !== '') {
                alert("Click + button to save the changes");
                return;
            }

            if (editingDocument) {
                editingDocument.content = editedContent;

                const docId = editingDocument.id;
                console.log("editedContent", editedContent)
                const updatedContent = { file_content: editedContent };

                try {
                    const response = await Axios.patch(
                        "https://word-extractor-apis.onrender.com/admin/userdoc",
                        updatedContent,
                        {
                            headers: {
                                Authorization: `Bearer ${jwtToken}`,
                            },
                            params: {
                                doc_id: docId, // Replace 'userId' with the actual user ID
                            },
                        }
                    );

                    if (response.data.ok === 1) {
                        console.log("Updated content:", updatedContent);
                        alert("Updated content");
                        setEditingDocument(null);
                        setEditedContent({});
                        setShowEditWindow(false);
                        setNewKeyValuePair({ key: '', value: '' });
                        // You may want to add a success message or handle other UI changes here
                    }
                } catch (error) {
                    console.error("Error updating user document:", error);
                    // Handle the error, show an error message, etc.
                }
            }

        };

        const handleCancelClick = () => {
            setEditingDocument(null);
            setShowEditWindow(false);
        };

        return (
            <div className="absolute top-0 left-0 w-screen h-screen bg-gray-200 bg-opacity-80 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md w-2/4 h-2/4">
                    <h2 className="text-2xl font-semibold mb-4">Edit {editingDocument.name}</h2>
                    <div className="max-h-60 overflow-auto">
                        <table className="w-full mb-4">
                            <tbody>
                                {Object.entries(editedContent).map(([key, value], index) => (
                                    <tr key={index}>
                                        <td className="w-1/2 text-right pr-2">
                                            <input
                                                type="text"
                                                value={key}
                                                className="w-full border border-gray-300 rounded-md p-1 text-lg"
                                            />
                                        </td>
                                        <td className="w-1/2">
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleEditKey(key, key, e.target.value)}
                                                className="w-full border border-gray-300 rounded-md p-1 text-lg"
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteKey(key)}
                                                className="text-lg bg-red-500 text-white rounded-md hover:bg-red-600 ml-1 h-8 w-8 p-auto "
                                            >
                                                -
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="w-1/3 text-right pr-2">
                                        <input
                                            type="text"
                                            placeholder="New Key"
                                            value={newKeyValuePair.key}
                                            onChange={(e) => setNewKeyValuePair({ ...newKeyValuePair, key: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md p-1 text-lg"
                                        />
                                    </td>
                                    <td className="w-2/3">
                                        <input
                                            type="text"
                                            placeholder="New Value"
                                            value={newKeyValuePair.value}
                                            onChange={(e) => setNewKeyValuePair({ ...newKeyValuePair, value: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md p-1 text-lg"
                                        />
                                    </td>

                                    <button onClick={handleAddKeyValuePair} className="text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-1 mt-1 w-8 h-8 p-auto">
                                        +
                                    </button>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={handleSaveClick}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover-bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

        );
    };



    return (
        <div className="p-4 min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200">
            <button
                onClick={handleGoBack}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md focus:ring focus:ring-indigo-200"
            >
                <span className='font-black '>&#10229;</span> Go Back
            </button>
            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Documents Uploaded by {userEmail}
            </h1>

            <table className="w-full mt-4 bg-white rounded-lg shadow">
                <thead>
                    <tr>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Name of Document
                        </th>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Uploaded
                        </th>
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Last Modified
                        </th>
                        {/* <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            File Content
                        </th> */}
                        <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            View/Edit
                        </th>
                        {/* <th className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                            Summary View
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {userDocs
                        .slice() // Create a shallow copy of the array to avoid modifying the original
                        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                        .map((document, index) => (
                            <tr
                                key={document.id}
                                className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'} hover:bg-blue-300 transition duration-300`}
                            >
                                <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                    {document.name}
                                </td>
                                <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                    {new Date(document.created_at).toLocaleString()}
                                </td>
                                <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                    {new Date(document.updated_at).toLocaleString()}
                                </td>
                                <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                    <button
                                        onClick={() => handleEditClick(document)}
                                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:ring focus:ring-indigo-200"
                                    >
                                        View / Edit
                                    </button>
                                </td>
                                {/* <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                                    <button
                                        onClick={() => handleSummaryClick(document)}
                                        className="py-2 px-4 bg-indigo-600 hover-bg-indigo-700 text-white rounded-md focus:ring focus:ring-indigo-200"
                                    >
                                        Summary
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                </tbody>
            </table>
            {renderEditWindow()}
        </div>
    );
};

export default AdminViewInfo;
