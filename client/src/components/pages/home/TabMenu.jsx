import React, { useState } from 'react';

const TabMenu = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return (
          <div className="p-6">
            {/* Trip Type Selection */}
            <div className="flex gap-6 mb-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="tripType" value="oneWay" className="text-red-600" />
                <span>One Way</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="tripType" value="roundTrip" defaultChecked className="text-red-600" />
                <span>Round Trip</span>
              </label>
              <span className="text-gray-600">Multi City</span>
            </div>

            {/* Search Form */}
            <div className="space-y-6">
              {/* From/To Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-gray-600">FROM</label>
                  <input type="text" placeholder="Select City" 
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-600">TO</label>
                  <input type="text" placeholder="Select City" 
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
                </div>
              </div>

              {/* Options Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <label className="block text-gray-600">Depart</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-600">Return</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-600">Passenger(S)</label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500">
                    <option>Adult 1</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-600">Class</label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500">
                    <option>Economy</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-600">Pay By</label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500">
                    <option>Cash</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-600">Concession Type</label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500">
                    <option>Select</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-6">
              <button className="text-red-600 hover:text-red-700">+ Add Promo Code</button>
              <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Search</button>
            </div>
          </div>
        );

      case 'manage':
        return (
          <div className="max-w-2xl mx-auto p-6 space-y-4">
            <input type="text" placeholder="Booking reference number (PNR)*" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
            <input type="text" placeholder="Last Name*" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
            <div className="text-gray-500 text-sm">Eg: JFDE2V</div>
            <button className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">Submit</button>
          </div>
        );

      case 'checkin':
        return (
          <div className="max-w-2xl mx-auto p-6 space-y-4">
            <input type="text" placeholder="Booking Reference / Ticket Number*" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
            <input type="text" placeholder="Last Name*" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
            <div className="text-gray-500 text-sm">Eg: A1B2C3 / 098123456789</div>
            <button className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">Check-In</button>
          </div>
        );

      case 'status':
        return (
          <div className="max-w-2xl mx-auto p-6 space-y-4">
            <input type="text" placeholder="Flight Number*" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
            <input type="date" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500" />
            <div className="text-gray-500 text-sm">Eg: AI 985</div>
            <button className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">Show Flights</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="relative border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
        {/* Mobile Menu Button - Chỉ hiện trên mobile */}
        <div className="md:hidden flex justify-between items-center p-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-red-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Exclusive Deals cho mobile */}
          <div className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 px-3 py-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            DEALS
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`
          md:flex md:flex-row md:justify-between md:items-center md:p-4
          ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}
        `}>
          {/* Tabs */}
          <div className="flex flex-col md:flex-row md:space-x-1 overflow-x-auto scrollbar-hide">
            {['search', 'manage', 'checkin', 'status'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  px-4 py-3 font-medium transition-all duration-200 relative
                  md:px-6 md:rounded-t-lg
                  ${activeTab === tab 
                    ? 'text-red-600 bg-white shadow-sm' 
                    : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                  }
                  ${activeTab === tab 
                    ? 'border-l-4 md:border-l-0 border-red-600 md:after:absolute md:after:bottom-0 md:after:left-0 md:after:w-full md:after:h-0.5 md:after:bg-red-600' 
                    : ''
                  }
                  flex items-center gap-2 
                `}
              >
                <span className="relative z-10 uppercase tracking-wide text-sm whitespace-nowrap">
                  {tab === 'search' && (
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      SEARCH FLIGHTS
                    </span>
                  )}
                  {tab === 'manage' && (
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      MANAGE BOOKING
                    </span>
                  )}
                  {tab === 'checkin' && (
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      CHECK IN
                    </span>
                  )}
                  {tab === 'status' && (
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      FLIGHT STATUS
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
          
          {/* Exclusive Deals - Ẩn trên mobile */}
          <div className="hidden md:flex items-center gap-2 text-red-600 font-medium bg-red-50 px-4 py-2 rounded-full transition-all hover:bg-red-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            EXCLUSIVE DEALS
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="tab-content transition-all duration-300 ease-in-out">
        <div className="p-4 md:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TabMenu; 