import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AcademicCapIcon, BriefcaseIcon, CodeBracketIcon, PaintBrushIcon, ArrowRightIcon, ChatBubbleLeftRightIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import Navbar from './Navbar'; // Import the Navbar component

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const typingTimeoutRef = useRef(null);

  const textArray = ['Training', 'Communication', 'Placement Support'];
  const typingDelay = 120;
  const erasingDelay = 70;
  const newTextDelay = 1500;

  const courseCategories = [
    {
      title: 'Core Office & Business Tools',
      icon: <BriefcaseIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
      courses: [
        'Microsoft Office Suite',
        'Tally',
        'Advanced Excel',
        'Email Etiquette',
        'Google Workspace',
      ],
    },
    {
      title: 'Programming & Software Skills',
      icon: <CodeBracketIcon className="w-8 h-8 text-green-500 dark:text-green-400" />,
      courses: [
        'Python',
        'Web Development',
        'Java',
        'C/C++',
        'Database Basics',
      ],
    },
    {
      title: 'Design & Creativity',
      icon: <PaintBrushIcon className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
      courses: [
        'Graphic Design',
        'Canva Design',
        'UI/UX Basics',
        'Video Editing',
        'Digital Storytelling',
      ],
    },
    {
      title: 'Soft Skills & Communication',
      icon: <AcademicCapIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />,
      courses: [
        'Communication Skills',
        'Interview Preparation',
        'Resume Building',
        'Public Speaking',
        'Time Management',
      ],
    },
  ];

  // Typewriter effect
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % textArray.length;
      const fullText = textArray[i];
      
      setTypedText(isDeleting
        ? fullText.substring(0, typedText.length - 1)
        : fullText.substring(0, typedText.length + 1)
      );

      if (!isDeleting && typedText === fullText) {
        typingTimeoutRef.current = setTimeout(() => setIsDeleting(true), newTextDelay);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    typingTimeoutRef.current = setTimeout(
      handleTyping,
      isDeleting ? erasingDelay : typingDelay
    );

    return () => clearTimeout(typingTimeoutRef.current);
  }, [typedText, isDeleting, loopNum]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkMode]);

  return (
    <div className={`font-sans text-gray-800 dark:text-gray-200 ${darkMode ? 'dark' : ''}`}>
      {/* Use the Navbar component */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        {/* Hero Section with Typewriter Effect */}
        <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
                Empowering Students with <span className="text-blue-600 dark:text-blue-400">Real-World Skills</span>
              </h1>
              <div className="text-3xl md:text-4xl font-bold text-gray-600 dark:text-white mb-8 max-w-3xl mx-auto h-8">
                <span>{typedText}</span>
                <span className="ml-1 animate-pulse">|</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.a
                  href="#courses"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Explore Courses
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section id="courses" className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">What We Offer</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive training programs designed to bridge the gap between education and employment
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {courseCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.courses.map((course) => (
                        <li key={course} className="flex items-start">
                          <CheckBadgeIcon className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{course}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 text-center">
                      <a 
                        href="#contact" 
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        View More <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section id="about" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Mission</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-md p-8 md:p-10 text-center"
            >
              <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-6" />
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Our primary goal is to deliver impactful training that not only enhances students' technical and soft skills but also fosters confidence and self-growth. We aim to create a future where every student, regardless of their background, can access quality education and achieve their career aspirations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">What People Say</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-blue-50 dark:bg-gray-800 rounded-xl shadow-md p-8 md:p-10 relative"
            >
              <div className="absolute top-6 left-6 text-blue-200 dark:text-blue-900 text-5xl">"</div>
              <blockquote className="italic text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 pl-8">
                The training sessions conducted by Aadhira Training and Placement have been truly transformative. Their focus on skill-building, motivation, and effective communication has immensely benefitted our students, especially the first-year batch. The practical approach and interactive methodology made learning engaging and impactful.
                <br /><br />
                Aadhira Training Group has also played a vital role in connecting students with relevant placement opportunities, ensuring they are industry-ready. Their dedication to enhancing employability skills and personal development is commendable.
                <br /><br />
                We are incredibly grateful for the positive impact Aadhira has had on our students' academic and professional growth. Thank you for empowering the future generation!
              </blockquote>
              <div className="text-right font-semibold text-blue-600 dark:text-blue-400">
                — <span className="text-gray-800 dark:text-gray-200">Rohini. K</span>, CEO and Founder, Aadhira Training and Placement
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Build Your Future?</h2>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                Join Aadhira Today
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Aadhira</h3>
              <p className="text-gray-400">
                Empowering students with real-world skills for better career opportunities.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/courses" className="text-gray-400 hover:text-white transition-colors">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-gray-400">
                <p className="mb-2">123 Education Street</p>
                <p className="mb-2">Chennai, Tamil Nadu 600001</p>
                <p className="mb-2">Phone: +91 98765 43210</p>
                <p>Email: info@aadhiratraining.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Aadhira Training and Placement. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;