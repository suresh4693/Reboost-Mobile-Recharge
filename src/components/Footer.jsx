import { Link } from 'react-router-dom'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Recharge', path: '/recharge' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  const operators = ['Jio', 'Airtel', 'VI', 'BSNL']

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <span className="text-white font-bold">📱</span>
              </div>
              <span className="text-2xl font-bold">ReBoost</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted mobile recharge partner. Fast, secure, and reliable recharge services 
              for all major operators across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">📘</a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">🐦</a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">📷</a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">📺</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Operators */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Supported Operators</h3>
            <ul className="space-y-2">
              {operators.map((operator) => (
                <li key={operator} className="text-gray-300 text-sm">
                  {operator}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                24/7 Service
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📧</span>
                <span className="text-gray-300 text-sm">support@reboost.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📞</span>
                <span className="text-gray-300 text-sm">1800-123-RECHARGE</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📍</span>
                <span className="text-gray-300 text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ReBoost. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer