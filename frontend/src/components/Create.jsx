import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const UserForm = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/", {
        firstName,
        lastName,
      });

      if (response.status === 201) {
        const newUser = response.data;
        dispatch(addUser(newUser));
      }
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[30%]">
          <h1 className="text-xl font-bold text-left">Enter User Details</h1>
          <div className="flex space-x-4 w-full">
            <input
              onChange={(e) => setFirstname(e.target.value)}
              className="w-1/2 px-2 py-2 border-2 border-black outline-0"
              type="text"
              placeholder="First name"
            />
            <input
              onChange={(e) => setLastname(e.target.value)}
              className="w-1/2 px-2 py-2 border-2 border-black outline-0"
              type="text"
              placeholder="Last name"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default UserForm;
