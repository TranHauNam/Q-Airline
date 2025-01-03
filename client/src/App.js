import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignPage from "./pages/SignPage";
import Admin from "./pages/Admin";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './contexts/AuthContext';
import FlightSearchPage from './pages/FlightSearchPage';
import FlightResultPage from './pages/FlightResultPage';
import AdminLogin from './pages/AdminLogin';
import BookingPage from './pages/BookingPage';
import ReviewPaymentPage from './pages/ReviewPaymentPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import UserBookingsPage from './pages/UserBookingsPage';
import ProfilePage from './pages/user/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" homepage element={<HomePage />} />
        <Route path="/admin/home" element={<Admin />} />
        <Route path="/login" element={<SignPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search" element={<FlightSearchPage />} />
        <Route path="/flight-results" element={<FlightResultPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/review-payment" element={<ReviewPaymentPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="/my-bookings" element={<UserBookingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;