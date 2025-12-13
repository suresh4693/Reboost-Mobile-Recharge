export const operators = [
  {
    id: 1,
    name: 'Jio',
    logo: '🔵',
    color: 'from-blue-500 to-blue-600',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Airtel',
    logo: '🔴',
    color: 'from-red-500 to-red-600',
    rating: 4.3
  },
  {
    id: 3,
    name: 'VI',
    logo: '🟣',
    color: 'from-purple-500 to-purple-600',
    rating: 4.1
  },
  {
    id: 4,
    name: 'BSNL',
    logo: '🟡',
    color: 'from-yellow-500 to-yellow-600',
    rating: 3.8
  }
]

export const plans = [
  {
    id: 1,
    operator: 'Jio',
    amount: 149,
    validity: '28 days',
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    description: 'Perfect for daily use',
    popular: false,
    rating: 4.5,
    benefits: ['Unlimited calls', '100 SMS/day', 'JioApps subscription']
  },
  {
    id: 2,
    operator: 'Jio',
    amount: 239,
    validity: '28 days',
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    description: 'Most popular plan',
    popular: true,
    rating: 4.7,
    benefits: ['Unlimited calls', '100 SMS/day', 'JioApps subscription', 'Extra data']
  },
  {
    id: 3,
    operator: 'Airtel',
    amount: 155,
    validity: '28 days',
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    description: 'Great value for money',
    popular: false,
    rating: 4.3,
    benefits: ['Unlimited calls', '100 SMS/day', 'Airtel Thanks benefits']
  },
  {
    id: 4,
    operator: 'Airtel',
    amount: 265,
    validity: '28 days',
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    description: 'Premium experience',
    popular: true,
    rating: 4.6,
    benefits: ['Unlimited calls', '100 SMS/day', 'Airtel Thanks benefits', 'Disney+ Hotstar']
  },
  {
    id: 5,
    operator: 'VI',
    amount: 179,
    validity: '28 days',
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    description: 'Reliable network',
    popular: false,
    rating: 4.1,
    benefits: ['Unlimited calls', '100 SMS/day', 'Vi Movies & TV']
  },
  {
    id: 6,
    operator: 'BSNL',
    amount: 108,
    validity: '28 days',
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    description: 'Budget friendly',
    popular: false,
    rating: 3.8,
    benefits: ['Unlimited calls', '100 SMS/day', 'Government network']
  }
]

export const transactions = [
  {
    id: 1,
    mobile: '9876543210',
    operator: 'Jio',
    amount: 239,
    status: 'Success',
    date: '2024-01-15',
    transactionId: 'TXN123456789'
  },
  {
    id: 2,
    mobile: '9876543210',
    operator: 'Airtel',
    amount: 265,
    status: 'Success',
    date: '2024-01-10',
    transactionId: 'TXN123456788'
  },
  {
    id: 3,
    mobile: '9876543211',
    operator: 'VI',
    amount: 179,
    status: 'Failed',
    date: '2024-01-08',
    transactionId: 'TXN123456787'
  }
]

export const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rating: 5,
    comment: 'Super fast recharge! Love the instant confirmation.',
    avatar: '👨‍💼'
  },
  {
    id: 2,
    name: 'Priya Patel',
    rating: 5,
    comment: 'Best recharge app with amazing offers and cashback.',
    avatar: '👩‍💻'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    rating: 4,
    comment: 'Easy to use interface and reliable service.',
    avatar: '👨‍🎓'
  }
]