import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import MainPage from "./components/MainPage";
import Auth from "./components/Auth";
import MainPage from "./components/MainPage";
import AudioCall from "./components/AudioCall";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/mainpage" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>

    // <AudioCall />
  );
};

export default App;
