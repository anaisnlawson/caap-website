import { useEffect, useState } from 'react';
import { listStudents, deleteStudent, type StudentProfile } from '../lib/db';
import StudentTrackerView from '../components/StudentTrackerView';
import type { TabKey } from '../lib/trackerConfig';
import './StaffView.css';

interface StaffViewProps {
  title: string;
  subtitle: string;
  allowedTabs: TabKey[];
  emptyHint: string;
  /** Admins only: show the "remove student" action + confirmation. */
  canDelete?: boolean;
}

/**
 * Staff-facing roster + read-only tracker viewer. Powers both:
 *  - Admin  (all students, all tabs)
 *  - Mentor (only students who shared with them, shared tabs only)
 * The student list is fetched with the caller's session, so Row Level Security
 * returns exactly the students each role is allowed to see.
 */
export default function StaffView({
  title,
  subtitle,
  allowedTabs,
  emptyHint,
  canDelete,
}: StaffViewProps) {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [selected, setSelected] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<StudentProfile | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    listStudents().then((list) => {
      if (!active) return;
      setStudents(list);
      setSelected((cur) => cur ?? list[0] ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    const { error } = await deleteStudent(pendingDelete.user_id);
    setDeleting(false);
    if (error) {
      setDeleteError(error);
      return;
    }
    const removedId = pendingDelete.user_id;
    setStudents((list) => {
      const next = list.filter((s) => s.user_id !== removedId);
      setSelected((cur) =>
        cur && cur.user_id === removedId ? next[0] ?? null : cur,
      );
      return next;
    });
    setPendingDelete(null);
  }

  return (
    <div className="staff">
      <header className="staff-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>

      {loading ? (
        <p className="staff-loading">Loading students…</p>
      ) : students.length === 0 ? (
        <div className="staff-empty">{emptyHint}</div>
      ) : (
        <div className="staff-body">
          <aside className="staff-roster">
            <h2 className="roster-title">Students ({students.length})</h2>
            <ul>
              {students.map((s) => (
                <li key={s.user_id}>
                  <button
                    className={`roster-item ${
                      selected?.user_id === s.user_id ? 'active' : ''
                    }`}
                    onClick={() => setSelected(s)}
                  >
                    <span className="roster-name">{s.name || s.email}</span>
                    <span className="roster-email">{s.email}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="staff-detail">
            {selected ? (
              <>
                <div className="detail-head">
                  <div>
                    <h2>{selected.name || selected.email}</h2>
                    <span className="detail-email">{selected.email}</span>
                  </div>
                  {canDelete && (
                    <button
                      className="delete-student-btn"
                      onClick={() => {
                        setDeleteError(null);
                        setPendingDelete(selected);
                      }}
                    >
                      Delete student
                    </button>
                  )}
                </div>
                <StudentTrackerView
                  key={selected.user_id}
                  student={selected}
                  allowedTabs={allowedTabs}
                />
              </>
            ) : (
              <p className="staff-loading">Select a student to view.</p>
            )}
          </main>
        </div>
      )}

      {pendingDelete && (
        <div
          className="modal-overlay"
          onClick={() => !deleting && setPendingDelete(null)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Delete this student?</h3>
            <p>
              You're about to permanently delete{' '}
              <strong>{pendingDelete.name || pendingDelete.email}</strong> (
              {pendingDelete.email}). This removes their entire tracker —
              progress, academics, college list, essays, deadlines, and mentor
              sharing. <strong>This can't be undone.</strong>
            </p>
            {deleteError && <div className="modal-error">{deleteError}</div>}
            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="modal-delete"
                onClick={() => void confirmDelete()}
                disabled={deleting}
              >
                {deleting ? 'Deleting…' : 'Delete student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
