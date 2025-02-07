import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";
import axios from "axios";

const UpdateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);
  const { token } = useSelector((state) => state.auth);

  const currentUser = users.find((u) => u._id === id);

  const [firstName, setFirstname] = useState(
    currentUser ? currentUser.firstName : ""
  );
  const [lastName, setLastname] = useState(
    currentUser ? currentUser.lastName : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${id}`,
        {
          firstName,
          lastName,
        },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const updatedUser = response.data;
        dispatch(updateUser(updatedUser));
        navigate("/");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <p>User not found</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Update User</Link>
        </h1>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Update User Details</h1>
          <input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstName}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your first name"
          />
          <input
            onChange={(e) => setLastname(e.target.value)}
            value={lastName}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your last name"
          />
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          {error && (
            <div className="text-red-500 mt-2">
              {error.message || "An error occurred"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
