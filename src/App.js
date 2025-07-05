import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CoursesPage from './components/CoursesPage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </Router>
  );
};

export default App;