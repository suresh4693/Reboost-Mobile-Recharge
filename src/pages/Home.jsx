import { Link } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const operators = [
    { 
      id: 1, 
      name: 'Jio', 
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Jio-Logo.png',
      fallback: '🔵',
      color: 'from-blue-500 to-blue-600', 
      rating: 4.5,
      users: '40M+'
    },
    { 
      id: 2, 
      name: 'Airtel', 
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Airtel-Logo.png',
      fallback: '🔴',
      color: 'from-red-500 to-red-600', 
      rating: 4.3,
      users: '35M+'
    },
    { 
      id: 3, 
      name: 'VI', 
      logo: 'https://cdn.worldvectorlogo.com/logos/vi-vodafone-idea.svg',
      fallback: 'VI',
      color: 'from-purple-500 to-purple-600', 
      rating: 4.1,
      users: '25M+'
    },
    { 
      id: 4, 
      name: 'BSNL', 
      logo: 'https://cdn.worldvectorlogo.com/logos/bsnl.svg',
      fallback: 'BSNL',
      color: 'from-yellow-500 to-yellow-600', 
      rating: 3.8,
      users: '15M+'
    }
  ]

  const features = [
    { icon: '⚡', title: 'Instant Recharge', description: 'Lightning-fast recharge processing in seconds' },
    { icon: '🛡️', title: '100% Secure', description: 'Bank-grade security for all transactions' },
    { icon: '🕒', title: '24/7 Service', description: 'Round-the-clock customer support' },
    { icon: '🎁', title: 'Best Offers', description: 'Exclusive deals and cashback rewards' }
  ]

  const stats = [
    { number: '10M+', label: 'Happy Customers', icon: '👥' },
    { number: '50M+', label: 'Recharges Done', icon: '📱' },
    { number: '4.8', label: 'App Rating', icon: '⭐' },
    { number: '99.9%', label: 'Success Rate', icon: '🏆' }
  ]

  const testimonials = [
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      rating: 5, 
      comment: 'Super fast recharge! Love the instant confirmation.', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      fallback: '👨💼'
    },
    { 
      id: 2, 
      name: 'Samantha Suresh', 
      rating: 5, 
      comment: 'Best recharge app with amazing offers and cashback.', 
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Samantha_at_Kushi_Musical_concert_%282%29_%28cropped%29.jpg/500px-Samantha_at_Kushi_Musical_concert_%282%29_%28cropped%29.jpg',
      fallback: '👩💻'
    },
    { 
      id: 3, 
      name: 'Amit Kumar', 
      rating: 4, 
      comment: 'Easy to use interface and reliable service.', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      fallback: '👨🎓'
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroSlide, setHeroSlide] = useState(0)

  const heroImages = [
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop', // Mobile phone with apps
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop', // Cashback/money offers
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', // Payment/credit cards
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', // Network/connectivity
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop', // Mobile app interface
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', // Technology/digital
    'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop', // Customer support
    'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop'  // Mobile technology
  ]

  const nextHeroSlide = () => {
    setHeroSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevHeroSlide = () => {
    setHeroSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const appImages = [
    {
      title: 'Mobile App',
      description: 'Download our mobile app for quick recharges on the go',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      fallback: '📱'
    },
    {
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-grade security',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      fallback: '💳'
    },
    {
      title: 'Customer Support',
      description: '24/7 customer support for all your queries',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
      fallback: '🎧'
    },
    {
      title: 'Fast Recharge',
      description: 'Lightning fast recharge in just seconds',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      fallback: '⚡'
    },
    {
      title: 'All Operators',
      description: 'Support for all major telecom operators',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      fallback: '📶'
    },
    {
      title: 'Cashback Offers',
      description: 'Exclusive cashback and reward offers',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
      fallback: '🎁'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(appImages.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(appImages.length / 3)) % Math.ceil(appImages.length / 3))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Content - 60% */}
            <div className="lg:col-span-3">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Recharge Made{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Simple</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Fast, secure, and reliable mobile recharge for all operators. 
                Get instant recharge with exclusive offers and cashback.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/recharge" className="bg-blue-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors text-lg">
                  ⚡ Recharge Now
                </Link>
                <Link to="/plans" className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors text-lg">
                  📋 View Plans
                </Link>
              </div>
            </div>

            {/* Discovery Carousel - 40% */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={heroImages[heroSlide]} 
                    alt="ReBoost Features"
                    className="w-full h-80 object-cover transition-all duration-500"
                  />
                </div>
                
                {/* Navigation Buttons */}
                <button 
                  onClick={prevHeroSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all"
                >
                  ←
                </button>
                <button 
                  onClick={nextHeroSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all"
                >
                  →
                </button>
                
                {/* Dots Indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setHeroSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        heroSlide === index ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Operator Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {operators.map((operator) => (
              <div key={operator.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-105">
                <div className="mb-4">
                  <img 
                    src={operator.logo} 
                    alt={operator.name}
                    className="w-16 h-16 mx-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${operator.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xs hidden`}>
                    {operator.fallback}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{operator.name}</h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm font-medium">{operator.rating}</span>
                </div>
                <p className="text-xs text-gray-600">{operator.users} users</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Discovery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover the ReBoost Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for seamless mobile recharge experience
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(appImages.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {appImages.slice(slideIndex * 3, slideIndex * 3 + 3).map((item, index) => (
                        <div key={slideIndex * 3 + index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                          <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                            <div className="w-full h-full flex items-center justify-center text-6xl hidden">
                              {item.fallback}
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            >
              ←
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            >
              →
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(appImages.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop" 
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ReBoost?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the fastest and most secure mobile recharge service with exclusive benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-2xl text-white mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop" 
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join millions of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                  <div className="text-4xl hidden">{testimonial.fallback}</div>
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop" 
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop" 
                alt="Mobile App"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <div className="text-6xl mb-6">📱</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get the ReBoost Mobile App
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Download our app for faster recharges, exclusive offers, and seamless experience
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                  <span>🍎</span>
                  <span>Download for iOS</span>
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <span>🤖</span>
                  <span>Download for Android</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of users and experience the fastest recharge service
          </p>
          <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors text-lg">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home