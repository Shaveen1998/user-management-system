import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Create from "../components/Create";
import { deleteUser, setUsers } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { logoutAdmin } from "../store/authSlice";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, token } = useSelector((state) => state.auth);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/");
      dispatch(setUsers(response.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/${id}`
      );

      if (response.status === 200) {
        dispatch(deleteUser(id));
        fetchUsers();
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/login");
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">User Management System</Link>
        </h1>

        <div>
          {token ? (
            <>
              <span className="text-sm font-medium m-5">
                Welcome, {admin?.username}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-black rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <Create fetchUsers={fetchUsers} />
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
                  <tr key={user._id} className="border">
                    <td className="border p-3">{user.firstName}</td>
                    <td className="border p-3">{user.lastName}</td>
                    <td className="border p-3 flex space-x-4">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="p-2 rounded-md bg-black text-white hover:bg-gray-500"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
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
