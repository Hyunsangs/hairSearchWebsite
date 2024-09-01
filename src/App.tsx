import "./reset.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Result from "./Pages/ResultPage/Result";
import ImgResult from "./Pages/ImgResultPage/ImgResult";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/RegisterPage/Register";
import Record from "./Pages/RecordPage/Record";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/imgResult" element={<ImgResult />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </Router>
  );
};

export default App;
