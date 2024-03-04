import "./App.css";
import Navbar from "./components/shared/Navbar";
import Index from "./pages/Home";
import { Route, Routes } from "react-router";
import Notes from "./pages/Notes/Notes";
import Trash from "./pages/Trash/Trash";
import Archrive from "./pages/Archrive/Archrive";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";
import AuthGuard from "./utils/AuthGuard";
import Cookie from "js-cookie";
import RedirectLogin from "./utils/RedirectLogin";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authUser, setAuthUser] = useState({});

  return (
    <div className="w-full h-screen bg-white">
      <Routes>
        <Route path="/" element={<RedirectLogin />} />

        <Route path="/login" element={<Login /> } />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard Component={<Index sidebarOpen={sidebarOpen} />} />
          }
        >
          <Route path="notes" element={<Notes />} index />
          <Route path="archrive" element={<Archrive />} />
          <Route path="trash" element={<Trash />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
