import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import SpreadsheetGrid, { type GridRow } from '../components/SpreadsheetGrid';
import MentorSharing from '../components/MentorSharing';
import { useTrackerDoc, type SaveStatus } from '../lib/useTrackerDoc';
import {
  TABS,
  CHECKLIST,
  COLLEGE_COLUMNS,
  ESSAY_COLUMNS,
  DEADLINE_COLUMNS,
  type TabKey,
} from '../lib/trackerConfig';
import './Dashboard.css';

type DashTab = TabKey | 'sharing';

function SaveBadge({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null;
  return (
    <span className={`save-badge ${status}`}>
      {status === 'saving' ? 'Saving…' : 'Saved ✓'}
    </span>
  );
}

export default function Dashboard() {
  const { user, signOut, demoMode } = useAuth();
  const [tab, setTab] = useState<DashTab>('progress');

  const uid = user?.id ?? 'anon';

  const [checked, setChecked, checkStatus] = useTrackerDoc<
    Record<string, boolean>
  >(uid, 'progress', {});
  const [colleges, setColleges, collegeStatus] = useTrackerDoc<GridRow[]>(
    uid,
    'colleges',
    [],
  );
  const [essays, setEssays, essayStatus] = useTrackerDoc<GridRow[]>(
    uid,
    'essays',
    [],
  );
  const [deadlines, setDeadlines, deadlineStatus] = useTrackerDoc<GridRow[]>(
    uid,
    'deadlines',
    [],
  );

  const totalItems = CHECKLIST.reduce((n, g) => n + g.items.length, 0);
  const doneItems = Object.values(checked).filter(Boolean).length;
  const pct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1>Welcome, {user?.name?.split(' ')[0] ?? 'Student'} 👋</h1>
          <p className="dash-email">{user?.email}</p>
        </div>
        <button className="signout-btn" onClick={() => void signOut()}>
          Sign out
        </button>
      </header>

      {demoMode && (
        <div className="demo-banner">
          Demo mode — your data is saved in this browser only. Add Supabase keys
          to sync across devices with your school account.
        </div>
      )}

      <nav className="dash-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`dash-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <span aria-hidden="true">{t.icon}</span> {t.label}
          </button>
        ))}
        <button
          className={`dash-tab ${tab === 'sharing' ? 'active' : ''}`}
          onClick={() => setTab('sharing')}
        >
          <span aria-hidden="true">🤝</span> Sharing
        </button>
      </nav>

      <section className="dash-panel">
        {tab === 'progress' && (
          <div>
            <div className="panel-head">
              <h2>My Progress</h2>
              <SaveBadge status={checkStatus} />
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <p className="progress-label">
              {doneItems} of {totalItems} steps complete ({pct}%)
            </p>
            {CHECKLIST.map((group) => (
              <div className="check-group" key={group.week}>
                <h3>{group.week}</h3>
                {group.items.map((item) => (
                  <label className="check-item" key={item.id}>
                    <input
                      type="checkbox"
                      checked={!!checked[item.id]}
                      onChange={(e) =>
                        setChecked({ ...checked, [item.id]: e.target.checked })
                      }
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === 'colleges' && (
          <div>
            <div className="panel-head">
              <h2>College List</h2>
              <SaveBadge status={collegeStatus} />
            </div>
            <p className="panel-sub">
              Track every school you're applying to, deadlines, and status.
            </p>
            <SpreadsheetGrid
              columns={COLLEGE_COLUMNS}
              rows={colleges}
              onChange={setColleges}
              addLabel="Add school"
            />
          </div>
        )}

        {tab === 'essays' && (
          <div>
            <div className="panel-head">
              <h2>Essays</h2>
              <SaveBadge status={essayStatus} />
            </div>
            <p className="panel-sub">
              Keep tabs on each essay's status and link out to your Google Doc.
            </p>
            <SpreadsheetGrid
              columns={ESSAY_COLUMNS}
              rows={essays}
              onChange={setEssays}
              addLabel="Add essay"
            />
          </div>
        )}

        {tab === 'deadlines' && (
          <div>
            <div className="panel-head">
              <h2>Deadlines</h2>
              <SaveBadge status={deadlineStatus} />
            </div>
            <p className="panel-sub">
              Every important date in one place so nothing slips.
            </p>
            <SpreadsheetGrid
              columns={DEADLINE_COLUMNS}
              rows={deadlines}
              onChange={setDeadlines}
              addLabel="Add deadline"
            />
          </div>
        )}

        {tab === 'sharing' && <MentorSharing userId={uid} />}
      </section>
    </div>
  );
}
