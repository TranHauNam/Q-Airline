import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignIn/SignInPage';
import { AuthProvider } from './contexts/AuthContext';
import { ShiftingDropDown } from './components/home-components/ShiftingDropDown';
import Test from "./pages/Test"
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" homepage element={<HomePage />} />
        <Route path="/login" element={<Test />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </AuthProvider>
      
  );
}

export default App;