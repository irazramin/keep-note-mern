import "./App.css";
import Navbar from "./components/shared/Navbar";
import Index from "./pages/Home";
import { Route, Routes } from "react-router";
import Notes from "./pages/Notes/Notes";
import Trash from "./pages/Trash/Trash";
import Archrive from "./pages/Archrive/Archrive";
import { useState } from "react";
import Login from "./pages/login";

function App() {
  const [sidebarOpen,setSidebarOpen] = useState(false)
  console.log(sidebarOpen)
  return (
    <div className="w-full h-screen bg-white">
      <Routes>
        <Route path="/login"  element={<Login />}/>
        <Route path="/dashboard" element={<Index sidebarOpen={sidebarOpen} />}>
          <Route path="notes" element={<Notes />} index />
          <Route path="archrive" element={<Archrive />} />
          <Route path="trash" element={<Trash />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
