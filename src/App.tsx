import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProtectedRoute } from '@/components/ProtectedRoute'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Research from '@/pages/Research'
import ThinkNeuroProject from '@/pages/ThinkNeuroProject'
import WomensBrainHealth from '@/pages/WomensBrainHealth'
import BrainHealth from '@/pages/BrainHealth'
import Learn from '@/pages/Learn'
import Innovation from '@/pages/Innovation'
import Insights from '@/pages/Insights'
import Opportunities from '@/pages/Opportunities'
import Impact from '@/pages/Impact'
import Community from '@/pages/Community'
import Collaborate from '@/pages/Collaborate'
import Contact from '@/pages/Contact'
import Privacy from '@/pages/Privacy'
import Guidelines from '@/pages/Guidelines'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import AdminDashboard from '@/pages/AdminDashboard'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/research" element={<Research />} />
              <Route path="/research/thinkneuro" element={<ThinkNeuroProject />} />
              <Route path="/womens-brain-health" element={<WomensBrainHealth />} />
              <Route path="/brain-health" element={<BrainHealth />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/innovation" element={<Innovation />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/community" element={<Community />} />
              <Route path="/collaborate" element={<Collaborate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/guidelines" element={<Guidelines />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
