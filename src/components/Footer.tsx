import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold">{settings.branding.siteName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {settings.content.aboutContent}
            </p>
            <div className="flex space-x-4">
              <a href={settings.contact.social.facebook} className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href={settings.contact.social.twitter} className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href={settings.contact.social.instagram} className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/hotels" className="text-gray-400 hover:text-white transition-colors">Find Hotels</Link></li>
              <li><Link to="/b2b" className="text-gray-400 hover:text-white transition-colors">B2B Solutions</Link></li>
              <li><Link to="/my-bookings" className="text-gray-400 hover:text-white transition-colors">My Bookings</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cancellation</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary" />
                <span className="text-gray-400">{settings.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary" />
                <span className="text-gray-400">{settings.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-primary" />
                <span className="text-gray-400">{settings.contact.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 {settings.branding.siteName}. All rights reserved. | Built with ❤️ for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;