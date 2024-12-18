import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignPage from "./pages/SignPage";
import { AuthProvider } from './contexts/AuthContext';

import SearchPage from './pages/SearchPage';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" homepage element={<HomePage />} />

        <Route path="/login" element={<SignPage />} />
        <Route path="/search" element={<SearchPage />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;