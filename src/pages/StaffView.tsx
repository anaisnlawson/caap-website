import { useEffect, useState } from 'react';
import { listStudents, type StudentProfile } from '../lib/db';
import StudentTrackerView from '../components/StudentTrackerView';
import type { TabKey } from '../lib/trackerConfig';
import './StaffView.css';

interface StaffViewProps {
  title: string;
  subtitle: string;
  allowedTabs: TabKey[];
  emptyHint: string;
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
}: StaffViewProps) {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [selected, setSelected] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
                  <h2>{selected.name || selected.email}</h2>
                  <span className="detail-email">{selected.email}</span>
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
    </div>
  );
}
