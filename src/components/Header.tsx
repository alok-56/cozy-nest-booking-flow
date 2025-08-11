import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, User, ShoppingCart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'B2B', path: '/b2b' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-primary">HotelBook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary font-semibold' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+1 (555) 123-4567" className="text-muted-foreground hover:text-primary transition-colors">
              <Phone size={20} />
            </a>
            <a href="mailto:contact@hotelbook.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
            <Link to="/my-bookings">
              <Button variant="outline" size="sm">
                <User size={16} className="mr-2" />
                My Bookings
              </Button>
            </Link>
           
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary font-semibold' : 'text-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <User size={16} className="mr-2" />
                    My Bookings
                  </Button>
                </Link>
                {/* <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ShoppingCart size={16} className="mr-2" />
                    Cart
                  </Button>
                </Link> */}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;