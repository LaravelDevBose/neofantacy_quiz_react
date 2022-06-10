import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Otp from './pages/Otp/Otp';
import Dashboard from './pages/Dashboard/Dashboard';
import Quiz from './pages/Quiz/Quiz';

function App() {
  return (
    <>
      <div className="body">
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
