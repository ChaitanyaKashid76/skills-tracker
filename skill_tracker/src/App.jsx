import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddSkillForm from './components/AddSkillForm';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        {/* Default route → Home Page */}
        <Route path="/" element={<Home />} />

        <Route path="/Home" element={<Home />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Home2" element={<Home2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/add-skill" element={<AddSkillForm />} />
        </Routes>
    </Router>
  );
}

export default App;
