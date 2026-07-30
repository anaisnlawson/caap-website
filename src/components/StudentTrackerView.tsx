import { useEffect, useState } from 'react';
import SpreadsheetGrid, {
  type GridRow,
} from '../components/SpreadsheetGrid';
import AcademicsPanel from '../components/AcademicsPanel';
import { loadDoc, type StudentProfile } from '../lib/db';
import {
  CHECKLIST,
  COLLEGE_COLUMNS,
  ESSAY_COLUMNS,
  DEADLINE_COLUMNS,
  TOTAL_CHECKLIST_ITEMS,
  EMPTY_ACADEMICS,
  type AcademicProfile,
  type TabKey,
} from '../lib/trackerConfig';
import '../pages/Dashboard.css';

const ALL_VIEWER_TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'progress', label: 'Progress', icon: '📋' },
  { key: 'academics', label: 'Academics', icon: '🎓' },
  { key: 'colleges', label: 'College List', icon: '🏫' },
  { key: 'essays', label: 'Essays', icon: '✍️' },
  { key: 'deadlines', label: 'Deadlines', icon: '🗓️' },
];

interface StudentTrackerViewProps {
  student: StudentProfile;
  /** Which tabs this viewer is allowed to see. */
  allowedTabs: TabKey[];
}

/**
 * Read-only view of a single student's tracker. Used by both the Admin view
 * (all tabs) and the Mentor view (shared tabs only). Data is fetched with the
 * caller's own session, so Row Level Security decides what actually comes back.
 */
export default function StudentTrackerView({
  student,
  allowedTabs,
}: StudentTrackerViewProps) {
  const tabs = ALL_VIEWER_TABS.filter((t) => allowedTabs.includes(t.key));
  const [tab, setTab] = useState<TabKey>(tabs[0]?.key ?? 'colleges');

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [academics, setAcademics] = useState<AcademicProfile>(EMPTY_ACADEMICS);
  const [colleges, setColleges] = useState<GridRow[]>([]);
  const [essays, setEssays] = useState<GridRow[]>([]);
  const [deadlines, setDeadlines] = useState<GridRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const id = student.user_id;
    Promise.all([
      allowedTabs.includes('progress')
        ? loadDoc<Record<string, boolean>>(id, 'progress', {})
        : Promise.resolve({}),
      allowedTabs.includes('academics')
        ? loadDoc<AcademicProfile>(id, 'academics', EMPTY_ACADEMICS)
        : Promise.resolve(EMPTY_ACADEMICS),
      allowedTabs.includes('colleges')
        ? loadDoc<GridRow[]>(id, 'colleges', [])
        : Promise.resolve([]),
      allowedTabs.includes('essays')
        ? loadDoc<GridRow[]>(id, 'essays', [])
        : Promise.resolve([]),
      allowedTabs.includes('deadlines')
        ? loadDoc<GridRow[]>(id, 'deadlines', [])
        : Promise.resolve([]),
    ]).then(([p, a, c, e, d]) => {
      if (!active) return;
      setChecked(p as Record<string, boolean>);
      setAcademics(a as AcademicProfile);
      setColleges(c as GridRow[]);
      setEssays(e as GridRow[]);
      setDeadlines(d as GridRow[]);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [student.user_id, allowedTabs]);

  const doneItems = Object.values(checked).filter(Boolean).length;
  const pct = TOTAL_CHECKLIST_ITEMS
    ? Math.round((doneItems / TOTAL_CHECKLIST_ITEMS) * 100)
    : 0;

  return (
    <div className="viewer">
      <nav className="dash-tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`dash-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <span aria-hidden="true">{t.icon}</span> {t.label}
          </button>
        ))}
      </nav>

      {loading ? (
        <p className="viewer-loading">Loading…</p>
      ) : (
        <section className="dash-panel">
          {tab === 'progress' && (
            <div>
              <div className="panel-head">
                <h2>Progress</h2>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <p className="progress-label">
                {doneItems} of {TOTAL_CHECKLIST_ITEMS} steps complete ({pct}%)
              </p>
              {CHECKLIST.map((group) => (
                <div className="check-group" key={group.week}>
                  <h3>{group.week}</h3>
                  {group.items.map((item) => (
                    <label className="check-item" key={item.id}>
                      <input
                        type="checkbox"
                        checked={!!checked[item.id]}
                        readOnly
                        disabled
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}

          {tab === 'academics' && (
            <div>
              <div className="panel-head">
                <h2>Academics</h2>
              </div>
              <AcademicsPanel value={academics} readOnly />
            </div>
          )}

          {tab === 'colleges' && (
            <div>
              <div className="panel-head">
                <h2>College List</h2>
              </div>
              <SpreadsheetGrid
                columns={COLLEGE_COLUMNS}
                rows={colleges}
                onChange={() => {}}
                readOnly
              />
            </div>
          )}

          {tab === 'essays' && (
            <div>
              <div className="panel-head">
                <h2>Essays</h2>
              </div>
              <p className="panel-sub">
                Open each student's Google Doc via the “Open link” in the Google
                Doc column.
              </p>
              <SpreadsheetGrid
                columns={ESSAY_COLUMNS}
                rows={essays}
                onChange={() => {}}
                readOnly
              />
            </div>
          )}

          {tab === 'deadlines' && (
            <div>
              <div className="panel-head">
                <h2>Deadlines</h2>
              </div>
              <SpreadsheetGrid
                columns={DEADLINE_COLUMNS}
                rows={deadlines}
                onChange={() => {}}
                readOnly
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
