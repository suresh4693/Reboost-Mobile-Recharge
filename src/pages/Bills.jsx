import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import apiService from '../services/api'

const Bills = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [recentBills, setRecentBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchBillHistory()
    }
  }, [user])

  const fetchBillHistory = async () => {
    try {
      const data = await apiService.getBillHistory()
      setRecentBills(data.slice(0, 3)) // Show only recent 3 bills
    } catch (error) {
      console.error('Error fetching bill history:', error)
      setRecentBills([])
    } finally {
      setLoading(false)
    }
  }

  const handlePayBill = (plan, category) => {
    if (!user) {
      navigate('/login')
      return
    }

    navigate('/recharge', { 
      state: { 
        selectedPlan: plan,
        billPayment: true,
        category: category
      } 
    })
  }

  const billCategories = [
    { 
      id: 1, 
      name: 'Electricity', 
      color: 'from-yellow-500 to-orange-500', 
      logo: 'https://cdn-icons-png.flaticon.com/512/1040/1040241.png',
      providers: [
        { name: 'MSEB', plans: [{ amount: 500, description: 'Monthly Bill' }, { amount: 1000, description: 'Bi-Monthly Bill' }] },
        { name: 'TSSPDCL', plans: [{ amount: 750, description: 'Monthly Bill' }, { amount: 1500, description: 'Bi-Monthly Bill' }] },
        { name: 'BESCOM', plans: [{ amount: 600, description: 'Monthly Bill' }, { amount: 1200, description: 'Bi-Monthly Bill' }] }
      ]
    },
    { 
      id: 2, 
      name: 'Gas', 
      color: 'from-red-500 to-pink-500', 
      logo: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png',
      providers: [
        { name: 'Indane Gas', plans: [{ amount: 850, description: 'LPG Cylinder' }, { amount: 1700, description: '2 Cylinders' }] },
        { name: 'Bharat Gas', plans: [{ amount: 860, description: 'LPG Cylinder' }, { amount: 1720, description: '2 Cylinders' }] },
        { name: 'HP Gas', plans: [{ amount: 855, description: 'LPG Cylinder' }, { amount: 1710, description: '2 Cylinders' }] }
      ]
    },
    { 
      id: 3, 
      name: 'Water', 
      color: 'from-blue-500 to-cyan-500', 
      logo: 'https://cdn-icons-png.flaticon.com/512/2917/2917641.png',
      providers: [
        { name: 'Municipal Corp', plans: [{ amount: 200, description: 'Monthly Bill' }, { amount: 600, description: 'Quarterly Bill' }] },
        { name: 'Water Board', plans: [{ amount: 250, description: 'Monthly Bill' }, { amount: 750, description: 'Quarterly Bill' }] }
      ]
    },
    { 
      id: 4, 
      name: 'DTH/Cable', 
      color: 'from-purple-500 to-indigo-500', 
      logo: 'https://cdn-icons-png.flaticon.com/512/3039/3039393.png',
      providers: [
        { name: 'Tata Sky', plans: [{ amount: 299, description: 'Basic Pack' }, { amount: 499, description: 'Premium Pack' }, { amount: 799, description: 'Sports Pack' }] },
        { name: 'Airtel DTH', plans: [{ amount: 279, description: 'Basic Pack' }, { amount: 459, description: 'Premium Pack' }, { amount: 749, description: 'Sports Pack' }] },
        { name: 'Dish TV', plans: [{ amount: 259, description: 'Basic Pack' }, { amount: 429, description: 'Premium Pack' }, { amount: 699, description: 'Sports Pack' }] }
      ]
    },
    { 
      id: 5, 
      name: 'Internet', 
      color: 'from-green-500 to-teal-500', 
      logo: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
      providers: [
        { name: 'Jio Fiber', plans: [{ amount: 399, description: '30 Mbps' }, { amount: 699, description: '100 Mbps' }, { amount: 999, description: '150 Mbps' }] },
        { name: 'Airtel Xstream', plans: [{ amount: 449, description: '40 Mbps' }, { amount: 799, description: '100 Mbps' }, { amount: 1099, description: '200 Mbps' }] },
        { name: 'ACT Fibernet', plans: [{ amount: 549, description: '50 Mbps' }, { amount: 849, description: '150 Mbps' }, { amount: 1199, description: '300 Mbps' }] }
      ]
    },
    { 
      id: 6, 
      name: 'Insurance', 
      color: 'from-gray-500 to-slate-500', 
      logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      providers: [
        { name: 'LIC', plans: [{ amount: 5000, description: 'Term Plan' }, { amount: 10000, description: 'Endowment Plan' }] },
        { name: 'HDFC Life', plans: [{ amount: 4500, description: 'Term Plan' }, { amount: 9000, description: 'ULIP Plan' }] }
      ]
    }
  ]



  const filteredCategories = billCategories.filter(category => {
    const categoryMatch = selectedCategory === 'All' || category.name === selectedCategory
    const searchMatch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       category.providers.some(provider => provider.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return categoryMatch && searchMatch
  })

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Quick Bill Payment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Set up auto-pay for your regular bills and never miss a payment
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Search Bills
              </label>
              <input
                type="text"
                placeholder="Search by provider or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Categories</option>
                {billCategories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Recent Bills */}
        {!loading && recentBills.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Bills
            </h2>
            <div className="space-y-4">
              {recentBills.map(bill => (
                <div key={bill._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {bill.provider.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bill.provider}</h3>
                      <p className="text-sm text-gray-600">{bill.category}</p>
                      <p className="text-xs text-gray-500">Date: {new Date(bill.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{bill.amount}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      bill.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bill.status === 'success' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bill Categories */}
        {!selectedProvider ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map(category => (
              <div key={category.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="mb-4 text-center">
                  <img 
                    src={category.logo} 
                    alt={category.name}
                    className="w-16 h-16 mx-auto object-contain mb-2"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full items-center justify-center text-2xl mx-auto hidden`}>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">{category.name}</h3>
                
                <div className="space-y-2 mb-6">
                  {category.providers.slice(0, 3).map((provider, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>{provider.name}</span>
                    </div>
                  ))}
                  {category.providers.length > 3 && (
                    <p className="text-xs text-gray-500 text-center">
                      +{category.providers.length - 3} more providers
                    </p>
                  )}
                </div>

                <button 
                  onClick={() => setSelectedProvider(category)}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  View Plans
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Provider Plans View */
          <div>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setSelectedProvider(null)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>←</span>
                <span>Back to Categories</span>
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={selectedProvider.logo} 
                  alt={selectedProvider.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className={`w-12 h-12 bg-gradient-to-r ${selectedProvider.color} rounded-full items-center justify-center text-xl hidden`}>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.name} Plans</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedProvider.providers.map((provider, providerIndex) => (
                <div key={providerIndex} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{provider.name}</h3>
                  <div className="space-y-3">
                    {provider.plans.map((plan, planIndex) => (
                      <div key={planIndex} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-bold text-gray-900">₹{plan.amount}</span>
                          <span className="text-sm text-gray-600">{plan.description}</span>
                        </div>
                        <button 
                          onClick={() => handlePayBill({...plan, provider: provider.name}, selectedProvider.name)}
                          disabled={paymentLoading}
                          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm disabled:opacity-50"
                        >
                          {paymentLoading ? 'Processing...' : 'Pay Now'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Quick Bill Payment</h2>
          <p className="text-xl mb-6 opacity-90">
            Set up auto-pay for your regular bills and never miss a payment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Setup Auto-Pay
            </button>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Download App
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bills