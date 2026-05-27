import { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: 'Do I have to attend the sessions in July?',
      answer:
        'Yes, this is in person and is also a pre-requisite to receive mentorship. If you are unable to attend, please communicate that and we will also be hosting virtual sessions throughout the month.',
    },
    {
      question: 'What materials would we need to bring every Saturday?',
      answer:
        'Computer or pen and paper — just something to take notes. A snack and water too!',
    },
    {
      question: 'Will someone actually work with me directly?',
      answer:
        'The workshops will be classroom style with some volunteers available. 1:1 mentorship will be available once the sessions portion is over.',
    },
    {
      question: 'Do I need to have good grades to join?',
      answer:
        'Not necessarily. This is a commitment to helping you apply to college. If you are committed to the program, we will work with you!',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <h1>FAQs ❓</h1>
        <p className="faq-subtitle">Got questions? We've got answers!</p>
      </section>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div
            className={`faq-item ${openIndex === i ? 'open' : ''}`}
            key={i}
          >
            <button className="faq-question" onClick={() => toggle(i)}>
              <span>{faq.question}</span>
              <span className="faq-chevron">{openIndex === i ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
