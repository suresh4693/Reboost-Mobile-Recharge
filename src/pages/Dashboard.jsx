import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import apiService from '../services/api'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState([
    { title: 'Wallet Balance', value: '₹0', color: 'text-green-500' },
    { title: 'Total Recharges', value: '0', color: 'text-blue-500' },
    { title: 'This Month', value: '₹0', color: 'text-purple-500' },
    { title: 'Cashback Earned', value: '₹0', color: 'text-orange-500' }
  ])
  const [operatorData, setOperatorData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch history data for charts
      const [rechargeData, billData] = await Promise.all([
        apiService.getRechargeHistory(),
        apiService.getBillHistory()
      ])
      
      const totalRecharges = rechargeData.length
      const totalBills = billData.length
      const totalRechargeAmount = rechargeData.reduce((sum, item) => sum + item.amount, 0)
      const totalBillAmount = billData.reduce((sum, item) => sum + item.amount, 0)
      
      setStats([
        { title: 'Total Transactions', value: (totalRecharges + totalBills).toString(), color: 'text-green-500' },
        { title: 'Total Recharges', value: totalRecharges.toString(), color: 'text-blue-500' },
        { title: 'Total Bills', value: totalBills.toString(), color: 'text-purple-500' },
        { title: 'Total Spent', value: `₹${totalRechargeAmount + totalBillAmount}`, color: 'text-orange-500' }
      ])
      
      // Operator/Provider data from history
      const operatorStats = {}
      rechargeData.forEach(item => {
        if (!operatorStats[item.operator]) {
          operatorStats[item.operator] = { count: 0, amount: 0 }
        }
        operatorStats[item.operator].count++
        operatorStats[item.operator].amount += item.amount
      })
      
      billData.forEach(item => {
        const provider = item.category || item.provider
        if (!operatorStats[provider]) {
          operatorStats[provider] = { count: 0, amount: 0 }
        }
        operatorStats[provider].count++
        operatorStats[provider].amount += item.amount
      })
      
      setOperatorData(Object.entries(operatorStats).map(([name, data]) => ({
        name,
        recharges: data.count,
        amount: data.amount,
        color: name === 'Jio' ? '#3B82F6' : name === 'Airtel' ? '#EF4444' : name === 'VI' ? '#8B5CF6' : '#10B981'
      })))
      
      // Monthly spending from history
      const monthlyStats = {}
      const allTransactions = [...rechargeData, ...billData]
      allTransactions.forEach(item => {
        const month = new Date(item.createdAt).toISOString().slice(0, 7)
        if (!monthlyStats[month]) {
          monthlyStats[month] = 0
        }
        monthlyStats[month] += item.amount
      })
      
      setMonthlyData(Object.entries(monthlyStats).map(([month, amount]) => ({
        month: new Date(month + '-01').toLocaleDateString('en', { month: 'short' }),
        amount
      })))
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const transactions = [
    { id: 1, mobile: '9876543210', operator: 'Jio', amount: 239, status: 'Success', date: '2024-01-15' },
    { id: 2, mobile: '9876543210', operator: 'Airtel', amount: 265, status: 'Success', date: '2024-01-10' },
    { id: 3, mobile: '9876543211', operator: 'VI', amount: 179, status: 'Failed', date: '2024-01-08' }
  ]

  const pieData = operatorData.map(item => ({
    name: item.name,
    value: Math.round((item.recharges / operatorData.reduce((sum, op) => sum + op.recharges, 0)) * 100) || 0,
    color: item.color
  }))

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Here's your recharge analytics and account overview</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard...</h3>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <h3 className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart - Operator Usage */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Operator Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={operatorData.length ? operatorData : [
                { name: 'Jio', recharges: 8, amount: 1890, color: '#3B82F6' },
                { name: 'Airtel', recharges: 5, amount: 1250, color: '#EF4444' },
                { name: 'VI', recharges: 3, amount: 750, color: '#8B5CF6' },
                { name: 'BSNL', recharges: 2, amount: 480, color: '#F59E0B' }
              ]}>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Operator Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData.length ? pieData : [
                    { name: 'Jio', value: 44, color: '#3B82F6' },
                    { name: 'Airtel', value: 28, color: '#EF4444' },
                    { name: 'VI', value: 17, color: '#8B5CF6' },
                    { name: 'BSNL', value: 11, color: '#F59E0B' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {(pieData.length ? pieData : [
                    { name: 'Jio', value: 44, color: '#3B82F6' },
                    { name: 'Airtel', value: 28, color: '#EF4444' },
                    { name: 'VI', value: 17, color: '#8B5CF6' },
                    { name: 'BSNL', value: 11, color: '#F59E0B' }
                  ]).map((entry, index) => (
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
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Spending Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData.length ? monthlyData : [
              { month: 'Jan', amount: 2450 },
              { month: 'Feb', amount: 1890 },
              { month: 'Mar', amount: 3200 },
              { month: 'Apr', amount: 2750 },
              { month: 'May', amount: 3850 },
              { month: 'Jun', amount: 2950 }
            ]}>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/recharge')}
                  className="h-20 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  Quick Recharge
                </button>
                <button 
                  onClick={() => navigate('/plans')}
                  className="h-20 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Browse Plans
                </button>
                <button 
                  onClick={() => navigate('/history')}
                  className="h-20 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  View History
                </button>
                <button 
                  onClick={() => navigate('/offers')}
                  className="h-20 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Offers & Deals
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Recharge</h2>
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
                  Recharge
                </button>
              </div>
            </form>
          </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard