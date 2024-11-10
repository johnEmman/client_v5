import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import MainPage from "./components/MainPage";
import Auth from "./components/Auth";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
