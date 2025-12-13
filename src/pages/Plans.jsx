import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Plans = () => {
  const navigate = useNavigate()
  const [selectedOperator, setSelectedOperator] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000])

  const handleRecharge = (plan) => {
    navigate('/recharge', { state: { selectedPlan: plan } })
  }

  const plans = [
    { id: 1, operator: 'Jio', amount: 149, validity: '28 days', data: '1GB/day', description: 'Perfect for daily use', popular: false, rating: 4.5 },
    { id: 2, operator: 'Jio', amount: 239, validity: '28 days', data: '1.5GB/day', description: 'Most popular plan', popular: true, rating: 4.7 },
    { id: 3, operator: 'Jio', amount: 399, validity: '56 days', data: '2GB/day', description: 'Long validity plan', popular: false, rating: 4.6 },
    { id: 4, operator: 'Jio', amount: 666, validity: '84 days', data: '1.5GB/day', description: 'Extended validity', popular: false, rating: 4.4 },
    { id: 5, operator: 'Airtel', amount: 155, validity: '28 days', data: '1GB/day', description: 'Great value for money', popular: false, rating: 4.3 },
    { id: 6, operator: 'Airtel', amount: 265, validity: '28 days', data: '1.5GB/day', description: 'Premium experience', popular: true, rating: 4.6 },
    { id: 7, operator: 'Airtel', amount: 449, validity: '56 days', data: '2GB/day', description: 'High speed data', popular: false, rating: 4.5 },
    { id: 8, operator: 'Airtel', amount: 719, validity: '84 days', data: '1.5GB/day', description: 'Long term plan', popular: false, rating: 4.4 },
    { id: 9, operator: 'VI', amount: 179, validity: '28 days', data: '1GB/day', description: 'Reliable network', popular: false, rating: 4.1 },
    { id: 10, operator: 'VI', amount: 299, validity: '28 days', data: '1.5GB/day', description: 'Enhanced experience', popular: false, rating: 4.2 },
    { id: 11, operator: 'VI', amount: 479, validity: '56 days', data: '1.5GB/day', description: 'Extended validity', popular: false, rating: 4.0 },
    { id: 12, operator: 'VI', amount: 699, validity: '84 days', data: '1.5GB/day', description: 'Long duration plan', popular: false, rating: 4.1 },
    { id: 13, operator: 'BSNL', amount: 108, validity: '28 days', data: '1GB/day', description: 'Budget friendly', popular: false, rating: 3.8 },
    { id: 14, operator: 'BSNL', amount: 187, validity: '28 days', data: '2GB/day', description: 'More data plan', popular: false, rating: 3.9 },
    { id: 15, operator: 'BSNL', amount: 319, validity: '54 days', data: '1GB/day', description: 'Extended plan', popular: false, rating: 3.7 },
    { id: 16, operator: 'BSNL', amount: 797, validity: '160 days', data: '2GB/day', description: 'Long term value', popular: true, rating: 4.0 }
  ]

  const operators = ['All', 'Jio', 'Airtel', 'VI', 'BSNL']

  const filteredPlans = plans.filter(plan => {
    const operatorMatch = selectedOperator === 'All' || plan.operator === selectedOperator
    const priceMatch = plan.amount >= priceRange[0] && plan.amount <= priceRange[1]
    return operatorMatch && priceMatch
  })

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the best recharge plans for your needs with exclusive offers and benefits
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Operator Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Operator
              </label>
              <div className="flex flex-wrap gap-2">
                {operators.map((operator) => (
                  <button
                    key={operator}
                    onClick={() => setSelectedOperator(operator)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedOperator === operator
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {operator}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-shadow">
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  👑 POPULAR
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">₹{plan.amount}</h3>
                  <p className="text-sm text-gray-600">{plan.operator}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium">{plan.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">📶</span>
                  <span className="text-sm font-medium">{plan.data}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">📞</span>
                  <span className="text-sm">Unlimited Calls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500">💬</span>
                  <span className="text-sm">100 SMS/day</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Validity: {plan.validity}</p>
                <p className="text-sm text-gray-700">{plan.description}</p>
              </div>

              <button 
                onClick={() => handleRecharge(plan)}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                ⚡ Recharge Now
              </button>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Plans Found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more plans</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Plans