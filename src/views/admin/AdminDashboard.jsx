import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { FaCoffee, FaChartLine, FaShoppingCart, FaUsers, FaStar, FaBoxOpen, FaDollarSign } from 'react-icons/fa';

function AdminDashboard() {
  // Mock data for demonstration
  const stats = [
    { title: 'Total Sales', value: '$24,580', change: '+12.5%', icon: <FaDollarSign className="text-green-500" /> },
    { title: 'Orders', value: '1,248', change: '+8.2%', icon: <FaShoppingCart className="text-blue-500" /> },
    { title: 'Customers', value: '892', change: '+5.3%', icon: <FaUsers className="text-purple-500" /> },
    { title: 'Products', value: '42', change: '+2', icon: <FaCoffee className="text-amber-600" /> },
  ];
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Smith', date: '2023-06-15', total: '$42.50', status: 'Delivered' },
    { id: '#ORD-002', customer: 'Emma Wilson', date: '2023-06-14', total: '$28.75', status: 'Processing' },
    { id: '#ORD-003', customer: 'Michael Brown', date: '2023-06-14', total: '$65.20', status: 'Shipped' },
    { id: '#ORD-004', customer: 'Sarah Davis', date: '2023-06-13', total: '$31.40', status: 'Delivered' },
    { id: '#ORD-005', customer: 'Robert Johnson', date: '2023-06-13', total: '$53.80', status: 'Cancelled' },
  ];
  const topProducts = [
    { name: 'Ethiopian Yirgacheffe', sales: 124, revenue: '$3,720' },
    { name: 'Colombian Supremo', sales: 98, revenue: '$2,450' },
    { name: 'Guatemala Antigua', sales: 87, revenue: '$2,610' },
    { name: 'Sumatra Mandheling', sales: 76, revenue: '$2,280' },
    { name: 'Brazilian Santos', sales: 65, revenue: '$1,625' },
  ];

  // Chart state and data
  const [chartPeriod, setChartPeriod] = useState('week');
  
  // Chart data based on selected period
  const getChartData = () => {
    if (chartPeriod === 'week') {
      return {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
          {
            name: 'Sales',
            data: [3200, 4100, 3800, 5100, 4900, 6200, 7100]
          }
        ]
      };
    } else if (chartPeriod === 'month') {
      return {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        series: [
          {
            name: 'Sales',
            data: [24500, 31200, 28900, 35600]
          }
        ]
      };
    } else { // year
      return {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
          {
            name: 'Sales',
            data: [85000, 92000, 88000, 105000, 112000, 125000]
          }
        ]
      };
    }
  };

  const chartData = getChartData();

  // Chart options
  const chartOptions = {
    chart: {
      id: 'sales-chart',
      toolbar: {
        show: false
      },
      foreColor: '#6b7280'
    },
    grid: {
      show: true,
      borderColor: '#f3f4f6',
      strokeDashArray: 1,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: chartData.categories,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      opposite: false,
      labels: {
        formatter: function(value) {
          return "$" + value.toLocaleString();
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function(value) {
          return "$" + value.toLocaleString();
        }
      }
    },
    colors: ['#f59e0b']
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Coffee Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your coffee store today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="mr-4 p-3 rounded-lg bg-gray-100">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-800 mr-2">{stat.value}</h3>
                <span className="text-green-500 font-medium">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Sales Overview</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setChartPeriod('week')}
                className={`px-3 py-1 text-sm rounded-lg ${chartPeriod === 'week' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setChartPeriod('month')}
                className={`px-3 py-1 text-sm rounded-lg ${chartPeriod === 'month' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setChartPeriod('year')}
                className={`px-3 py-1 text-sm rounded-lg ${chartPeriod === 'year' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-64">
            <Chart 
              options={chartOptions} 
              series={chartData.series} 
              type="bar" 
              height="100%" 
              width="100%" 
            />
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <button className="text-amber-600 hover:text-amber-700 font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.total}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Top Selling Products</h2>
            <button className="text-amber-600 hover:text-amber-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <FaCoffee className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="font-medium text-gray-800">{product.revenue}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition">
              <div className="mr-4 p-2 rounded-lg bg-amber-600 text-white">
                <FaBoxOpen />
              </div>
              <span className="font-medium text-gray-800">Add New Product</span>
            </button>
            <button className="w-full flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
              <div className="mr-4 p-2 rounded-lg bg-blue-600 text-white">
                <FaShoppingCart />
              </div>
              <span className="font-medium text-gray-800">Process Orders</span>
            </button>
            <button className="w-full flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
              <div className="mr-4 p-2 rounded-lg bg-purple-600 text-white">
                <FaUsers />
              </div>
              <span className="font-medium text-gray-800">Manage Customers</span>
            </button>
            <button className="w-full flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition">
              <div className="mr-4 p-2 rounded-lg bg-green-600 text-white">
                <FaStar />
              </div>
              <span className="font-medium text-gray-800">View Reviews</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;