import React from "react";
import { Link } from 'react-router-dom';
import { FaPlay, FaSignInAlt } from 'react-icons/fa';


import "./CSS/Home.css";
export default function Home2() {

  return (
    <div className="container-fluid hero-section d-flex align-items-center justify-content-center vh-100">
      <div className="text-center text-white">
        {/* Heading */}
        <h1 className="display-4 fw-bold mb-3">
          Track Your Skills, Improve Every Day 🚀
        </h1>

        {/* Subheading */}
        <p className="lead mb-4">
          A simple tool to add your skills, monitor progress, and stay motivated
          on your learning journey.
        </p>          
        
      </div>
    </div>
  );
}
