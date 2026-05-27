import './About.css';

export default function About() {
  const benefits = [
    {
      emoji: '💰',
      title: 'Scholarship Resources',
      description:
        'Learn about resources for applying to scholarships — some of which can offer stipends and full rides!',
    },
    {
      emoji: '🤝',
      title: 'Personalized Assistance',
      description:
        'Receive personalized assistance from volunteers who have attended universities like Columbia and Syracuse.',
    },
    {
      emoji: '✈️',
      title: 'Fly-In Programs',
      description:
        'Learn about school fly-in programs — opportunities to visit college campuses for free!!',
    },
    {
      emoji: '📝',
      title: 'Essay Feedback',
      description:
        'Receive personalized feedback on your essays to make your application stand out.',
    },
    {
      emoji: '🌐',
      title: 'Build Your Network',
      description:
        'Connect with mentors, peers, and professionals who can support your journey to college and beyond.',
    },
  ];

  return (
    <div className="about">
      <section className="about-hero">
        <h1>How Will This Help Me? 🤔</h1>
        <p className="about-subtitle">
          With this program, you will get the tools, knowledge, and support you
          need to tackle the college application process with confidence!
        </p>
      </section>

      <section className="benefits-grid">
        {benefits.map((b, i) => (
          <div className="benefit-card" key={i}>
            <div className="benefit-emoji">{b.emoji}</div>
            <h3>{b.title}</h3>
            <p>{b.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
