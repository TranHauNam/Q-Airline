import React from 'react';
import { BarChart, Activity, Users, Package, Clock, Bell } from 'lucide-react';

const AdminDashboard = ({ selectedModule, renderModuleContent, welcomeImage }) => {
  if (selectedModule) {
    return (
      <div className="adm-main p-6">
        <div className="adm-content bg-white rounded-lg shadow-lg">
          <div className="adm-content-area p-6">
            {renderModuleContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-main p-6 bg-gray-50">
      <div className="adm-content">
        {/* Welcome Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Q-Airline Admin Panel</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your airline operations efficiently with our comprehensive administrative tools.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Bookings', value: '1,234', icon: Package, color: 'text-blue-600' },
            { title: 'Active Flights', value: '42', icon: Activity, color: 'text-green-600' },
            { title: 'Total Users', value: '5,678', icon: Users, color: 'text-purple-600' },
            { title: 'On-time Rate', value: '95%', icon: Clock, color: 'text-orange-600' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 flex items-center">
              <div className={`p-4 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Booking Trends</h3>
              <BarChart className="text-gray-400 h-5 w-5" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Booking statistics chart goes here</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
              <Bell className="text-gray-400 h-5 w-5" />
            </div>
            <div className="space-y-4">
              {[
                'New flight schedule added - FL789',
                'Booking completed - ID: 456789',
                'Aircraft maintenance scheduled - AC123',
                'New promotion published'
              ].map((activity, index) => (
                <div key={index} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                  <p className="text-sm text-gray-600">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Welcome Image
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <img 
            src={welcomeImage} 
            alt="Welcome" 
            className="max-w-2xl mx-auto rounded-lg shadow-lg"
          />
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;