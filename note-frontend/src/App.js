import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Home from "./components/pages/Home/Home";
import { Route, Routes } from "react-router";
import Notes from "./components/pages/Home/Note/Notes";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
