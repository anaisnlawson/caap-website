import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🎓 Summer 2026</div>
          <h1>
            <span className="hero-c">C</span>ollege{' '}
            <span className="hero-a">A</span>pplication{' '}
            <span className="hero-a2">A</span>ssistance{' '}
            <span className="hero-p">P</span>rogram
          </h1>
          <p className="hero-tagline">
            A summer program to help rising seniors navigate the college
            application process — from essays to financial aid, we've got you
            covered! ✨
          </p>
          <div className="hero-actions">
            <Link to="/curriculum" className="btn-primary">
              Explore the Program →
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">📝 Essay Help</div>
          <div className="floating-card card-2">💰 Scholarships</div>
          <div className="floating-card card-3">🏫 Campus Visits</div>
          <div className="floating-card card-4">🤝 Mentorship</div>
        </div>
      </section>

      <section className="highlights">
        <div className="highlight-card">
          <div className="highlight-icon">📅</div>
          <h3>4 Weeks</h3>
          <p>In-person Saturday sessions throughout July</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">🎯</div>
          <h3>Personalized</h3>
          <p>1:1 mentorship matched to your needs</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">✈️</div>
          <h3>Fly-In Programs</h3>
          <p>Learn about free campus visit opportunities</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">🌟</div>
          <h3>Expert Mentors</h3>
          <p>Volunteers from Columbia, Syracuse & more</p>
        </div>
      </section>
    </div>
  );
}
