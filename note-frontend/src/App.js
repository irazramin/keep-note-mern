import logo from './logo.svg';
import './App.css';
import Navbar from "./components/shared/Navbar";
import Home from "./components/pages/Home/Home";

function App() {
  return (
    <div className='bg-gray-200 min-h-screen' >
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
