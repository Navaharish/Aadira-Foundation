// Navbar.js
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);

  const navItems = [
    { name: 'Home', href: '/', bgColor: 'bg-blue-200 dark:bg-blue-900' },
    { name: 'About Us', href: '/about', bgColor: 'bg-blue-200 dark:bg-blue-900' },
    { name: 'Courses', href: '/courses', bgColor: 'bg-blue-200 dark:bg-blue-900' },
    { name: 'Contact', href: '/contact', bgColor: 'bg-blue-200 dark:bg-blue-900' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
        : 'bg-white/90 dark:bg-gray-900/90 py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            <Link to="/" aria-label="Go to homepage">
              Aadhira
            </Link>
          </motion.div>

          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                  onMouseEnter={() => setActiveNavItem(item.name)}
                  onMouseLeave={() => setActiveNavItem(null)}
                >
                  <Link
                    to={item.href}
                    className={`px-4 py-2 font-medium transition-colors rounded-md ${
                      darkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-700 hover:text-blue-600'
                    } ${
                      activeNavItem === item.name ? item.bgColor : ''
                    }`}
                    aria-current={window.location.pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 w-full ${
                      darkMode ? 'bg-blue-400' : 'bg-blue-600'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: activeNavItem === item.name ? 1 : 0,
                      transition: { type: 'spring', stiffness: 300, damping: 20 }
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? 'bg-gray-700 text-yellow-300' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden mobile-menu ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={window.location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                {darkMode ? (
                  <>
                    <SunIcon className="h-5 w-5 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-5 w-5 mr-2" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;