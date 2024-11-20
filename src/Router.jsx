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
import Users from "./scenes/auth/users";
import Payments from "./scenes/auth/users/payments/payments";
import NotFound from "./scenes/NotFound";
import UnauthorizedPage from "./scenes/Unauthorized";
import LogoutPage from "./scenes/Logout";
import LoginPage from "./scenes/login";
import LandingPage from "./scenes/auth/users/landing/Landing";
import PrivacyPolicy from "./scenes/auth/users/privacy/Privacy";
import TermsAndConditions from "./scenes/auth/users/terms/Terms";
import Profile from "./scenes/auth/users/profile/Profile";
import PaymentSuccessPage from "./scenes/auth/users/payments/PaymentSuccess";
import PaymentCancel from "./scenes/auth/users/payments/PaymentCancel";
import AddPoint from "./scenes/auth/users/AddPoint/AddPoint";
import SignUp from "./scenes/signup";
import SendOTP from "./scenes/signup/components/SendOTP";
import VerifyOTP from "./scenes/signup/components/VerifyOTP";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         
          <Route path="/" element={<Users />}>
            <Route path="" element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SendOTP />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="verify-otp" element={<VerifyOTP />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsAndConditions />} />
            <Route path="add-point" element={<AddPoint />} />
          </Route>
          <Route path="/user" element={<ProtectedRoute allowedRoles={["user"]}><Users /></ProtectedRoute>} >
            <Route path="payments" element={<Payments />} />
            <Route path="payment-success/:userId" element={<PaymentSuccessPage />} />
            <Route path="payment-cancel/:orderCode" element={<PaymentCancel />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="admin" element={<ProtectedRoute allowedRoles={["admin"]}><App /></ProtectedRoute>}>
            <Route path="" element={<Dashboard />} />
            <Route path="team" element={<Team />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="payment" element={<Payment />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="form" element={<Form />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="bar" element={<Bar />} />
            <Route path="pie" element={<Pie />} />
            <Route path="stream" element={<Stream />} />
            <Route path="line" element={<Line />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="geography" element={<Geography />} />
          </Route>
          <Route path="unauthorized" element={<UnauthorizedPage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
