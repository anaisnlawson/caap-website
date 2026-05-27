import { useState } from 'react';
import './Curriculum.css';

interface WeekSection {
  icon: string;
  title: string;
  items: string[];
}

interface WeekData {
  week: number;
  date: string;
  title: string;
  emoji: string;
  color: string;
  subtitle?: string;
  goals: string[];
  sections: WeekSection[];
}

export default function Curriculum() {
  const weeks: WeekData[] = [
    {
      week: 1,
      date: 'July 11',
      title: 'College Strategy + Personal Narrative',
      emoji: '🏫',
      color: '#3b82f6',
      subtitle: 'Foundation Week',
      goals: [
        'Help students clarify why they\'re going to college',
        'Build a smart college list',
        'Start personal statement drafting',
      ],
      sections: [
        {
          icon: '📚',
          title: 'Topics',
          items: [
            'Types of colleges (public, private, HBCUs, liberal arts, community college transfer)',
            'Understanding admissions criteria (GPA, rigor, extracurriculars, "fit")',
            'Building a balanced college list (Reach / Target / Likely)',
            'FAFSA + CSS Profile overview',
            'Brainstorming college essay topics',
            'Personal storytelling workshop',
          ],
        },
        {
          icon: '🛠️',
          title: 'Workshop Activities',
          items: [
            '"Life Timeline" exercise for essay ideas',
            'College list building worksheet',
            'Common App account setup',
            'Accountability groups formed',
          ],
        },
      ],
    },
    {
      week: 2,
      date: 'July 18',
      title: 'College Essays Deep Dive',
      emoji: '✍️',
      color: '#8b5cf6',
      goals: [
        'Draft, revise, and polish personal statement',
        'Prepare for supplemental essays',
      ],
      sections: [
        {
          icon: '📚',
          title: 'Topics',
          items: [
            'Breaking down the Common App essay prompts',
            'Supplemental essays (Why Us?, Community, Leadership, Diversity)',
            'Writing authentically vs. writing what you think they want',
            'Editing strategies',
            'How to ask for recommendation letters properly',
          ],
        },
        {
          icon: '🛠️',
          title: 'Activities',
          items: [
            'Peer review sessions',
            '1:1 feedback time',
            'Teacher recommender outreach template',
            'Resume/activity list workshop',
          ],
        },
      ],
    },
    {
      week: 3,
      date: 'July 25',
      title: 'Paying for College — Scholarships + Fly-In Programs',
      emoji: '💰',
      color: '#f59e0b',
      subtitle: 'Critical for low-income students',
      goals: [
        'Remove financial fear',
        'Increase access to elite schools via fly-ins',
        'Create scholarship tracking system',
      ],
      sections: [
        {
          icon: '✈️',
          title: 'Fly-In Programs (Access Strategy)',
          items: [
            'How fly-in programs cover travel + lodging',
            'Using fly-ins to demonstrate interest & increase admissions odds',
            'Experiencing campus culture firsthand',
            'Where to find fly-in programs',
            'How to write strong fly-in essays',
            'Deadline calendar planning',
          ],
        },
        {
          icon: '💰',
          title: 'Scholarships Strategy',
          items: [
            'Local vs national scholarships',
            'Merit vs need-based aid',
            'Avoiding scholarship scams',
            'Creating a scholarship tracker spreadsheet',
            'Writing reusable scholarship essays',
            'Understanding financial aid award letters',
            'Platforms: QuestBridge, Jack Kent Cooke Foundation, The Gates Scholarship',
          ],
        },
      ],
    },
    {
      week: 4,
      date: 'August 1',
      title: 'Career Exposure + Transition to College',
      emoji: '🎓',
      color: '#10b981',
      goals: [
        'Connect college to career',
        'Build professional confidence',
        'Teach "hidden curriculum" skills',
      ],
      sections: [
        {
          icon: '👩🏽‍💼',
          title: 'Career Panel',
          items: [
            'Panelists: first-gen grads, tech, healthcare, business/finance, skilled trades',
            'Students prepare an elevator pitch',
            'Students prepare 3 thoughtful questions',
            'LinkedIn basics workshop',
          ],
        },
      ],
    },
  ];

  const [expandedWeek, setExpandedWeek] = useState<number | null>(0);

  return (
    <div className="curriculum">
      <section className="curriculum-hero">
        <h1>🌟 4-Week Curriculum</h1>
        <p className="curriculum-subtitle">
          College Application Assistance Program
        </p>
        <p className="curriculum-schedule">
          Month of July — Saturdays, 10 AM – 1 PM
        </p>
        <p className="curriculum-note">
          <em>*Pushed one week because of 4th of July. Subject to change.</em>
        </p>
      </section>

      <div className="weeks-list">
        {weeks.map((w, idx) => (
          <div
            className={`week-card-full ${expandedWeek === idx ? 'expanded' : ''}`}
            key={w.week}
          >
            <button
              className="week-header-full"
              onClick={() => setExpandedWeek(expandedWeek === idx ? null : idx)}
              style={{
                borderLeft: `5px solid ${w.color}`,
              }}
            >
              <div className="week-header-left">
                <span className="week-emoji-full">{w.emoji}</span>
                <div className="week-header-text">
                  <h3>
                    Week {w.week}: {w.title}
                  </h3>
                  <div className="week-meta">
                    <span className="week-date-full">{w.date}</span>
                    {w.subtitle && (
                      <span
                        className="week-badge"
                        style={{
                          background: `${w.color}20`,
                          color: w.color,
                        }}
                      >
                        {w.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="week-chevron">
                {expandedWeek === idx ? '▲' : '▼'}
              </span>
            </button>

            <div className="week-body">
              <div className="goals-section">
                <h4>🎯 Goals</h4>
                <ul>
                  {w.goals.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              <div className="sections-grid">
                {w.sections.map((section, si) => (
                  <div className="topic-section" key={si}>
                    <h4>
                      {section.icon} {section.title}
                    </h4>
                    <ul>
                      {section.items.map((item, ii) => (
                        <li key={ii}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="weekly-structure">
        <h2>📅 Weekly Structure</h2>
        <p className="structure-subtitle">2 – 2.5 hours per session</p>
        <div className="structure-grid">
          <div className="structure-block">
            <span className="structure-time">30 min</span>
            <span className="structure-label">Educational Workshop</span>
          </div>
          <div className="structure-block">
            <span className="structure-time">45 min</span>
            <span className="structure-label">Working Session</span>
          </div>
          <div className="structure-block">
            <span className="structure-time">30 min</span>
            <span className="structure-label">Small Group Coaching</span>
          </div>
          <div className="structure-block">
            <span className="structure-time">15 min</span>
            <span className="structure-label">Reflection + Homework</span>
          </div>
        </div>
      </section>
    </div>
  );
}
