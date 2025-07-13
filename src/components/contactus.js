import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Users, Heart, Zap, Star } from 'lucide-react';
import Navbar from './Navbar';  

// Animated Counter Component
const CountingNumber = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= target) {
            clearInterval(timer);
            return target;
          }
          return Math.min(prev + increment, target);
        });
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, target, duration]);

  return (
    <div ref={elementRef} className="text-3xl font-bold text-white">
      {Math.floor(count)}{suffix}
    </div>
  );
};

// Animated Section Component
const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Floating Animation Component
const FloatingIcon = ({ icon, delay = 0 }) => {
  return (
    <div
      className="animate-pulse opacity-20"
      style={{
        animation: `float 3s ease-in-out infinite ${delay}s`,
        animationDelay: `${delay}s`
      }}
    >
      {icon}
    </div>
  );
};

export default function ContactUs() {
  // Move all state declarations to the top
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission with loading
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: '',
          message: ''
        });
      }, 3000);
    }, 2000);
  };

  // Add floating animation keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      @keyframes pulse-scale {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .animate-pulse-scale {
        animation: pulse-scale 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (isSubmitted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center ${darkMode ? 'dark' : ''}`}>
        <div className="text-center animate-pulse-scale">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Thank You!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Your message has been sent successfully.</p>
          <p className="text-gray-500 dark:text-gray-400">We'll get back to you within 24 hours.</p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${darkMode ? 'dark' : ''}`}>
      {/* Floating Background Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10">
          <FloatingIcon icon={<Phone className="w-8 h-8 text-blue-500" />} delay={0} />
        </div>
        <div className="absolute top-40 right-20">
          <FloatingIcon icon={<Mail className="w-10 h-10 text-indigo-500" />} delay={1} />
        </div>
        <div className="absolute bottom-40 left-20">
          <FloatingIcon icon={<MapPin className="w-6 h-6 text-cyan-500" />} delay={2} />
        </div>
        <div className="absolute bottom-20 right-10">
          <FloatingIcon icon={<Users className="w-8 h-8 text-purple-500" />} delay={0.5} />
        </div>
      </div>

      {/* Navbar */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <div className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <div className="mb-6">
              <Zap className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to take the next step in your career? We're here to help you find the perfect placement opportunity. 
              Reach out to us and let's start your journey to success.
            </p>
          </AnimatedSection>

          {/* Stats Section */}
          <AnimatedSection delay={300} className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 animate-pulse" />
              <div className="relative z-10">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <CountingNumber target={2000} suffix="+" />
                    <div className="text-sm opacity-90">Students Placed</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <CountingNumber target={500} suffix="+" />
                    <div className="text-sm opacity-90">Companies</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <CountingNumber target={95} suffix="%" />
                    <div className="text-sm opacity-90">Success Rate</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <CountingNumber target={4.9} suffix="/5" />
                    <div className="text-sm opacity-90">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <AnimatedSection delay={400}>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <AnimatedSection delay={500} className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-300">+91 9876543210</p>
                      <p className="text-gray-600 dark:text-gray-300">+91 9876543211</p>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={600} className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300">info@aadhira.com</p>
                      <p className="text-gray-600 dark:text-gray-300">placements@aadhira.com</p>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={700} className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Address</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        123 Education Street,<br />
                        Knowledge Park, Tech City,<br />
                        Chennai - 600001
                      </p>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={800} className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Office Hours</h4>
                      <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>

            {/* Services */}
            <AnimatedSection delay={900}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-700 shadow-lg">
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">How We Help You</h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Career counseling and guidance",
                    "Resume building and optimization",
                    "Interview preparation and mock sessions",
                    "Job placement assistance",
                    "Industry connections and networking"
                  ].map((service, index) => (
                    <AnimatedSection key={index} delay={1000 + index * 100}>
                      <div className="flex items-center group">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {service}
                        </span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection delay={600}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="flex items-center mb-8">
                <Send className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">Send us a Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                      focusedField === 'name' 
                        ? 'border-blue-500 shadow-lg transform scale-105' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-blue-500 shadow-lg transform scale-105' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                      focusedField === 'phone' 
                        ? 'border-blue-500 shadow-lg transform scale-105' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course/Specialization
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('course')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${
                      focusedField === 'course' 
                        ? 'border-blue-500 shadow-lg transform scale-105' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select your course</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="information-technology">Information Technology</option>
                    <option value="electronics">Electronics & Communication</option>
                    <option value="mechanical">Mechanical Engineering</option>
                    <option value="civil">Civil Engineering</option>
                    <option value="mba">MBA</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                      focusedField === 'message' 
                        ? 'border-blue-500 shadow-lg transform scale-105' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Tell us about your career goals and how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection delay={1200}>
            <p className="text-gray-400 dark:text-gray-300">
              © 2024 Aadhira. All rights reserved. | Empowering Students, Building Futures
            </p>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
}