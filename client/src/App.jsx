import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FlightSearchPage from './pages/FlightSearchPage';
import BookingPage from './pages/BookingPage';
import BookingManagementPage from './pages/BookingManagementPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import FlightManagement from './pages/admin/FlightManagement';
import NewsManagement from './pages/admin/NewsManagement';
import BookingConfirmationPage from './pages/BookingConfirmationPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes cho khách hàng */}
        <Route path="/" element={<FlightSearchPage />} />
        <Route path="/flights" element={<FlightSearchPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/manage-booking" element={<BookingManagementPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        
        {/* Routes cho admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/flights" element={<FlightManagement />} />
        <Route path="/admin/news" element={<NewsManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 