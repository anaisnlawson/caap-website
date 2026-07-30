import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import './Login.css';

/**
 * Post-sign-in router for staff. Waits briefly for the role to resolve, then
 * sends admins to /admin and mentors to /mentor. Anyone without a staff role
 * gets a clear "no access" message instead of being silently redirected.
 */
export default function StaffLanding() {
  const { user, loading, isAdmin, isMentor } = useAuth();
  const navigate = useNavigate();
  const [rolesTimedOut, setRolesTimedOut] = useState(false);

  // Give the async role lookup a moment before declaring "no access".
  useEffect(() => {
    const t = setTimeout(() => setRolesTimedOut(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isAdmin) navigate('/admin', { replace: true });
    else if (isMentor) navigate('/mentor', { replace: true });
  }, [isAdmin, isMentor, navigate]);

  if (!loading && !user) {
    return <Navigate to="/staff-login" replace />;
  }

  const stillResolving = loading || (!isAdmin && !isMentor && !rolesTimedOut);

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="brand-c">C</span>
          <span className="brand-a">A</span>
          <span className="brand-a2">A</span>
          <span className="brand-p">P</span>
        </div>
        {stillResolving ? (
          <>
            <h1>Checking access…</h1>
            <p className="login-sub">One moment while we load your view.</p>
          </>
        ) : (
          <>
            <h1>No staff access</h1>
            <p className="login-sub">
              The account <strong>{user?.email}</strong> isn't set up as a mentor
              or admin. A student needs to add you as a mentor from their Sharing
              tab, or an admin needs to grant you access.
            </p>
            <p className="login-switch">
              Looking for your own tracker?{' '}
              <a href="/dashboard">Go to your dashboard →</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
