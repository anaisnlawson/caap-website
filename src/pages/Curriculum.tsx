import './Curriculum.css';

export default function Curriculum() {
  const weeks = [
    {
      week: 1,
      date: 'July 11',
      topics: [
        'Looking at different types of colleges',
        'Admissions criteria & what matters',
        'FAFSA & CSS Profile basics',
      ],
      color: '#3b82f6',
      emoji: '🏫',
    },
    {
      week: 2,
      date: 'July 18',
      topics: [
        'Essay brainstorming',
        'Common App essay prompts',
        'Supplemental essays',
        'Writing and editing strategies',
      ],
      color: '#8b5cf6',
      emoji: '✍️',
    },
    {
      week: 3,
      date: 'July 25',
      topics: ['Asking for recommendation letters'],
      color: '#f59e0b',
      emoji: '💌',
    },
    {
      week: 4,
      date: 'August 1',
      topics: [
        'Local vs national scholarships',
        'Merit vs need-based aid',
        'Financial aid letters',
        'Fly-in programs',
        'Career + Transition to college panel',
        'Additional topics',
      ],
      color: '#10b981',
      emoji: '🎓',
    },
  ];

  return (
    <div className="curriculum">
      <section className="curriculum-hero">
        <h1>Weekly Outline 📖</h1>
        <p className="curriculum-subtitle">
          Month of July — Saturdays, 10 AM – 1 PM
        </p>
        <p className="curriculum-note">
          <em>*Pushed one week because of 4th of July. Subject to change.</em>
        </p>
      </section>

      <div className="weeks-grid">
        {weeks.map((w) => (
          <div className="week-card" key={w.week}>
            <div
              className="week-header"
              style={{ background: `linear-gradient(135deg, ${w.color}, ${w.color}cc)` }}
            >
              <span className="week-emoji">{w.emoji}</span>
              <div>
                <h3>Week {w.week}</h3>
                <span className="week-date">{w.date}</span>
              </div>
            </div>
            <ul className="week-topics">
              {w.topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
