// src/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Bookings,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
  Payment,
} from "./scenes";
import ProtectedRoute from './config/ProtectedRoute'; // Ensure the path is correct
import { AuthProvider } from './utils/hooks/AuthContext'; // Ensure the path is correct
import Login from "./scenes/login";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
            <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
            <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
            <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
            <Route path="/bar" element={<ProtectedRoute><Bar /></ProtectedRoute>} />
            <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
            <Route path="/stream" element={<ProtectedRoute><Stream /></ProtectedRoute>} />
            <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
            <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
            <Route path="/geography" element={<ProtectedRoute><Geography /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
