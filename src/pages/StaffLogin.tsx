import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import './Login.css';

/**
 * Separate sign-in entry point for mentors and admins. Uses the same Google
 * sign-in, but sends them to /staff afterwards, which routes each person to the
 * right view based on their role (admin vs mentor).
 */
export default function StaffLogin() {
  const { user, signInWithGoogle, demoMode, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/staff', { replace: true });
  }, [user, navigate]);

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="brand-c">C</span>
          <span className="brand-a">A</span>
          <span className="brand-a2">A</span>
          <span className="brand-p">P</span>
        </div>
        <h1>Mentor &amp; Admin Sign In</h1>
        <p className="login-sub">
          For CAAP staff and mentors. Sign in with the Google account you were
          added with to review your students' trackers.
        </p>

        {error && <div className="login-error">{error}</div>}

        <button
          className="google-btn"
          onClick={() => void signInWithGoogle('/staff')}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.6l6.3 5.2C41.9 35.6 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="login-switch">
          Are you a student? <a href="/login">Go to student login →</a>
        </p>

        {demoMode && (
          <p className="login-demo-note">
            ⚙️ <strong>Demo mode.</strong> No Supabase backend is configured yet,
            so this signs you in locally. See <code>SETUP_STUDENT_LOGIN.md</code>.
          </p>
        )}
      </div>
    </div>
  );
}
