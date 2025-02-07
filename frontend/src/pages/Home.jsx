import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Smith" },
  ]);

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleChange = (id, field, value) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, [field]: value } : user))
    );
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">User Management System</Link>
        </h1>
      </div>

      {/* Table Section */}
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="w-[90%] md:w-[50%] border-2 border-black rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">User List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-3">First Name</th>
                  <th className="border p-3">Last Name</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border">
                    <td className="border p-3">{user.firstName}</td>
                    <td className="border p-3">{user.lastName}</td>
                    <td className="border p-3 flex space-x-4">
                      <button
                        onClick={() => handleEdit()}
                        className="p-2 rounded-md bg-black text-white hover:bg-gray-500"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete()}
                        className="p-2 rounded-md bg-red-500 text-white hover:bg-red-700"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
