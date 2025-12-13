import { useState } from 'react'

const History = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const transactions = [
    { id: 1, mobile: '9876543210', operator: 'Jio', amount: 239, status: 'Success', date: '2024-01-15', transactionId: 'TXN123456789' },
    { id: 2, mobile: '9876543210', operator: 'Airtel', amount: 265, status: 'Success', date: '2024-01-10', transactionId: 'TXN123456788' },
    { id: 3, mobile: '9876543211', operator: 'VI', amount: 179, status: 'Failed', date: '2024-01-08', transactionId: 'TXN123456787' },
    { id: 4, mobile: '9876543212', operator: 'BSNL', amount: 108, status: 'Success', date: '2024-01-05', transactionId: 'TXN123456786' },
    { id: 5, mobile: '9876543213', operator: 'Jio', amount: 399, status: 'Pending', date: '2024-01-03', transactionId: 'TXN123456785' }
  ]

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.mobile.includes(searchTerm) || 
                         transaction.operator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success': return '✅'
      case 'Failed': return '❌'
      case 'Pending': return '⏳'
      default: return '❓'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Transaction <span className="text-gradient">History</span>
          </h1>
          <p className="text-gray-600">Track all your recharge transactions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search by mobile number or operator"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              📥 Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {transactions.filter(t => t.status === 'Success').length}
            </div>
            <div className="text-green-600 text-sm">Successful Recharges</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ₹{transactions.filter(t => t.status === 'Success').reduce((sum, t) => sum + t.amount, 0)}
            </div>
            <div className="text-blue-600 text-sm">Total Amount</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {transactions.filter(t => t.status === 'Failed').length}
            </div>
            <div className="text-red-600 text-sm">Failed Transactions</div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Mobile</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Operator</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-mono text-sm text-gray-600">
                        {transaction.transactionId}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {transaction.mobile}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-700">
                        {transaction.operator}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">
                        ₹{transaction.amount}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span>{getStatusIcon(transaction.status)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600 text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Transactions Found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default History