import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import './Login.css';

/**
 * Single post-sign-in router. Everyone signs in through the same /login page;
 * once their role resolves we send them to the right place:
 *   - admin  -> /admin  (all students)
 *   - mentor -> /mentor (students who shared with them)
 *   - student -> /dashboard (their own tracker)
 * The role is decided server-side (admins table / mentor_access), so choosing a
 * view isn't something a user can do themselves — we just honor what they are.
 */
export default function RoleLanding() {
  const { user, loading, isAdmin, isMentor } = useAuth();
  const navigate = useNavigate();
  const [graceElapsed, setGraceElapsed] = useState(false);

  // Give the async role lookup a brief moment before defaulting to "student".
  useEffect(() => {
    const t = setTimeout(() => setGraceElapsed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin', { replace: true });
    } else if (isMentor) {
      navigate('/mentor', { replace: true });
    } else if (!loading && user && graceElapsed) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAdmin, isMentor, loading, user, graceElapsed, navigate]);

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="brand-c">C</span>
          <span className="brand-a">A</span>
          <span className="brand-a2">A</span>
          <span className="brand-p">P</span>
        </div>
        <h1>Signing you in…</h1>
        <p className="login-sub">One moment while we load your view.</p>
      </div>
    </div>
  );
}
