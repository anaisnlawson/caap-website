import './Mentorship.css';

export default function Mentorship() {
  return (
    <div className="mentorship">
      <section className="mentorship-hero">
        <h1>Mentorship 🤝</h1>
        <p className="mentorship-subtitle">Month of August & Beyond</p>
      </section>

      <div className="mentorship-content">
        <div className="mentorship-main-card">
          <div className="congrats-badge">🎉 You've attended all the in-person sessions... Congrats!!</div>
          <p className="mentorship-description">
            You have the opportunity to be matched with a mentor to assist you
            with the application process into the school year. Communication and
            cadence will be outlined as we get closer.
          </p>
        </div>

        <div className="mentorship-details">
          <div className="detail-card">
            <div className="detail-icon">🎯</div>
            <h3>Personalized Matching</h3>
            <p>
              Mentors are matched based on their experience and your interests —
              so you get guidance that's actually relevant to you.
            </p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">💬</div>
            <h3>Ongoing Support</h3>
            <p>
              Your mentor will be there through the college application cycle,
              helping with essays, decisions, and everything in between.
            </p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">⚡</div>
            <h3>Prerequisite</h3>
            <p>
              Mentorship is contingent on attendance of the July in-person
              sessions. Show up, and we'll match you up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
