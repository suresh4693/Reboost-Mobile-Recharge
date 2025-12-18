import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import apiService from '../services/api'

const Plans = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedOperator, setSelectedOperator] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPlans()
  }, [selectedOperator, priceRange])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const filters = {
        operator: selectedOperator !== 'All' ? selectedOperator : undefined,
        minAmount: priceRange[0],
        maxAmount: priceRange[1]
      }
      const data = await apiService.getPlans(filters)
      setPlans(data)
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRecharge = (plan) => {
    navigate('/recharge', { 
      state: { 
        selectedPlan: plan,
        fromPlansPage: true,
        mobile: location.state?.mobile,
        operator: location.state?.operator
      } 
    })
  }

  const operators = ['All', 'Jio', 'Airtel', 'VI', 'BSNL']

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
        {loading ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Plans...</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.filter(plan => {
              if (selectedOperator !== 'All' && plan.operator !== selectedOperator) return false
              if (plan.amount < priceRange[0] || plan.amount > priceRange[1]) return false
              return true
            }).map((plan) => (
            <div key={plan._id || plan.id} className="bg-white rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-shadow">
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  POPULAR
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">₹{plan.amount}</h3>
                  <p className="text-sm text-gray-600">{plan.operator}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium">Rating: {plan.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500 font-medium">Data:</span>
                  <span className="text-sm font-medium">{plan.data}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 font-medium">Calls:</span>
                  <span className="text-sm">{plan.calls || 'Unlimited'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500 font-medium">SMS:</span>
                  <span className="text-sm">{plan.sms || '100/day'}</span>
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
                Recharge Now
              </button>
            </div>
          ))}
          </div>
        )}

        {!loading && plans.filter(plan => {
          if (selectedOperator !== 'All' && plan.operator !== selectedOperator) return false
          if (plan.amount < priceRange[0] || plan.amount > priceRange[1]) return false
          return true
        }).length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Plans Found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more plans</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Plans