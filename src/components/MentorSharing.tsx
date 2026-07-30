import { useEffect, useState } from 'react';
import { listMyMentors, addMentor, removeMentor } from '../lib/db';
import './MentorSharing.css';

/**
 * Lets a student grant/revoke mentor access to their tracker. Mentors get
 * read-only access to the student's College List, Essays, and Deadlines (and
 * the Google Doc links inside Essays) — never the personal Progress checklist.
 */
export default function MentorSharing({ userId }: { userId: string }) {
  const [mentors, setMentors] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listMyMentors(userId).then((list) => {
      if (!active) return;
      setMentors(list);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [userId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: addError } = await addMentor(userId, email);
    if (addError) {
      setError(addError);
      setBusy(false);
      return;
    }
    setMentors(await listMyMentors(userId));
    setEmail('');
    setBusy(false);
  };

  const handleRemove = async (m: string) => {
    await removeMentor(userId, m);
    setMentors((cur) => cur.filter((x) => x !== m));
  };

  return (
    <div className="sharing">
      <div className="panel-head">
        <h2>Share with a mentor</h2>
      </div>
      <p className="panel-sub">
        Add a mentor by their sign-in email. They'll get <strong>read-only</strong>{' '}
        access to your College List, Essays (including your Google Doc links), and
        Deadlines. They <strong>cannot</strong> see your personal Progress
        checklist or edit anything. Remove them any time.
      </p>

      <form className="sharing-form" onSubmit={handleAdd}>
        <input
          type="email"
          className="sharing-input"
          placeholder="mentor@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="sharing-add" type="submit" disabled={busy}>
          {busy ? 'Adding…' : 'Add mentor'}
        </button>
      </form>
      {error && <p className="sharing-error">{error}</p>}

      <div className="sharing-list">
        <h3>Mentors with access</h3>
        {loading ? (
          <p className="sharing-muted">Loading…</p>
        ) : mentors.length === 0 ? (
          <p className="sharing-muted">
            No mentors yet. Add one above to share your tracker.
          </p>
        ) : (
          <ul>
            {mentors.map((m) => (
              <li key={m}>
                <span>{m}</span>
                <button
                  className="sharing-remove"
                  onClick={() => void handleRemove(m)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="sharing-tip">
        💡 Also make sure each essay's Google Doc is shared (in Google Docs, set
        the link to “Anyone with the link” or share it directly with your
        mentor's email) so they can open it.
      </p>
    </div>
  );
}
