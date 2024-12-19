import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes cho khách hàng */}
        <Route path="/flights" element={<FlightSearchPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/manage-booking" element={<BookingManagementPage />} />
        
        {/* Routes cho admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/flights" element={<FlightManagement />} />
        <Route path="/admin/news" element={<NewsManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 