const About = () => {
  const stats = [
    { number: '10M+', label: 'Happy Customers', icon: '👥' },
    { number: '50M+', label: 'Recharges Completed', icon: '⚡' },
    { number: '99.9%', label: 'Success Rate', icon: '🏆' },
    { number: '24/7', label: 'Customer Support', icon: '🛡️' }
  ]

  const values = [
    { icon: '🎯', title: 'Our Mission', description: 'To make mobile recharge simple, fast, and accessible for everyone across India.' },
    { icon: '❤️', title: 'Our Vision', description: 'To be the most trusted and preferred mobile recharge platform in the country.' },
    { icon: '🛡️', title: 'Our Values', description: 'Security, reliability, and customer satisfaction are at the core of everything we do.' }
  ]

  const team = [
    { 
      name: 'Suresh Kumar', 
      role: 'CEO & Founder', 
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKq7Y6p_JP7iR3CD7YgxFP9vRB3_OUwjvDCLK_5mNYyiZlvqi5Fq1rmRaa0l4MRHXExJkp1QFAbwINtj1VJGh8D75it6z4rA-4GZg9Avwz&s=10',
      fallback: '👨💼', 
      description: '10+ years in fintech and mobile services' 
    },
    { 
      name: 'Veera lakshmi', 
      role: 'CTO', 
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
      fallback: '👩💻', 
      description: 'Expert in secure payment systems' 
    },
    { 
      name: 'Vignesh', 
      role: 'Head of Operations', 
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
      fallback: '👨🎯', 
      description: 'Ensuring smooth 24/7 operations' 
    }
  ]

  const timeline = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to simplify mobile recharge' },
    { year: '2021', title: '1M Users', description: 'Reached our first million happy customers' },
    { year: '2022', title: 'All Operators', description: 'Added support for all major telecom operators' },
    { year: '2023', title: '10M Recharges', description: 'Processed over 10 million successful recharges' },
    { year: '2024', title: 'AI Integration', description: 'Launched AI-powered customer support and recommendations' }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">ReBoost</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize mobile recharge in India with 
            cutting-edge technology and unmatched customer service.
          </p>
        </div>

        {/* Hero Story */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Founded in 2020, ReBoost started with a simple idea: mobile recharge should be 
              instant, secure, and hassle-free. What began as a small startup has grown into 
              India's most trusted recharge platform, serving millions of customers daily.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, we're proud to offer the fastest recharge service with the highest success 
              rates, backed by cutting-edge technology and a team that's passionate about 
              customer satisfaction.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from product development to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind ReBoost who work tirelessly to serve you better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                  <div className="text-6xl hidden">{member.fallback}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">Key milestones in our growth story</p>
          </div>

          <div className="space-y-8">
            {timeline.map((milestone) => (
              <div key={milestone.year} className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-blue-600 font-medium mb-1">support@reboost.com</p>
              <p className="text-gray-600 text-sm">Send us an email anytime</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-blue-600 font-medium mb-1">1800-123-RECHARGE</p>
              <p className="text-gray-600 text-sm">24/7 customer support</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-blue-600 font-medium mb-1">Mumbai, Maharashtra</p>
              <p className="text-gray-600 text-sm">Our headquarters</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Working Hours</h3>
              <p className="text-blue-600 font-medium mb-1">24/7 Available</p>
              <p className="text-gray-600 text-sm">Always here to help</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of India's fastest-growing recharge platform
            </p>
            <div className="space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Recharging
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About