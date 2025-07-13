import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from './Navbar';

const NotFound = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = React.useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4 animate-pulse">
              404
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Looking for something specific?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/about"
                className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
              >
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">About Us</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Learn more about Aadhira Training and Placement
                </p>
              </Link>
              <Link
                to="/courses"
                className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors"
              >
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Our Courses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Explore our comprehensive training programs
                </p>
              </Link>
              <a
                href="#contact"
                className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors"
              >
                <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get in touch with our team
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 