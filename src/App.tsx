import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Timeline from './pages/Timeline';
import Curriculum from './pages/Curriculum';
import Mentorship from './pages/Mentorship';
import Scholarships from './pages/Scholarships';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import StaffLogin from './pages/StaffLogin';
import StaffLanding from './pages/StaffLanding';
import Dashboard from './pages/Dashboard';
import StaffView from './pages/StaffView';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route
            path="/staff"
            element={
              <ProtectedRoute>
                <StaffLanding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <StaffView
                  title="Admin — All Students"
                  subtitle="Full read-only access to every student's tracker."
                  allowedTabs={['progress', 'colleges', 'essays', 'deadlines']}
                  emptyHint="No students have signed in yet. Once a student logs in and starts their tracker, they'll appear here."
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor"
            element={
              <ProtectedRoute requireStaff>
                <StaffView
                  title="Mentor View"
                  subtitle="Read-only access to the students who shared their tracker with you."
                  allowedTabs={['colleges', 'essays', 'deadlines']}
                  emptyHint="No students have shared with you yet. A student can add you as a mentor from the Sharing tab of their tracker, using your sign-in email."
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
