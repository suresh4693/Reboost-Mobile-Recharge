import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const stats = [
    { title: 'Wallet Balance', value: '₹1,250', icon: '💰', color: 'text-green-500' },
    { title: 'Total Recharges', value: '24', icon: '⚡', color: 'text-blue-500' },
    { title: 'This Month', value: '₹2,400', icon: '📈', color: 'text-purple-500' },
    { title: 'Cashback Earned', value: '₹180', icon: '🎁', color: 'text-orange-500' }
  ]

  const transactions = [
    { id: 1, mobile: '9876543210', operator: 'Jio', amount: 239, status: 'Success', date: '2024-01-15' },
    { id: 2, mobile: '9876543210', operator: 'Airtel', amount: 265, status: 'Success', date: '2024-01-10' },
    { id: 3, mobile: '9876543211', operator: 'VI', amount: 179, status: 'Failed', date: '2024-01-08' }
  ]

  // Chart data for operator usage
  const operatorData = [
    { name: 'Jio', recharges: 12, amount: 2850, color: '#3B82F6' },
    { name: 'Airtel', recharges: 8, amount: 2120, color: '#EF4444' },
    { name: 'VI', recharges: 3, amount: 537, color: '#8B5CF6' },
    { name: 'BSNL', recharges: 1, amount: 108, color: '#F59E0B' }
  ]

  const pieData = [
    { name: 'Jio', value: 50, color: '#3B82F6' },
    { name: 'Airtel', value: 33, color: '#EF4444' },
    { name: 'VI', value: 12, color: '#8B5CF6' },
    { name: 'BSNL', value: 5, color: '#F59E0B' }
  ]

  const monthlyData = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 2400 },
    { month: 'Apr', amount: 1900 },
    { month: 'May', amount: 2200 },
    { month: 'Jun', amount: 2600 }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">Here's your recharge analytics and account overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart - Operator Usage */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📊 Operator Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={operatorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name === 'recharges' ? 'Recharges' : 'Amount (₹)']} />
                <Bar dataKey="recharges" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Operator Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🥧 Operator Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Spending Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">📈 Monthly Spending Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">⚡ Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="h-20 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex flex-col items-center justify-center space-y-2">
                  <span className="text-2xl">⚡</span>
                  <span>Quick Recharge</span>
                </button>
                <button className="h-20 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex flex-col items-center justify-center space-y-2">
                  <span className="text-2xl">📱</span>
                  <span>Browse Plans</span>
                </button>
                <button className="h-20 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex flex-col items-center justify-center space-y-2">
                  <span className="text-2xl">📊</span>
                  <span>View History</span>
                </button>
                <button className="h-20 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex flex-col items-center justify-center space-y-2">
                  <span className="text-2xl">🎁</span>
                  <span>Offers & Deals</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">📋 Recent Activity</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.status === 'Success' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{transaction.mobile}</p>
                        <p className="text-sm text-gray-600">{transaction.operator}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{transaction.amount}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Recharge Form */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🚀 Quick Recharge</h2>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Operator</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select Operator</option>
                  <option>Jio</option>
                  <option>Airtel</option>
                  <option>VI</option>
                  <option>BSNL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  ⚡ Recharge
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard