import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateForm from "./components/Update";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<UpdateForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
