export const airports = [
  {
    _id: '1',
    city: 'Hà Nội',
    code: 'HAN',
    name: 'Sân bay Quốc tế Nội Bài'
  },
  {
    _id: '2',
    city: 'Hồ Chí Minh',
    code: 'SGN',
    name: 'Sân bay Quốc tế Tân Sơn Nhất'
  },
  {
    _id: '3',
    city: 'Đà Nẵng',
    code: 'DAD',
    name: 'Sân bay Quốc tế Đà Nẵng'
  },
  {
    _id: '4',
    city: 'Nha Trang',
    code: 'CXR',
    name: 'Sân bay Quốc tế Cam Ranh'
  },
  {
    _id: '5',
    city: 'Phú Quốc',
    code: 'PQC',
    name: 'Sân bay Quốc tế Phú Quốc'
  },
  {
    _id: '6', 
    city: 'Huế',
    code: 'HUI',
    name: 'Sân bay Quốc tế Phú Bài'
  },
  {
    _id: '7',
    city: 'Đà Lạt',
    code: 'DLI',
    name: 'Sân bay Liên Khương'
  },
  {
    _id: '8',
    city: 'Hải Phòng',
    code: 'HPH',
    name: 'Sân bay Quốc tế Cát Bi'
  },
  {
    _id: '9',
    city: 'Vinh',
    code: 'VII',
    name: 'Sân bay Vinh'
  },
  {
    _id: '10',
    city: 'Cần Thơ',
    code: 'VCA',
    name: 'Sân bay Quốc tế Cần Thơ'
  }
]; 

export const mockFlights = [
  {
    _id: '1',
    flightNumber: 'QA101',
    departureAirport: 'Hà Nội',
    arrivalAirport: 'Hồ Chí Minh',
    departureTime: '2024-01-20T08:00:00Z',
    arrivalTime: '2024-01-20T10:00:00Z',
    duration: '2h',
    price: {
      ECONOMY: 1500000,
      PREMIUM_ECONOMY: 2500000,
      BUSINESS: 4500000,
      FIRST: 8500000
    },
    availableSeats: {
      ECONOMY: 100,
      PREMIUM_ECONOMY: 50,
      BUSINESS: 20,
      FIRST: 10
    }
  },
  {
    _id: '2',
    flightNumber: 'QA102',
    departureAirport: 'Hà Nội',
    arrivalAirport: 'Hồ Chí Minh',
    departureTime: '2024-01-20T14:00:00Z',
    arrivalTime: '2024-01-20T16:00:00Z',
    duration: '2h',
    price: {
      ECONOMY: 1800000,
      PREMIUM_ECONOMY: 2800000,
      BUSINESS: 4800000,
      FIRST: 8800000
    },
    availableSeats: {
      ECONOMY: 80,
      PREMIUM_ECONOMY: 40,
      BUSINESS: 15,
      FIRST: 8
    }
  },
  {
    _id: '3',
    flightNumber: 'QA201',
    departureAirport: 'Hồ Chí Minh',
    arrivalAirport: 'Hà Nội',
    departureTime: '2024-01-20T10:00:00Z',
    arrivalTime: '2024-01-20T12:00:00Z',
    duration: '2h',
    price: {
      ECONOMY: 1600000,
      PREMIUM_ECONOMY: 2600000,
      BUSINESS: 4600000,
      FIRST: 8600000
    },
    availableSeats: {
      ECONOMY: 90,
      PREMIUM_ECONOMY: 45,
      BUSINESS: 18,
      FIRST: 9
    }
  }
]; 