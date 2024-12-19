import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-sky-400">Sky Airlines</h3>
            <p className="text-gray-300 leading-relaxed">
              Providing safe and comfortable flights across the globe since 2024.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/flights" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Flight Schedule</span>
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Book a Flight</span>
                </Link>
              </li>
              <li>
                <Link to="/check-in" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Online Check-in</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-400">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-400">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center hover:text-sky-400 transition-colors duration-300">
                <span className="font-medium">Email:</span>
                <a href="mailto:info@skyairlines.com" className="ml-2">info@skyairlines.com</a>
              </p>
              <p className="flex items-center hover:text-sky-400 transition-colors duration-300">
                <span className="font-medium">Phone:</span>
                <a href="tel:+1234567890" className="ml-2">+1 234 567 890</a>
              </p>
              <p className="hover:text-sky-400 transition-colors duration-300">
                <span className="font-medium">Address:</span>
                <span className="ml-2">123 Aviation Street, Sky City, SC 12345</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="hover:text-sky-400 transition-colors duration-300">
            © 2024 Sky Airlines. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 