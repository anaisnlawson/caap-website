import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import SpreadsheetGrid, {
  type GridColumn,
  type GridRow,
} from '../components/SpreadsheetGrid';
import { useTrackerDoc, type SaveStatus } from '../lib/useTrackerDoc';
import './Dashboard.css';

type TabKey = 'progress' | 'colleges' | 'essays' | 'deadlines';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'progress', label: 'My Progress', icon: '📋' },
  { key: 'colleges', label: 'College List', icon: '🏫' },
  { key: 'essays', label: 'Essays', icon: '✍️' },
  { key: 'deadlines', label: 'Deadlines', icon: '🗓️' },
];

// Checklist derived from the 4-week CAAP curriculum.
const CHECKLIST: { week: string; items: { id: string; label: string }[] }[] = [
  {
    week: 'Week 1 · College Strategy + Personal Narrative',
    items: [
      { id: 'w1-list', label: 'Build a college interest list' },
      { id: 'w1-attrs', label: 'Identify attributes I want in a college' },
      { id: 'w1-essay', label: 'Start personal statement draft' },
    ],
  },
  {
    week: 'Week 2 · Applications + Essays',
    items: [
      { id: 'w2-commonapp', label: 'Create Common App account' },
      { id: 'w2-supp', label: 'List supplemental essays needed' },
    ],
  },
  {
    week: 'Week 3 · Financial Aid',
    items: [
      { id: 'w3-fafsa', label: 'Gather documents for FAFSA' },
      { id: 'w3-scholar', label: 'Research 3 scholarships' },
    ],
  },
  {
    week: 'Week 4 · Finalizing + Mentorship',
    items: [
      { id: 'w4-review', label: 'Get essay reviewed by mentor' },
      { id: 'w4-submit', label: 'Finalize application checklist' },
    ],
  },
];

const COLLEGE_COLUMNS: GridColumn[] = [
  { key: 'school', label: 'School', width: '24%' },
  {
    key: 'type',
    label: 'Type',
    width: '14%',
    options: ['Reach', 'Target', 'Safety'],
  },
  { key: 'deadline', label: 'Deadline', width: '16%' },
  {
    key: 'status',
    label: 'Status',
    width: '18%',
    options: ['Researching', 'In progress', 'Submitted', 'Accepted', 'Waitlisted'],
  },
  { key: 'notes', label: 'Notes' },
];

const ESSAY_COLUMNS: GridColumn[] = [
  { key: 'prompt', label: 'Essay / Prompt', width: '30%' },
  { key: 'school', label: 'For School', width: '22%' },
  {
    key: 'status',
    label: 'Status',
    width: '18%',
    options: ['Not started', 'Drafting', 'Revising', 'Reviewed', 'Final'],
  },
  { key: 'link', label: 'Doc link' },
];

const DEADLINE_COLUMNS: GridColumn[] = [
  { key: 'item', label: 'Item', width: '45%' },
  { key: 'date', label: 'Date', width: '25%' },
  { key: 'done', label: 'Done?', width: '20%', options: ['No', 'Yes'] },
];

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
  const [tab, setTab] = useState<TabKey>('progress');

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
      </section>
    </div>
  );
}
