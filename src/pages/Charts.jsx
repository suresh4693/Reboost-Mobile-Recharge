import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import apiService from '../services/api'

const Charts = () => {
  const [operatorData, setOperatorData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChartData()
  }, [])

  const fetchChartData = async () => {
    try {
      const data = await apiService.getDashboardStats()
      
      
      setOperatorData(data.operatorStats?.map(stat => ({
        name: stat._id,
        recharges: stat.count,
        amount: stat.amount,
        color: stat._id === 'Jio' ? '#3B82F6' : stat._id === 'Airtel' ? '#EF4444' : stat._id === 'VI' ? '#8B5CF6' : '#F59E0B'
      })) || [])
      
      setMonthlyData(data.monthlySpending?.map(item => ({
        month: item._id.split('-')[1],
        amount: item.amount
      })) || [])
    } catch (error) {
      console.error('Error fetching chart data:', error)
    } finally {
      setLoading(false)
    }
  }

  const pieData = operatorData.map(item => ({
    name: item.name,
    value: Math.round((item.recharges / operatorData.reduce((sum, op) => sum + op.recharges, 0)) * 100) || 0,
    color: item.color
  }))

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive charts and analytics</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Charts...</h3>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}

export default Charts