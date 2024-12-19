import React, { useState } from 'react';
import flightService from '../../services/modules/flight/flight';
import './FlightSearch.css';
import { useNavigate } from 'react-router-dom';

const FlightSearch = ({ isRoundTrip }) => {
  const cities = [
    'Ho Chi Minh City',
    'Ha Noi',
    'Da Nang',
    'Nha Trang',
    'Phu Quoc',
    'Hue',
    'Da Lat',
    'Hai Phong',
    'Can Tho',
    'Quy Nhon',
    'Dong Hoi',
    'Vinh',
    'Buon Ma Thuot',
    'Pleiku',
    'Tuy Hoa',
    'Con Dao',
    'Rach Gia',
    'Ca Mau'
  ];

  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureTime: '',
    returnTime: '',
    flightType: isRoundTrip ? 'round-trip' : 'one-way',
    classType: 'Economy',
    adult: 1,
    children: 0,
    infant: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate dữ liệu trước khi gửi
      if (!searchParams.origin || !searchParams.destination) {
        throw new Error('Vui lòng chọn điểm đi và điểm đến');
      }

      if (!searchParams.departureTime) {
        throw new Error('Vui lòng chọn ngày đi');
      }

      if (isRoundTrip && !searchParams.returnTime) {
        throw new Error('Vui lòng chọn ngày về');
      }

      // Kiểm tra điểm đi và điểm đến không được trùng nhau
      if (searchParams.origin === searchParams.destination) {
        throw new Error('Điểm đi và điểm đến không được trùng nhau');
      }

      // Kiểm tra ngày đi và ngày về
      if (isRoundTrip) {
        const departDate = new Date(searchParams.departureTime);
        const returnDate = new Date(searchParams.returnTime);
        if (returnDate <= departDate) {
          throw new Error('Ngày về phải sau ngày đi');
        }
      }

      // Chuẩn bị dữ liệu tìm kiếm
      const searchData = {
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureTime: searchParams.departureTime,
        returnTime: isRoundTrip ? searchParams.returnTime : null,
        flightType: isRoundTrip ? 'round-trip' : 'one-way',
        classType: searchParams.classType || 'Economy',
        adult: Number(searchParams.adult) || 1,
        children: Number(searchParams.children) || 0,
        infant: Number(searchParams.infant) || 0
      };

      console.log('Component search data:', searchData);

      const results = await flightService.searchFlights({...searchData});
      
      if (results && results.flights) {
        navigate('/flights/results', { 
          state: { 
            searchParams: searchData,
            results: results.flights
          }
        });
      } else {
        setError('Không tìm thấy chuyến bay phù hợp với yêu cầu của bạn');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message || 'Có lỗi xảy ra khi tìm kiếm');
    } finally {
      setLoading(false);
    }
  };

  const handlePassengerChange = (type, action) => {
    setSearchParams(prev => {
      const count = prev[type];
      const newCount = action === 'increase' ? count + 1 : Math.max(0, count - 1);
      
      // Validate số lượng hành khách
      if (type === 'adult' && newCount < 1) {
        return prev; // Phải có ít nhất 1 người lớn
      }
      
      if (type === 'infant' && newCount > prev.adult) {
        return prev; // Số em bé không được vượt quá số người lớn
      }
      
      const totalPassengers = (type === 'adult' ? newCount : prev.adult) +
                            (type === 'children' ? newCount : prev.children) +
                            (type === 'infant' ? newCount : prev.infant);
                            
      if (totalPassengers > 9) {
        return prev; // Tổng số hành khách không vượt quá 9
      }
      
      return {
        ...prev,
        [type]: newCount
      };
    });
  };

  return (
    <div className="flight-search">
      <form onSubmit={handleSearch}>
        {/* Điểm đi/đến */}
        <div className="form-row">
          <div className="form-group">
            <label>Điểm đi</label>
            <select
              value={searchParams.origin}
              onChange={(e) => setSearchParams({
                ...searchParams,
                origin: e.target.value
              })}
              required
            >
              <option value="">Chọn thành phố</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Điểm đến</label>
            <select
              value={searchParams.destination}
              onChange={(e) => setSearchParams({
                ...searchParams,
                destination: e.target.value
              })}
              required
            >
              <option value="">Chọn thành phố</option>
              {cities.filter(city => city !== searchParams.origin).map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ngày đi/về */}
        <div className="form-row">
          <div className="form-group">
            <label>Ngày đi</label>
            <input
              type="date"
              value={searchParams.departureTime}
              onChange={(e) => setSearchParams({
                ...searchParams,
                departureTime: e.target.value
              })}
              required
            />
          </div>
          
          {isRoundTrip && (
            <div className="form-group">
              <label>Ngày về</label>
              <input
                type="date"
                value={searchParams.returnTime}
                onChange={(e) => setSearchParams({
                  ...searchParams,
                  returnTime: e.target.value
                })}
                required
              />
            </div>
          )}
        </div>

        {/* Hạng ghế */}
        <div className="form-row">
          <div className="form-group">
            <label>Hạng ghế</label>
            <select
              value={searchParams.classType}
              onChange={(e) => setSearchParams({
                ...searchParams,
                classType: e.target.value
              })}
              required
            >
              <option value="Economy">Phổ thông</option>
              <option value="Premium Economy">Phổ thông đặc biệt</option>
              <option value="Business">Thương gia</option>
              <option value="First">Hạng nhất</option>
            </select>
          </div>
        </div>

        {/* Số lượng hành khách */}
        <div className="form-row">
          <div className="form-group">
            <label>Người lớn</label>
            <div className="passenger-count">
              <button type="button" onClick={() => handlePassengerChange('adult', 'decrease')}>-</button>
              <span>{searchParams.adult}</span>
              <button type="button" onClick={() => handlePassengerChange('adult', 'increase')}>+</button>
            </div>
          </div>

          <div className="form-group">
            <label>Trẻ em</label>
            <div className="passenger-count">
              <button type="button" onClick={() => handlePassengerChange('children', 'decrease')}>-</button>
              <span>{searchParams.children}</span>
              <button type="button" onClick={() => handlePassengerChange('children', 'increase')}>+</button>
            </div>
          </div>

          <div className="form-group">
            <label>Em bé</label>
            <div className="passenger-count">
              <button type="button" onClick={() => handlePassengerChange('infant', 'decrease')}>-</button>
              <span>{searchParams.infant}</span>
              <button type="button" onClick={() => handlePassengerChange('infant', 'increase')}>+</button>
            </div>
          </div>
        </div>

        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? 'Đang tìm...' : 'Tìm chuyến bay'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FlightSearch; 