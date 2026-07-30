import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  requireStaff = false,
}: {
  children: ReactNode;
  requireAdmin?: boolean;
  /** Allow admins OR mentors (staff read-only views). */
  requireStaff?: boolean;
}) {
  const { user, loading, isAdmin, isMentor } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireStaff && !isAdmin && !isMentor) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
