import { useState } from 'react'

const Offers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const offers = [
    {
      id: 1,
      title: 'Cashback Bonanza',
      description: 'Get 10% cashback on recharges above ₹500',
      discount: '10% Cashback',
      validTill: '2024-02-29',
      category: 'cashback',
      operator: 'All Operators',
      minAmount: 500,
      code: 'CASH10'
    },
    {
      id: 2,
      title: 'Jio Special',
      description: 'Extra 2GB data on all Jio plans above ₹300',
      discount: 'Extra 2GB Data',
      validTill: '2024-02-15',
      category: 'data',
      operator: 'Jio',
      minAmount: 300,
      code: 'JIO2GB'
    },
    {
      id: 3,
      title: 'Weekend Offer',
      description: '15% off on all weekend recharges',
      discount: '15% Off',
      validTill: '2024-01-31',
      category: 'discount',
      operator: 'All Operators',
      minAmount: 200,
      code: 'WEEKEND15'
    },
    {
      id: 4,
      title: 'Airtel Bonus',
      description: 'Free 100 SMS on recharges above ₹400',
      discount: 'Free 100 SMS',
      validTill: '2024-02-20',
      category: 'sms',
      operator: 'Airtel',
      minAmount: 400,
      code: 'AIRSMS'
    },
    {
      id: 5,
      title: 'First Recharge Bonus',
      description: 'New users get 20% off on first recharge',
      discount: '20% Off',
      validTill: '2024-03-31',
      category: 'discount',
      operator: 'All Operators',
      minAmount: 100,
      code: 'FIRST20'
    },
    {
      id: 6,
      title: 'VI Data Boost',
      description: 'Double data on all VI plans this month',
      discount: 'Double Data',
      validTill: '2024-01-31',
      category: 'data',
      operator: 'VI',
      minAmount: 250,
      code: 'VIDATA'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Offers' },
    { id: 'cashback', name: 'Cashback' },
    { id: 'discount', name: 'Discounts' },
    { id: 'data', name: 'Data Bonus' },
    { id: 'sms', name: 'SMS Bonus' }
  ]

  const filteredOffers = offers.filter(offer => 
    selectedCategory === 'all' || offer.category === selectedCategory
  )

  const getCategoryColor = (category) => {
    const colors = {
      cashback: 'bg-green-100 text-green-800',
      discount: 'bg-blue-100 text-blue-800',
      data: 'bg-purple-100 text-purple-800',
      sms: 'bg-orange-100 text-orange-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Offers & Deals</h1>
          <p className="text-gray-600">Discover amazing offers and save on your recharges</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(offer.category)}`}>
                    {offer.discount}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Operator:</span>
                    <span className="font-medium">{offer.operator}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Min Amount:</span>
                    <span className="font-medium">₹{offer.minAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Valid Till:</span>
                    <span className="font-medium">{new Date(offer.validTill).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Promo Code</p>
                      <p className="font-mono font-bold text-blue-600">{offer.code}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                      Use Offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Offers Found</h3>
            <p className="text-gray-600">No offers available in this category.</p>
          </div>
        )}

        {/* Terms & Conditions */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Offers are valid for limited time only</li>
            <li>• Cashback will be credited within 24-48 hours</li>
            <li>• Offers cannot be combined with other promotions</li>
            <li>• Minimum recharge amount conditions apply</li>
            <li>• ReBoost reserves the right to modify or cancel offers</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Offers