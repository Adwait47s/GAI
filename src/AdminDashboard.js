import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
    const navigate = useNavigate();

    const dummyData = [];
    // js script to generate dummy data
    // get the data from backend
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

    const handleUserClick = (user) => {
      navigate('/AdminViewInfo', { state: { userEmail: user.email, userDoc: user.documents } });
      //navigate('/AdminViewInfo', { state: { selectedUser: user }});
    };

    return (
      <div className="p-4 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">User List</h1>
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
                  } hover:bg-blue-300 transition duration-300`}
              >
                <td className="border-t-0 border-r-0 border-l-0 border-b border-gray-200 text-center p-3">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default AdminPage;