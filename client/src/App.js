import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignPage from "./pages/SignPage";
import Admin from "./pages/Admin";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './contexts/AuthContext';
import SearchPage from './pages/SearchPage';
import FlightSearchPage from './pages/FlightSearchPage';
import FlightResultPage from './pages/FlightResultPage';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" homepage element={<HomePage />} />
        <Route path="/adminxinso" element={<Admin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/flights/search" element={<FlightSearchPage />} />
        <Route path="/flights/results" element={<FlightResultPage />} />
        <Route path="/loginadmin" element={<AdminLogin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;