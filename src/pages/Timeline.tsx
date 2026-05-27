import './Timeline.css';

export default function Timeline() {
  const phases = [
    {
      month: 'June',
      emoji: '📋',
      title: 'Sign Up!',
      description:
        'Register for the program. Once you join, the full program outline will be shared with you!',
      color: '#10b981',
      status: 'Right Now',
    },
    {
      month: 'July',
      emoji: '📚',
      title: '4 Weekends of In-Person Learning',
      description:
        'Saturday sessions from 10 AM – 1 PM covering everything from essay writing to financial aid. Location: TBA. Attendance is mandatory.',
      color: '#3b82f6',
      status: 'In Person',
    },
    {
      month: 'August',
      emoji: '🤝',
      title: 'Mentor Matching',
      description:
        'Get matched with a mentor based on their experience to assist you throughout the college application cycle. Contingent on attendance of July sessions.',
      color: '#8b5cf6',
      status: 'Mentorship',
    },
  ];

  return (
    <div className="timeline-page">
      <section className="timeline-hero">
        <h1>Here's Where You Come In! 🗓️</h1>
        <p className="timeline-subtitle">
          Three phases to get you college-ready
        </p>
      </section>

      <div className="timeline-container">
        {phases.map((phase, i) => (
          <div className="timeline-card" key={i}>
            <div
              className="timeline-marker"
              style={{ background: phase.color }}
            >
              <span className="timeline-emoji">{phase.emoji}</span>
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span
                  className="timeline-month"
                  style={{ color: phase.color }}
                >
                  {phase.month}
                </span>
                <span
                  className="timeline-status"
                  style={{
                    background: `${phase.color}20`,
                    color: phase.color,
                  }}
                >
                  {phase.status}
                </span>
              </div>
              <h3>{phase.title}</h3>
              <p>{phase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
