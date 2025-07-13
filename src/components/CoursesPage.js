import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronRight, Monitor, Code, MessageCircle, Clock, Users, Award, Star, BookOpen, Zap, Target } from 'lucide-react';
import Navbar from './Navbar';

const CountingNumber = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${target}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [target, isVisible]);

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
    <div 
      id={`counter-${target}`}
      className="text-3xl font-bold"
    >
      {Math.floor(count)}{target >= 1000 ? '+' : ''}
    </div>
  );
};

const CoursesPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const coursesData = useMemo(() => ({
    msoffice: {
      title: "MS Office Courses",
      icon: <Monitor className="w-8 h-8" />,
      color: "blue",
      subtitle: "Master the essential productivity suite",
      courses: [
        {
          name: "Microsoft Word",
          duration: "4 weeks",
          students: "150+",
          rating: 4.8,
          level: "Beginner to Advanced",
          description: "Master document creation, formatting, and professional writing",
          modules: [
            "Basics of Microsoft Word (Navigation, Formatting, and Editing)",
            "Advanced Document Formatting (Headers, Footers, Page Layouts)",
            "Working with Styles, Themes, and Templates",
            "Creating Professional Reports and Research Papers",
            "Mail Merge for Bulk Communication"
          ],
          skills: ["Document Design", "Mail Merge", "Templates", "Professional Writing"]
        },
        {
          name: "Microsoft Excel",
          duration: "6 weeks",
          students: "200+",
          rating: 4.9,
          level: "Beginner to Expert",
          description: "From basics to advanced data analysis and automation",
          modules: [
            "Excel Basics (Formulas, Functions, and Data Entry)",
            "Data Visualization (Charts, Graphs, and Pivot Tables)",
            "Advanced Excel Functions (VLOOKUP, HLOOKUP, INDEX, MATCH)",
            "Data Cleaning and Sorting Techniques",
            "Macros and VBA for Automation"
          ],
          skills: ["Data Analysis", "Pivot Tables", "Advanced Functions", "VBA Macros"]
        },
        {
          name: "Microsoft PowerPoint",
          duration: "3 weeks",
          students: "120+",
          rating: 4.7,
          level: "Beginner to Advanced",
          description: "Create stunning presentations with professional design",
          modules: [
            "PowerPoint Basics (Slide Design and Layouts)",
            "Designing Professional Presentations Using Animations and Transitions",
            "Creating Infographics and Visual Stories",
            "Presenting with Confidence (Speaker View and Notes)"
          ],
          skills: ["Slide Design", "Animations", "Visual Storytelling", "Presentation Skills"]
        },
        {
          name: "Microsoft Outlook",
          duration: "2 weeks",
          students: "80+",
          rating: 4.6,
          level: "Beginner to Intermediate",
          description: "Master email management and productivity features",
          modules: [
            "Email Management Basics",
            "Calendar and Scheduling Meetings",
            "Organizing Contacts and Tasks",
            "Automating Responses with Rules and Templates",
            "Collaboration Features (Shared Calendars and Delegates)"
          ],
          skills: ["Email Management", "Calendar", "Task Organization", "Automation"]
        },
        {
          name: "Microsoft Access",
          duration: "5 weeks",
          students: "90+",
          rating: 4.5,
          level: "Intermediate to Advanced",
          description: "Database management and SQL fundamentals",
          modules: [
            "Introduction to Databases and MS Access",
            "Creating Tables, Queries, and Forms",
            "Building Relationships between Tables",
            "Generating Reports and Dashboards",
            "Basics of SQL in MS Access"
          ],
          skills: ["Database Design", "SQL", "Reports", "Data Management"]
        },
        {
          name: "Microsoft OneNote",
          duration: "2 weeks",
          students: "70+",
          rating: 4.4,
          level: "Beginner to Intermediate",
          description: "Organize and collaborate with digital notebooks",
          modules: [
            "Organizing Notes Effectively Using Sections, Pages, and Tags",
            "Collaborating with Teams in OneNote",
            "Integrating OneNote with Other MS Office Tools",
            "Using OneNote for Project and Research Management"
          ],
          skills: ["Note Organization", "Team Collaboration", "Project Management", "Research"]
        },
        {
          name: "Microsoft Teams",
          duration: "3 weeks",
          students: "160+",
          rating: 4.7,
          level: "Beginner to Advanced",
          description: "Master remote collaboration and communication",
          modules: [
            "Setting Up and Managing Teams",
            "Collaboration through Channels and Chats",
            "Scheduling and Hosting Online Meetings",
            "Integrating Teams with MS Office Apps",
            "File Sharing and Co-Authoring Documents"
          ],
          skills: ["Team Management", "Virtual Meetings", "Collaboration", "Integration"]
        },
        {
          name: "Microsoft Publisher",
          duration: "3 weeks",
          students: "60+",
          rating: 4.3,
          level: "Beginner to Intermediate",
          description: "Create professional marketing materials and publications",
          modules: [
            "Creating Brochures, Flyers, and Newsletters",
            "Designing Business Cards and Invitations",
            "Working with Templates and Custom Layouts",
            "Adding Visuals and Enhancing Designs",
            "Printing and Exporting Professional Documents"
          ],
          skills: ["Design", "Marketing Materials", "Layout", "Visual Enhancement"]
        },
        {
          name: "Microsoft SharePoint",
          duration: "4 weeks",
          students: "100+",
          rating: 4.6,
          level: "Intermediate to Advanced",
          description: "Collaborate and manage content in the cloud",
          modules: [
            "Introduction to SharePoint Basics",
            "Creating and Managing SharePoint Sites",
            "File Sharing and Collaboration in Teams",
            "Automating Workflows with Power Automate",
            "Managing Permissions and Access Control"
          ],
          skills: ["Site Management", "Workflow Automation", "Permissions", "Collaboration"]
        },
        {
          name: "Advanced MS Office Suite",
          duration: "6 weeks",
          students: "130+",
          rating: 4.8,
          level: "Advanced",
          description: "Integrate and automate across the entire Office suite",
          modules: [
            "Integration of MS Office Tools (Excel to Word, PowerPoint to Word)",
            "Cloud Collaboration with OneDrive Using Office 365",
            "Automating Processes Across MS Office with Power Automate",
            "Troubleshooting and Productivity Tips"
          ],
          skills: ["Integration", "Automation", "Cloud Collaboration", "Productivity"]
        }
      ]
    },
    programming: {
      title: "Programming & Development",
      icon: <Code className="w-8 h-8" />,
      color: "indigo",
      subtitle: "Build the future with cutting-edge technology",
      courses: [
        {
          name: "Python Programming",
          duration: "8 weeks",
          students: "300+",
          rating: 4.9,
          level: "Basic to Advanced",
          description: "Master Python from fundamentals to advanced applications",
          modules: [
            "Python Programming (Basic to Advanced)",
            "Data Science Fundamentals",
            "Machine Learning with Python",
            "Web Development with Python",
            "Automation and Scripting"
          ],
          skills: ["Python Syntax", "Data Science", "Machine Learning", "Web Development"]
        },
        {
          name: "Java Programming",
          duration: "10 weeks",
          students: "250+",
          rating: 4.8,
          level: "Beginner to Advanced",
          description: "Enterprise-level programming with Java",
          modules: [
            "Java Programming Fundamentals",
            "Object-Oriented Programming",
            "Spring Framework",
            "Database Integration",
            "Enterprise Applications"
          ],
          skills: ["Java Syntax", "OOP", "Spring", "Database Integration"]
        },
        {
          name: "Web Development",
          duration: "12 weeks",
          students: "400+",
          rating: 4.9,
          level: "Beginner to Expert",
          description: "Full-stack web development with modern frameworks",
          modules: [
            "HTML, CSS, JavaScript Fundamentals",
            "React and Modern Frontend",
            "Node.js Backend Development",
            "Full-Stack Development (MERN, MEAN stack)",
            "Database Management"
          ],
          skills: ["Frontend", "Backend", "Full-Stack", "Modern Frameworks"]
        },
        {
          name: "Mobile App Development",
          duration: "10 weeks",
          students: "220+",
          rating: 4.7,
          level: "Intermediate to Advanced",
          description: "Create mobile apps for Android and iOS",
          modules: [
            "Mobile App Development (Android Studio, Flutter)",
            "Cross-Platform Development",
            "UI/UX for Mobile",
            "App Store Deployment",
            "Mobile Backend Integration"
          ],
          skills: ["Android", "Flutter", "Cross-Platform", "Mobile UI/UX"]
        },
        {
          name: "Data Science & Analytics",
          duration: "14 weeks",
          students: "180+",
          rating: 4.8,
          level: "Intermediate to Expert",
          description: "Extract insights from data with modern tools",
          modules: [
            "Data Science Fundamentals",
            "Data Visualization (Tableau, Power BI)",
            "Big Data Analytics (Hadoop, Spark)",
            "SQL and Database Management",
            "Artificial Intelligence (AI)"
          ],
          skills: ["Data Analysis", "Visualization", "Big Data", "AI/ML"]
        },
        {
          name: "Cloud Computing",
          duration: "8 weeks",
          students: "150+",
          rating: 4.6,
          level: "Intermediate to Advanced",
          description: "Master cloud platforms and DevOps",
          modules: [
            "Introduction to Cloud Computing",
            "AWS (Amazon Web Services) Essentials",
            "Microsoft Azure Fundamentals",
            "Google Cloud Platform Basics",
            "DevOps and CI/CD Pipeline (Jenkins, Docker, Kubernetes)"
          ],
          skills: ["AWS", "Azure", "GCP", "DevOps"]
        },
        {
          name: "Cybersecurity",
          duration: "12 weeks",
          students: "200+",
          rating: 4.7,
          level: "Intermediate to Expert",
          description: "Protect systems and data from cyber threats",
          modules: [
            "Ethical Hacking and Cybersecurity Basics",
            "Network Security",
            "Cloud Security",
            "Incident Response and Risk Management",
            "Cyber Threat Intelligence"
          ],
          skills: ["Ethical Hacking", "Network Security", "Risk Management", "Threat Intelligence"]
        },
        {
          name: "Embedded Systems & IoT",
          duration: "10 weeks",
          students: "120+",
          rating: 4.5,
          level: "Intermediate to Advanced",
          description: "Build smart devices and IoT solutions",
          modules: [
            "Basics of Embedded Systems",
            "IoT (Internet of Things) using Arduino/Raspberry Pi",
            "Microcontroller Programming (8051, PIC, ARM)",
            "Robotics and Automation",
            "Smart Device Development"
          ],
          skills: ["Embedded Systems", "IoT", "Arduino", "Robotics"]
        }
      ]
    },
    communication: {
      title: "Communication & Soft Skills",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "cyan",
      subtitle: "Enhance your personal and professional growth",
      courses: [
        {
          name: "Communication Skills",
          duration: "6 weeks",
          students: "500+",
          rating: 4.8,
          level: "Beginner to Advanced",
          description: "Master the art of effective communication",
          modules: [
            "Public Speaking and Presentation Skills",
            "Business English and Email Etiquette",
            "Effective Communication and Interpersonal Skills",
            "Active Listening and Feedback Skills",
            "Storytelling for Impact"
          ],
          skills: ["Public Speaking", "Business Communication", "Interpersonal Skills", "Storytelling"]
        },
        {
          name: "Personality Development",
          duration: "8 weeks",
          students: "350+",
          rating: 4.7,
          level: "Beginner to Intermediate",
          description: "Develop confidence and leadership qualities",
          modules: [
            "Time Management and Productivity",
            "Emotional Intelligence and Self-Awareness",
            "Building Confidence and Self-Esteem",
            "Leadership and Teamwork Skills",
            "Stress Management Techniques"
          ],
          skills: ["Leadership", "Emotional Intelligence", "Time Management", "Confidence"]
        },
        {
          name: "Career & Employability Skills",
          duration: "4 weeks",
          students: "400+",
          rating: 4.9,
          level: "Beginner to Intermediate",
          description: "Prepare for career success and job interviews",
          modules: [
            "Resume Writing and Cover Letter Creation",
            "Group Discussion and Interview Preparation",
            "Job Search Strategies and Networking Skills",
            "Workplace Ethics and Professionalism",
            "Career Planning and Goal Setting"
          ],
          skills: ["Interview Skills", "Resume Writing", "Networking", "Career Planning"]
        },
        {
          name: "Entrepreneurship & Innovation",
          duration: "10 weeks",
          students: "200+",
          rating: 4.6,
          level: "Intermediate to Advanced",
          description: "Launch your startup and business ideas",
          modules: [
            "Basics of Entrepreneurship",
            "Idea Generation and Business Planning",
            "Financial Literacy for Entrepreneurs",
            "Pitching and Fundraising Skills",
            "Digital Marketing for Startups"
          ],
          skills: ["Business Planning", "Pitching", "Financial Literacy", "Digital Marketing"]
        },
        {
          name: "Digital Literacy & Social Media",
          duration: "5 weeks",
          students: "300+",
          rating: 4.5,
          level: "Beginner to Intermediate",
          description: "Navigate the digital world effectively",
          modules: [
            "Digital Etiquette and Cyber Awareness",
            "Social Media Branding and Personal Branding",
            "Basics of Blogging and Vlogging",
            "Content Creation for Social Media Platforms",
            "Online Learning and Research Skills"
          ],
          skills: ["Digital Literacy", "Social Media", "Content Creation", "Personal Branding"]
        },
        {
          name: "Health & Wellness",
          duration: "6 weeks",
          students: "250+",
          rating: 4.4,
          level: "Beginner to Intermediate",
          description: "Maintain work-life balance and mental health",
          modules: [
            "Mental Health Awareness",
            "Yoga and Meditation Techniques",
            "Nutrition and Fitness Basics",
            "Work-Life Balance Strategies",
            "Managing Anxiety and Burnout"
          ],
          skills: ["Mental Health", "Meditation", "Work-Life Balance", "Stress Management"]
        }
      ]
    }
  }), []);

  const toggleSection = useCallback((section) => {
    setExpandedSection(prev => prev === section ? null : section);
    setAnimatedCards(new Set());
  }, []);

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

  useEffect(() => {
    if (expandedSection) {
      const timer = setTimeout(() => {
        const currentSection = coursesData[expandedSection];
        if (currentSection) {
          currentSection.courses.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedCards(prev => new Set([...prev, index]));
            }, index * 100);
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [expandedSection, coursesData]);

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-700",
        text: "text-blue-600 dark:text-blue-400",
        hover: "hover:bg-blue-100 dark:hover:bg-blue-800/30",
        gradient: "from-blue-500 to-blue-600",
        light: "bg-blue-100 dark:bg-blue-800/50"
      },
      indigo: {
        bg: "bg-indigo-50 dark:bg-indigo-900/20",
        border: "border-indigo-200 dark:border-indigo-700",
        text: "text-indigo-600 dark:text-indigo-400",
        hover: "hover:bg-indigo-100 dark:hover:bg-indigo-800/30",
        gradient: "from-indigo-500 to-indigo-600",
        light: "bg-indigo-100 dark:bg-indigo-800/50"
      },
      cyan: {
        bg: "bg-cyan-50 dark:bg-cyan-900/20",
        border: "border-cyan-200 dark:border-cyan-700",
        text: "text-cyan-600 dark:text-cyan-400",
        hover: "hover:bg-cyan-100 dark:hover:bg-cyan-800/30",
        gradient: "from-cyan-500 to-cyan-600",
        light: "bg-cyan-100 dark:bg-cyan-800/50"
      }
    };
    return colors[color];
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${darkMode ? 'dark' : ''}`}>
      {/* Navbar Component */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="animate-pulse mb-4">
              <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Our Courses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of courses designed to boost your career and unlock your potential
            </p>
            <div className="mt-8 flex justify-center space-x-8">
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-blue-600">
                  <CountingNumber target={50} duration={2000} />
                </div>
                <div className="text-sm text-gray-500">Courses</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-indigo-600">
                  <CountingNumber target={2000} duration={2500} />
                </div>
                <div className="text-sm text-gray-500">Students</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-cyan-600">
                  <CountingNumber target={4.8} duration={1500} />
                </div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(coursesData).map(([key, section]) => {
              const isExpanded = expandedSection === key;
              const colorClasses = getColorClasses(section.color);
              
              return (
                <div key={key} className="w-full">
                  {/* Main Section Card */}
                  <div 
                    className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-2 ${colorClasses.border} overflow-hidden transition-all duration-700 transform ${isExpanded ? 'shadow-2xl scale-105' : 'hover:shadow-xl hover:scale-102'}`}
                  >
                    <div 
                      className={`p-10 cursor-pointer transition-all duration-500 ${colorClasses.hover} relative overflow-hidden`}
                      onClick={() => toggleSection(key)}
                    >
                      {/* Background Animation */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses.gradient} opacity-0 transition-opacity duration-500 ${isExpanded ? 'opacity-10' : ''}`} />
                      
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center space-x-8">
                          <div className={`p-6 rounded-3xl bg-gradient-to-br ${colorClasses.gradient} text-white shadow-2xl transform transition-transform duration-300 ${isExpanded ? 'rotate-12 scale-110' : 'hover:rotate-6'}`}>
                            {section.icon}
                          </div>
                          <div>
                            <h2 className={`text-4xl font-bold ${colorClasses.text} mb-2`}>
                              {section.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                              {section.subtitle}
                            </p>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-500">
                                {section.courses.length} courses available
                              </span>
                              <div className="flex items-center space-x-1">
                                <Target className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">All levels</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`transition-all duration-500 ${isExpanded ? 'rotate-90 scale-125' : 'hover:scale-110'}`}>
                          <ChevronRight className={`w-10 h-10 ${colorClasses.text}`} />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Courses */}
                    <div className={`overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className={`${colorClasses.bg} p-10 border-t-2 ${colorClasses.border}`}>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                          {section.courses.map((course, index) => (
                            <div 
                              key={index}
                              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-700 transform ${
                                animatedCards.has(index) 
                                  ? 'translate-y-0 opacity-100 hover:scale-105 hover:shadow-2xl' 
                                  : 'translate-y-8 opacity-0'
                              }`}
                              style={{ transitionDelay: `${index * 100}ms` }}
                              onMouseEnter={() => setHoveredCard(`${key}-${index}`)}
                              onMouseLeave={() => setHoveredCard(null)}
                            >
                              {/* Course Header */}
                              <div className={`p-6 bg-gradient-to-r ${colorClasses.gradient} text-white relative overflow-hidden`}>
                                <div className={`absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ${hoveredCard === `${key}-${index}` ? 'opacity-10' : ''}`} />
                                <div className="relative z-10">
                                  <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold truncate">
                                      {course.name}
                                    </h3>
                                    <BookOpen className="w-6 h-6 opacity-80" />
                                  </div>
                                  <p className="text-sm opacity-90 mb-4">
                                    {course.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                      {renderStars(course.rating)}
                                      <span className="text-sm ml-2">{course.rating}</span>
                                    </div>
                                    <span className="text-sm font-semibold">{course.level}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Course Content */}
                              <div className="p-6">
                                <div className="flex items-center justify-between mb-4 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600 dark:text-gray-300">{course.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600 dark:text-gray-300">{course.students}</span>
                                  </div>
                                </div>

                                {/* Modules */}
                                <div className="mb-6">
                                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Course Modules:
                                  </h4>
                                  <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {course.modules.map((module, moduleIndex) => (
                                      <div key={moduleIndex} className="flex items-start space-x-2">
                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClasses.gradient} mt-2 flex-shrink-0`} />
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                          {module}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Skills */}
                                <div className="mb-6">
                                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Skills You'll Gain:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.skills.map((skill, skillIndex) => (
                                      <span 
                                        key={skillIndex}
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses.light} ${colorClasses.text} border ${colorClasses.border} transition-all duration-300 hover:scale-105`}
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Enroll Button */}
                                <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${colorClasses.gradient} text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}>
                                  Enroll Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 animate-pulse" />
            <div className="relative z-10">
              <Award className="w-16 h-16 mx-auto mb-6 animate-bounce" />
              <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers with our comprehensive courses
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105">
                  Get Started Today
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg transform hover:scale-105">
                  View All Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;