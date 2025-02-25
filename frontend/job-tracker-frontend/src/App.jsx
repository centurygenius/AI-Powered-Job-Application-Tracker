import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobTrackingPage from './pages/JobTrackingPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import LogOut from './components/LogOut';
import "./index.css";
import JobDetailPage from './pages/JobDetailPage';



function App() {
  

  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/job-tracking" element={
          <ProtectedRoute>
            <JobTrackingPage /> 
          </ProtectedRoute>
          } />
        <Route path="/edit-job/:jobId" element={
          <ProtectedRoute>
            <JobDetailPage />
          </ProtectedRoute>
          } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
