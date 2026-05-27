import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
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
          <li><NavLink to="/faq">FAQ</NavLink></li>
          <li><NavLink to="/signup" className="nav-signup">Sign Up</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
