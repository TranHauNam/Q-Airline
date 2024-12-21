import React, { useState, useEffect } from 'react';
import { bookingApi } from '../../services/modules/admin/booking/booking.api';
import './Admin.css';
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
          setError('Unable to fetch statistics data');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError(error.response?.data?.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  const formatFlightType = (type) => {
    switch (type) {
      case 'round-trip':
        return 'Round Trip';
      case 'one-way':
        return 'One Way';
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
        text: 'Flight Statistics by Route',
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
        label: 'Number of Flights',
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
    return <div className="loading">Loading data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="statistics-container">
      <div className="stat-section">
      <h2 className='h2-admin'> Booking Statistics</h2>
        <h3>Total Bookings: {statistics.totalBookings}</h3>
      </div>

      <div className="stat-section">
        <h3>Flight Statistics by Route Chart</h3>
        <div className="chart-container" style={{ height: '400px', marginBottom: '30px' }}>
          <Pie options={flightChartOptions} data={flightChartData} />
        </div>
        <div className="flight-stats-summary">
          <table className="statistics-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Number of Flights</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {statistics.flightTypeStats.map((stat, index) => {
                const totalFlights = statistics.flightTypeStats.reduce((sum, s) => sum + s.count, 0);
                const percentage = ((stat.count / totalFlights) * 100).toFixed(1);
                return (
                  <tr key={index}>
                    <td>{stat._id.origin} - {stat._id.destination}</td>
                    <td>{stat.count} flights</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stat-section">
        <h3>Flight Details</h3>
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Departure Point</th>
              <th>Destination</th>
              <th>Number of Flights</th>
              <th>Details</th>
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
                        <span>{new Date(flight.departureTime).toLocaleString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit'
                        })}</span>
                        <span>{flight.duration} minutes</span>
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
        <h3>Statistics by Class</h3>
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Number of Bookings</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {statistics.bookingsByClass.map((stat, index) => (
              <tr key={index}>
                <td>{stat._id}</td>
                <td>{stat.count}</td>
                <td>{stat.totalRevenue.toLocaleString('en-US')} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stat-section">
        <h3>Monthly Statistics for the Year {new Date().getFullYear()}</h3>
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Number of Bookings</th>
              <th>Revenue</th>
              <th>Percentage</th>
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
                  <td>Month {stat.month}</td>
                  <td>{stat.count}</td>
                  <td>{stat.revenue.toLocaleString('en-US')} VND</td>
                  <td>{percentage}%</td>
                </tr>
              );
            })}
            <tr className="total-row">
              <td><strong>Total</strong></td>
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
                  ).toLocaleString('en-US')} VND
                </strong>
              </td>
              <td><strong>100%</strong></td>
            </tr>
          </tbody>
        </table>

        <div style={{ height: '400px', marginTop: '20px' }}>
          <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Revenue Chart by Month</h4>
          <Bar
            data={{
              labels: statistics.monthlyBookings[0]?.months.map(
                stat => `Month ${stat.month}`
              ),
              datasets: [
                {
                  label: 'Revenue (VND)',
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
                      return value.toLocaleString('en-US') + ' VND';
                    }
                  }
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: `Revenue Chart by Month for ${new Date().getFullYear()}`,
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
          <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Booking Chart by Month</h4>
          <Bar
            data={{
              labels: statistics.monthlyBookings[0]?.months.map(
                stat => `Month ${stat.month}`
              ),
              datasets: [
                {
                  label: 'Number of Bookings',
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
                  text: `Booking Chart by Month for ${new Date().getFullYear()}`,
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