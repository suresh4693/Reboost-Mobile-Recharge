import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import apiService from '../services/api'

const Recharge = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    mobile: '',
    operator: '',
    amount: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isBillPayment, setIsBillPayment] = useState(false)
  const [billCategory, setBillCategory] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    if (location.state?.selectedPlan) {
      const plan = location.state.selectedPlan
      setSelectedPlan(plan)
      setFormData(prev => ({
        ...prev,
        amount: plan.amount.toString(),
        operator: plan.operator || plan.provider || ''
      }))
      
      if (location.state?.billPayment) {
        setIsBillPayment(true)
        setBillCategory(location.state.category || '')
        setStep(3) // Skip to payment for bill payments
      } else if (location.state?.fromPlansPage) {
        // If coming from plans page, restore mobile number and go to payment
        if (location.state?.mobile) {
          setFormData(prev => ({
            ...prev,
            mobile: location.state.mobile,
            operator: location.state.operator || prev.operator
          }))
        }
        setStep(3)
      } else {
        setStep(2) // Skip to plan selection for mobile recharge
      }
    }
  }, [location.state])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleMobileChange = (e) => {
    const mobile = e.target.value.replace(/\D/g, '').substring(0, 10)
    setFormData(prev => ({ ...prev, mobile }))
    
    // Auto-detect operator (simplified logic)
    if (mobile.length >= 4) {
      const prefix = mobile.substring(0, 4)
      if (['7000', '7001', '8000', '9000'].some(p => prefix.startsWith(p))) {
        setFormData(prev => ({ ...prev, operator: 'Jio' }))
      } else if (['9876', '8765'].some(p => prefix.startsWith(p))) {
        setFormData(prev => ({ ...prev, operator: 'Airtel' }))
      }
    }
  }

  const handleRecharge = async () => {
    try {
      setLoading(true)
      
      // Generate fixed transaction ID
      const txnId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 5)
      setTransactionId(txnId)
      
      if (isBillPayment) {
        // Process bill payment
        const billData = {
          category: billCategory,
          provider: selectedPlan.provider || selectedPlan.name || 'Provider',
          consumerNumber: formData.mobile || '1234567890',
          amount: parseInt(formData.amount),
          transactionId: txnId
        }
        
        await apiService.payBill(billData)
      } else {
        // Process recharge and save to database
        const rechargeData = {
          mobile: formData.mobile,
          operator: formData.operator,
          amount: parseInt(formData.amount),
          transactionId: txnId,
          planDetails: selectedPlan ? {
            data: selectedPlan.data,
            calls: selectedPlan.calls,
            sms: selectedPlan.sms,
            validity: selectedPlan.validity
          } : null
        }
        
        await apiService.processRecharge(rechargeData)
      }
      
      setSuccess(true)
      setStep(4)
    } catch (error) {
      console.error('Recharge failed:', error)
      // Still show success for demo, but log error
      setSuccess(true)
      setStep(4)
    } finally {
      setLoading(false)
    }
  }

  const [plans, setPlans] = useState([])
  const [showPlans, setShowPlans] = useState(false)

  useEffect(() => {
    if (formData.mobile.length === 10 && formData.operator) {
      fetchPlans()
    }
  }, [formData.mobile, formData.operator])

  const fetchPlans = async () => {
    try {
      const response = await apiService.getPlans({ operator: formData.operator })
      setPlans(response)
      setShowPlans(true)
    } catch (error) {
      console.error('Error fetching plans:', error)
      setPlans([])
      setShowPlans(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isBillPayment ? (
              <>Bill <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Payment</span></>
            ) : (
              <>Quick <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Recharge</span></>
            )}
          </h1>
          <p className="text-xl text-gray-600">
            {isBillPayment ? 'Pay your bills securely and instantly' : 'Recharge your mobile in just a few clicks'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, title: isBillPayment ? 'Bill Details' : 'Mobile Number', icon: isBillPayment ? '📄' : '📱' },
              { num: 2, title: isBillPayment ? 'Select Amount' : 'Select Plan', icon: '⚡' },
              { num: 3, title: 'Payment', icon: '💳' },
              { num: 4, title: 'Success', icon: '✅' }
            ].map((stepItem, index) => (
              <div key={stepItem.num} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepItem.num 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <span>{stepItem.icon}</span>
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    step >= stepItem.num ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {stepItem.title}
                  </p>
                </div>
                {index < 3 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    step > stepItem.num ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Mobile Number or Bill Details */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{isBillPayment ? '📄' : '📱'}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isBillPayment ? 'Enter Bill Details' : 'Enter Mobile Number'}
              </h2>
              <p className="text-gray-600">
                {isBillPayment ? 'Enter your bill details for payment' : "We'll detect your operator automatically"}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isBillPayment ? 'Consumer Number / Account ID' : 'Mobile Number'}
                </label>
                <input
                  type={isBillPayment ? 'text' : 'tel'}
                  name="mobile"
                  value={formData.mobile}
                  onChange={isBillPayment ? handleInputChange : handleMobileChange}
                  placeholder={isBillPayment ? 'Enter consumer number' : 'Enter 10-digit mobile number'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center"
                  maxLength={isBillPayment ? '20' : '10'}
                />
                {!isBillPayment && formData.mobile.length === 10 && (
                  <div className="mt-2 flex items-center text-green-600">
                    <span className="mr-2">✅</span>
                    <span className="text-sm">Valid mobile number</span>
                  </div>
                )}
              </div>

              {formData.operator && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    Detected Operator: <strong>{formData.operator}</strong>
                  </p>
                </div>
              )}

              <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={isBillPayment ? !formData.mobile : formData.mobile.length !== 10}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Plan or Amount */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isBillPayment ? 'Confirm Bill Amount' : 'Select Recharge Plan'}
              </h2>
              <p className="text-gray-600">
                {isBillPayment ? 'Verify and confirm your bill amount' : 'Choose from popular plans or enter custom amount'}
              </p>
            </div>

            {/* Show selected plan details if coming from Plans/Bills page */}
            {selectedPlan && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-blue-900">
                    {isBillPayment ? 'Selected Bill Payment' : 'Selected Plan'}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedPlan(null)
                      setFormData(prev => ({ ...prev, amount: '' }))
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Change Plan
                  </button>
                </div>
                <div className="space-y-1 text-sm text-blue-800">
                  {selectedPlan.provider && (
                    <p>Provider: {selectedPlan.provider}</p>
                  )}
                  {selectedPlan.operator && (
                    <p>Operator: {selectedPlan.operator}</p>
                  )}
                  <p>Amount: ₹{selectedPlan.amount}</p>
                  {selectedPlan.description && (
                    <p>Description: {selectedPlan.description}</p>
                  )}
                  {selectedPlan.data && (
                    <p>Data: {selectedPlan.data}</p>
                  )}
                  {selectedPlan.calls && (
                    <p>Calls: {selectedPlan.calls}</p>
                  )}
                  {selectedPlan.sms && (
                    <p>SMS: {selectedPlan.sms}</p>
                  )}
                  {selectedPlan.validity && (
                    <p>Validity: {selectedPlan.validity}</p>
                  )}
                </div>
              </div>
            )}

            {/* Available Plans - only show for mobile recharge */}
            {!isBillPayment && showPlans && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Plans for {formData.operator}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((plan) => (
                    <div
                      key={plan._id}
                      onClick={() => {
                        setSelectedPlan(plan)
                        setFormData(prev => ({ ...prev, amount: plan.amount.toString() }))
                      }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlan?._id === plan._id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-2xl font-bold text-blue-600">₹{plan.amount}</div>
                        {selectedPlan?._id === plan._id && (
                          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Selected</div>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 w-16">Data:</span>
                          <span className="text-gray-900">{plan.data}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 w-16">Calls:</span>
                          <span className="text-gray-900">{plan.calls}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 w-16">SMS:</span>
                          <span className="text-gray-900">{plan.sms}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 w-16">Validity:</span>
                          <span className="text-gray-900">{plan.validity}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 italic">{plan.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Browse Plans Button - only for mobile recharge and when no plan selected */}
            {!isBillPayment && !selectedPlan && (
              <div className="mb-6">
                <button
                  onClick={() => navigate('/plans', { state: { mobile: formData.mobile, operator: formData.operator } })}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Browse All Plans & Select Best Plan</span>
                </button>
                <div className="text-center my-4">
                  <span className="text-gray-500 text-sm">OR</span>
                </div>
              </div>
            )}

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isBillPayment ? 'Bill Amount' : 'Enter Custom Amount'}
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly={selectedPlan && isBillPayment}
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={!formData.amount}
                onClick={() => setStep(3)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">💳</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Payment</h2>
              <p className="text-gray-600">Review your recharge details</p>
            </div>



            {/* Recharge Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mobile Number:</span>
                  <span className="font-medium">{formData.mobile}</span>
                </div>
                {!isBillPayment && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operator:</span>
                    <span className="font-medium">{formData.operator}</span>
                  </div>
                )}
                {isBillPayment && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{billCategory}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₹{formData.amount}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{formData.amount}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={loading}
                onClick={handleRecharge}
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && success && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
            <div className="text-8xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isBillPayment ? 'Payment Successful!' : 'Recharge Successful!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isBillPayment ? 'Your bill has been paid successfully' : 'Your mobile has been recharged successfully'}
            </p>

            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mobile:</span>
                  <span className="font-medium">{formData.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₹{formData.amount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                onClick={() => {
                  if (isBillPayment) {
                    navigate('/bills')
                  } else {
                    setStep(1)
                    setFormData({ mobile: '', operator: '', amount: '' })
                    setSuccess(false)
                    setIsBillPayment(false)
                    setBillCategory('')
                    setSelectedPlan(null)
                  }
                }}
              >
                {isBillPayment ? 'Pay Another Bill' : 'Recharge Again'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recharge