import React, { useState, useEffect } from 'react';
import { bookingApi } from '../../services/modules/admin/booking/booking.api';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BookingStatistics = () => {
  const [statistics, setStatistics] = useState({
    totalBookings: 0,
    bookingsByClass: [],
    monthlyBookings: [],
    flightTypeStats: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await bookingApi.getBookingStatistics();
        if (response.data.success) {
          setStatistics(response.data.data);
        } else {
          setError('Không thể lấy dữ liệu thống kê');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError(error.response?.data?.message || 'Có lỗi xảy ra khi lấy dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  const formatFlightType = (type) => {
    switch (type) {
      case 'round-trip':
        return 'Khứ hồi';
      case 'one-way':
        return 'Một chiều';
      default:
        return type;
    }
  };

  const flightChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Thống kê số chuyến bay theo tuyến đường',
        color: '#c41e3a',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    maintainAspectRatio: false
  };

  const flightChartData = {
    labels: statistics.flightTypeStats.map(stat => `${stat._id.origin} - ${stat._id.destination}`),
    datasets: [
      {
        label: 'Số chuyến bay',
        data: statistics.flightTypeStats.map(stat => stat.count),
        backgroundColor: [
          'rgba(196, 30, 58, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          '#c41e3a',
          '#36a2eb',
          '#ffce56',
          '#4bc0c0',
          '#9966ff',
          '#ff9f40',
        ],
        borderWidth: 1,
      }
    ]
  };

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="statistics-container">
      <div className="stat-section">
        <h2>Thống kê đặt vé</h2>
        <h3>Tổng số đặt vé: {statistics.totalBookings}</h3>
      </div>

      <div className="stat-section">
        <h3>Biểu đồ thống kê chuyến bay theo tuyến đường</h3>
        <div className="chart-container" style={{ height: '400px', marginBottom: '30px' }}>
          <Pie options={flightChartOptions} data={flightChartData} />
        </div>
        <div className="flight-stats-summary">
          <table className="statistics-table">
            <thead>
              <tr>
                <th>Tuyến đường</th>
                <th>Số chuyến bay</th>
                <th>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {statistics.flightTypeStats.map((stat, index) => {
                const totalFlights = statistics.flightTypeStats.reduce((sum, s) => sum + s.count, 0);
                const percentage = ((stat.count / totalFlights) * 100).toFixed(1);
                return (
                  <tr key={index}>
                    <td>{stat._id.origin} - {stat._id.destination}</td>
                    <td>{stat.count} chuyến</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stat-section">
        <h3>Chi tiết các chuyến bay</h3>
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Điểm đi</th>
              <th>Điểm đến</th>
              <th>Số chuyến bay</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {statistics.flightTypeStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat._id.origin}</td>
                <td>{stat._id.destination}</td>
                <td>{stat.count}</td>
                <td>
                  <div className="flight-details">
                    {stat.flights.map((flight, i) => (
                      <div key={i} className="flight-item">
                        <span>#{flight.flightNumber}</span>
                        <span>{new Date(flight.departureTime).toLocaleString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit'
                        })}</span>
                        <span>{flight.duration} phút</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stat-section">
        <h3>Thống kê theo hạng ghế</h3>
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Hạng ghế</th>
              <th>Số lượng đặt</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {statistics.bookingsByClass.map((stat, index) => (
              <tr key={index}>
                <td>{stat._id}</td>
                <td>{stat.count}</td>
                <td>{stat.totalRevenue.toLocaleString('vi-VN')} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stat-section">
        <h3>Thống kê theo tháng</h3>
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Tháng</th>
              <th>Số lượng đặt</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {statistics.monthlyBookings.map((stat, index) => (
              <tr key={index}>
                <td>Tháng {stat._id}</td>
                <td>{stat.count}</td>
                <td>{stat.revenue.toLocaleString('vi-VN')} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingStatistics;