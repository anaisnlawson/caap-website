import type { GridColumn } from '../components/SpreadsheetGrid';

/**
 * Shared definitions for the student tracker. Used by both the student
 * Dashboard (editable) and the Admin view (read-only) so the two stay in sync.
 */

export type TabKey = 'progress' | 'colleges' | 'essays' | 'deadlines' | 'academics';

export const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'progress', label: 'My Progress', icon: '📋' },
  { key: 'academics', label: 'Academics', icon: '🎓' },
  { key: 'colleges', label: 'College List', icon: '🏫' },
  { key: 'essays', label: 'Essays', icon: '✍️' },
  { key: 'deadlines', label: 'Deadlines', icon: '🗓️' },
];

/**
 * A student's academic snapshot: SAT section scores (Evidence-Based Reading &
 * Writing + Math), weighted/unweighted GPA, and intended majors. Stored as its
 * own `academics` tracker doc so admins can see it and mentors cannot.
 */
export interface AcademicProfile {
  satEBRW: string;
  satMath: string;
  gpaUnweighted: string;
  gpaWeighted: string;
  majors: string;
}

export const EMPTY_ACADEMICS: AcademicProfile = {
  satEBRW: '',
  satMath: '',
  gpaUnweighted: '',
  gpaWeighted: '',
  majors: '',
};

/** SAT total = EBRW + Math. Returns null when neither section is filled in. */
export function satTotal(a: AcademicProfile): number | null {
  const ebrw = parseInt(a.satEBRW, 10);
  const math = parseInt(a.satMath, 10);
  const hasEbrw = !Number.isNaN(ebrw);
  const hasMath = !Number.isNaN(math);
  if (!hasEbrw && !hasMath) return null;
  return (hasEbrw ? ebrw : 0) + (hasMath ? math : 0);
}

// Checklist derived from the 4-week CAAP curriculum.
export const CHECKLIST: {
  week: string;
  items: { id: string; label: string }[];
}[] = [
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

export const COLLEGE_COLUMNS: GridColumn[] = [
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

export const ESSAY_COLUMNS: GridColumn[] = [
  { key: 'prompt', label: 'Essay / Prompt', width: '28%' },
  { key: 'school', label: 'For School', width: '20%' },
  {
    key: 'status',
    label: 'Status',
    width: '16%',
    options: ['Not started', 'Drafting', 'Revising', 'Reviewed', 'Final'],
  },
  {
    key: 'link',
    label: 'Google Doc link',
    isLink: true,
    placeholder: 'Paste a Google Doc share link',
  },
];

export const DEADLINE_COLUMNS: GridColumn[] = [
  { key: 'item', label: 'Item', width: '45%' },
  { key: 'date', label: 'Date', width: '25%' },
  { key: 'done', label: 'Done?', width: '20%', options: ['No', 'Yes'] },
];

export const TOTAL_CHECKLIST_ITEMS = CHECKLIST.reduce(
  (n, g) => n + g.items.length,
  0,
);
