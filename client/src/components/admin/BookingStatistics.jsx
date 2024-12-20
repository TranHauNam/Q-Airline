import React, { useState, useEffect } from 'react';
import { bookingApi } from '../../services/modules/admin/booking/booking.api';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
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
        <h3>Thống kê theo tháng trong năm {new Date().getFullYear()}</h3>
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Tháng</th>
              <th>Số lượng đặt</th>
              <th>Doanh thu</th>
              <th>Tỷ lệ</th>
            </tr>
          </thead>
          <tbody>
            {statistics.monthlyBookings[0]?.months.map((stat) => {
              const totalRevenue = statistics.monthlyBookings[0].months.reduce(
                (sum, month) => sum + month.revenue, 
                0
              );
              const percentage = totalRevenue ? 
                ((stat.revenue / totalRevenue) * 100).toFixed(1) : 
                '0.0';
              
              return (
                <tr key={stat.month}>
                  <td>Tháng {stat.month}</td>
                  <td>{stat.count}</td>
                  <td>{stat.revenue.toLocaleString('vi-VN')} VNĐ</td>
                  <td>{percentage}%</td>
                </tr>
              );
            })}
            <tr className="total-row">
              <td><strong>Tổng cộng</strong></td>
              <td>
                <strong>
                  {statistics.monthlyBookings[0]?.months.reduce(
                    (sum, month) => sum + month.count, 
                    0
                  )}
                </strong>
              </td>
              <td>
                <strong>
                  {statistics.monthlyBookings[0]?.months.reduce(
                    (sum, month) => sum + month.revenue, 
                    0
                  ).toLocaleString('vi-VN')} VNĐ
                </strong>
              </td>
              <td><strong>100%</strong></td>
            </tr>
          </tbody>
        </table>

        <div style={{ height: '400px', marginTop: '20px' }}>
          <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Biểu đồ doanh thu theo tháng</h4>
          <Bar
            data={{
              labels: statistics.monthlyBookings[0]?.months.map(
                stat => `Tháng ${stat.month}`
              ),
              datasets: [
                {
                  label: 'Doanh thu (VNĐ)',
                  data: statistics.monthlyBookings[0]?.months.map(
                    stat => stat.revenue
                  ),
                  backgroundColor: 'rgba(196, 30, 58, 0.6)',
                  borderColor: '#c41e3a',
                  borderWidth: 1,
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return value.toLocaleString('vi-VN') + ' VNĐ';
                    }
                  }
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: `Biểu đồ doanh thu theo tháng năm ${new Date().getFullYear()}`,
                  color: '#c41e3a',
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                }
              }
            }}
          />
        </div>

        <div style={{ height: '400px', marginTop: '40px' }}>
          <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Biểu đồ số lượng đặt vé theo tháng</h4>
          <Bar
            data={{
              labels: statistics.monthlyBookings[0]?.months.map(
                stat => `Tháng ${stat.month}`
              ),
              datasets: [
                {
                  label: 'Số lượng đặt vé',
                  data: statistics.monthlyBookings[0]?.months.map(
                    stat => stat.count
                  ),
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: '#36a2eb',
                  borderWidth: 1,
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1
                  }
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: `Biểu đồ số lượng đặt vé theo tháng năm ${new Date().getFullYear()}`,
                  color: '#36a2eb',
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingStatistics;