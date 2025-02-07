import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateForm from "./components/Update";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/update/:id"
          element={token ? <UpdateForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
