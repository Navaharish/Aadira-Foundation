import { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [collegeCount, setCollegeCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
          
          if (entry.target.id === 'stats-section') {
            animateCount(setCollegeCount, 5000, 2000);
            animateCount(setStudentCount, 3000, 2000);
          }
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll handler for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const animateCount = (setter, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(Math.floor(start));
      }
    }, 16);
  };

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`font-sans text-gray-800 dark:text-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navbar Component */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-300 dark:bg-blue-700 rounded-full opacity-5 animate-ping delay-2000"></div>
      </div>

      {/* Main Content */}
      <main className="pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div 
            id="hero-title"
            data-animate
            className={`transform transition-all duration-1000 ${
              isVisible['hero-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-300 dark:via-blue-400 dark:to-blue-500 animate-pulse">
              About Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mb-8 animate-pulse"></div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="mb-20">
          <div 
            id="about-card"
            data-animate
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible['about-card'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100 dark:border-blue-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-600 rounded-full opacity-30 animate-pulse delay-500"></div>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-justify relative z-10">
                  <span className="text-2xl text-blue-600 dark:text-blue-400 font-bold">A</span>adhira Training and Placement is a pioneering organization dedicated to empowering college students by providing high-quality training programs and free placement assistance.
                  We are committed to bridging the gap between education and employability by equipping students with the essential skills needed to thrive in today's competitive job market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Story Section */}
        <section>
          <div 
            id="story-title"
            data-animate
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible['story-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } mb-10`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
              My Story
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div 
            id="story-content"
            data-animate
            className={`transform transition-all duration-1000 delay-700 ${
              isVisible['story-content'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 md:p-12 border border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-800 rounded-full opacity-10 -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 dark:bg-blue-700 rounded-full opacity-10 translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Over the years, we have successfully conducted training programs for more than{' '}
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 text-white px-3 py-1 rounded-full font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    5000+ colleges
                  </span>
                  , empowering students with industry-relevant skills.
                  Through our initiatives, we have facilitated placements for over{' '}
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 text-white px-3 py-1 rounded-full font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    3000+ candidates
                  </span>
                  , bridging the gap between education and employment.
                </p>
                
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-600 to-transparent"></div>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  To strengthen our impact, we have collaborated with esteemed companies such as{' '}
                  <span className="font-bold text-blue-600 dark:text-blue-400 hover:underline decoration-wavy decoration-blue-400 cursor-pointer transition-all duration-300">
                    Brain Tech Solutions
                  </span>
                  ,{' '}
                  <span className="font-bold text-blue-600 dark:text-blue-400 hover:underline decoration-wavy decoration-blue-400 cursor-pointer transition-all duration-300">
                    Sai Finwin Group
                  </span>
                  ,{' '}
                  <span className="font-bold text-blue-600 dark:text-blue-400 hover:underline decoration-wavy decoration-blue-400 cursor-pointer transition-all duration-300">
                    TCS
                  </span>
                  , and{' '}
                  <span className="font-bold text-blue-600 dark:text-blue-400 hover:underline decoration-wavy decoration-blue-400 cursor-pointer transition-all duration-300">
                    Braintech Solutions
                  </span>
                  .
                  These partnerships ensure that our candidates receive the best career opportunities, fostering a skilled workforce ready for the future.
                </p>
                
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-600 to-transparent"></div>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Our mission remains to equip aspiring professionals with the right skills and connect them with promising career prospects,
                  creating a lasting impact in the education and employment ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="mt-16 mb-20">
          <div 
            id="certificate-section"
            data-animate
            className={`transform transition-all duration-1000 delay-900 ${
              isVisible['certificate-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Our Recognition
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100 dark:border-blue-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="/certificate.png" 
                  alt="Aadhira Certificate" 
                  className="w-full max-w-md rounded-xl shadow-lg border border-blue-300 dark:border-blue-600 mb-6"
                />
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                  Our commitment to excellence in training and placement services has been recognized through various certifications and awards, 
                  validating our dedication to empowering students and bridging the gap between education and employment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-20">
          <div 
            id="stats-section"
            data-animate
            className={`transform transition-all duration-1000 delay-1000 ${
              isVisible['stats-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="text-4xl font-bold mb-2">{collegeCount}+</div>
                <div className="text-lg opacity-90">Colleges Trained</div>
              </div>
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 dark:from-blue-600 dark:to-blue-700 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="text-4xl font-bold mb-2">{studentCount}+</div>
                <div className="text-lg opacity-90">Students Placed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Top Button */}
        {showBackToTop && (
          <div className="fixed bottom-8 right-8 z-40">
            <button 
              onClick={scrollToTop}
              className="bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer animate-bounce"
              aria-label="Back to top"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        )}
      </main>

      {/* Particle Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutPage;