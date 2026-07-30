import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import './Navbar.css';

export default function Navbar() {
  const { user, isAdmin, isMentor } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-c">C</span>
          <span className="brand-a">A</span>
          <span className="brand-a2">A</span>
          <span className="brand-p">P</span>
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/timeline">Timeline</NavLink></li>
          <li><NavLink to="/curriculum">Curriculum</NavLink></li>
          <li><NavLink to="/mentorship">Mentorship</NavLink></li>
          <li><NavLink to="/scholarships">Scholarships</NavLink></li>
          <li><NavLink to="/faq">FAQ</NavLink></li>
          {isAdmin && (
            <li><NavLink to="/admin">Admin</NavLink></li>
          )}
          {isMentor && !isAdmin && (
            <li><NavLink to="/mentor">Mentor View</NavLink></li>
          )}
          {!user && (
            <li><NavLink to="/staff-login">Mentor / Admin</NavLink></li>
          )}
          <li>
            <NavLink
              to={user ? '/dashboard' : '/login'}
              className="nav-cta"
            >
              {user ? 'My Tracker' : 'Student Login'}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
