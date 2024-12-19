import React, { useState, useEffect } from 'react';
import { bookingApi } from '../../services/modules/admin/booking/booking.api';

const BookingStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await bookingApi.getBookingStatistics();
        setStatistics(response.data.statistics);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="statistics-container">
      <h2>Thống kê đặt vé</h2>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Số hiệu chuyến bay</th>
            <th>Điểm khởi hành</th>
            <th>Điểm đến</th>
            <th>Thời gian khởi hành</th>
            <th>Tổng số đặt vé</th>
            <th>Tổng số ghế đã đặt</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map((stat, index) => (
            <tr key={index}>
              <td>{stat.flightNumber}</td>
              <td>{stat.origin}</td>
              <td>{stat.destination}</td>
              <td>{new Date(stat.departureTime).toLocaleString()}</td>
              <td>{stat.totalBookings}</td>
              <td>{stat.totalSeatsBooked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingStatistics; 