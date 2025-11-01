import React, { useState } from 'react'
import { User, ShoppingBag, ShoppingCart, Bell, Star, BookOpen, HelpCircle, ChevronDown, Settings } from 'lucide-react'

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications] = useState(3)
  const [cartItems] = useState(2)

  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    status: "Premium Member",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinDate: "Member since Jan 2023",
    totalOrders: 24,
    loyaltyPoints: 850
  }

  const navigationItems = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'cart', label: 'Cart & Checkout', icon: ShoppingCart, badge: cartItems },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'guide', label: 'Coffee Guide', icon: BookOpen },
    { id: 'support', label: 'Help & Support', icon: HelpCircle }
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value={user.name} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={user.email} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                    Update Profile
                  </button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders:</span>
                    <span className="font-semibold">{user.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loyalty Points:</span>
                    <span className="font-semibold text-amber-600">{user.loyaltyPoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Status:</span>
                    <span className="font-semibold text-green-600">{user.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Order #100{order}</h3>
                      <p className="text-gray-600 text-sm">Placed on March {order + 10}, 2024</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Delivered
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={`https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=60&h=60&fit=crop`} 
                      alt="Coffee" 
                      className="w-15 h-15 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Premium Coffee Blend {order}</p>
                      <p className="text-gray-600 text-sm">Quantity: 2 bags</p>
                    </div>
                    <p className="font-semibold">${(29.99 * order).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'cart':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={`https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop`} 
                        alt="Coffee" 
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">Arabica Coffee Blend {item}</h3>
                        <p className="text-gray-600 text-sm">Premium quality, medium roast</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button className="bg-gray-200 px-2 py-1 rounded">-</button>
                          <span className="px-3 py-1">1</span>
                          <button className="bg-gray-200 px-2 py-1 rounded">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(24.99 * item).toFixed(2)}</p>
                        <button className="text-red-600 text-sm hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>$74.97</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>$5.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>$6.48</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>$87.44</span>
                  </div>
                </div>
                <button className="w-full bg-amber-600 text-white py-3 rounded-lg mt-4 hover:bg-amber-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
            <div className="space-y-4">
              {[
                { type: 'order', message: 'Your order #1003 has been shipped', time: '2 hours ago', unread: true },
                { type: 'promotion', message: 'New coffee blend available - 20% off!', time: '1 day ago', unread: true },
                { type: 'review', message: 'Please review your recent purchase', time: '3 days ago', unread: false }
              ].map((notification, index) => (
                <div key={index} className={`bg-white p-6 rounded-lg shadow-sm border ${notification.unread ? 'border-l-4 border-l-amber-500' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${notification.unread ? 'bg-amber-100' : 'bg-gray-100'}`}>
                      <Bell className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className={`${notification.unread ? 'font-semibold' : ''}`}>{notification.message}</p>
                      <p className="text-gray-500 text-sm">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'reviews':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">My Reviews</h2>
            <div className="space-y-4">
              {[1, 2].map((review) => (
                <div key={review} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={`https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=80&h=80&fit=crop`} 
                      alt="Coffee" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">Premium Coffee Blend {review}</h3>
                      <div className="flex items-center space-x-1 my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm">
                        Excellent coffee with rich flavor and perfect aroma. Highly recommended for coffee lovers!
                      </p>
                      <p className="text-gray-500 text-xs mt-2">Reviewed on March {review + 15}, 2024</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'guide':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Coffee Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Brewing Methods', desc: 'Learn different brewing techniques', image: 'photo-1495474472287-4d71bcdd2085' },
                { title: 'Coffee Origins', desc: 'Discover coffee regions worldwide', image: 'photo-1587734195503-904fca47d0b9' },
                { title: 'Roast Levels', desc: 'Understanding light to dark roasts', image: 'photo-1559056199-641a0ac8b55e' },
                { title: 'Storage Tips', desc: 'Keep your coffee fresh longer', image: 'photo-1497935586351-b67a49e012bf' }
              ].map((guide, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/${guide.image}?w=400&h=200&fit=crop`} 
                    alt={guide.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{guide.title}</h3>
                    <p className="text-gray-600 text-sm">{guide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'support':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <p className="text-sm"><strong>Email:</strong> support@coffeeshop.com</p>
                  <p className="text-sm"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-sm"><strong>Hours:</strong> Mon-Fri 9AM-6PM EST</p>
                </div>
                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-amber-700 transition-colors">
                  Start Live Chat
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Quick Help</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-sm text-amber-600 hover:underline">How to place an order</a>
                  <a href="#" className="block text-sm text-amber-600 hover:underline">Shipping information</a>
                  <a href="#" className="block text-sm text-amber-600 hover:underline">Return policy</a>
                  <a href="#" className="block text-sm text-amber-600 hover:underline">Payment methods</a>
                  <a href="#" className="block text-sm text-amber-600 hover:underline">Coffee brewing guide</a>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <div>Select a section from the navigation</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Coffee Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.avatar} 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                />
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-amber-600">{user.status}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation Bar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="text-center mb-6">
                <img 
                  src={user.avatar} 
                  alt="User" 
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-amber-500"
                />
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-amber-600">{user.status}</p>
                <p className="text-xs text-gray-500">{user.joinDate}</p>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === item.id 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard