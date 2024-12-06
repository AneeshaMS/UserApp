// import "./App.css";
import AllUsers from "./Pages/AllUsers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
export const BASE_URL = "http://13.49.244.225/api/";
// export const BASE_URL = "http://localhost:3005/api/";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<AllUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
