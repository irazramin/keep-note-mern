import "./App.css";
import Navbar from "./components/shared/Navbar";
import Home from "./components/pages/Home/Home";
import { Route, Routes } from "react-router";
import Notes from "./components/pages/Home/Note/Notes";
import Archrive from "./components/pages/Home/Dashboard/Archrive/Archrive";
import Trash from "./components/pages/Home/Dashboard/Trash/Trash";
import { useState } from "react";

function App() {
  const [sidebarOpen,setSidebarOpen] = useState(false)
  console.log(sidebarOpen)
  return (
    <div className="min-h-screen">
      <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
      <Routes>
        <Route path="/" element={<Home sidebarOpen={sidebarOpen} />}>
          <Route path="" element={<Notes />} index />
          <Route path="archrive" element={<Archrive />} />
          <Route path="trash" element={<Trash />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
