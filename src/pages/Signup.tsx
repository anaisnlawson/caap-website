import { QRCodeSVG } from 'qrcode.react';
import './Signup.css';

const FORM_URL = 'https://forms.cloud.microsoft/r/K8FjeqLvWp';

export default function Signup() {
  return (
    <div className="signup-page">
      <section className="signup-hero">
        <h1>Ready to Get Started? 🚀</h1>
        <p className="signup-subtitle">
          Thanks for expressing your interest in CAAP — we look forward to
          starting the ground running in July!
        </p>
      </section>

      <div className="signup-card">
        <div className="qr-section">
          <div className="qr-wrapper">
            <QRCodeSVG
              value={FORM_URL}
              size={220}
              bgColor="white"
              fgColor="#1e3a8a"
              level="M"
              includeMargin
            />
          </div>
          <p className="qr-label">Scan to sign up!</p>
        </div>

        <div className="signup-info">
          <h2>Sign Up Today</h2>
          <p>
            Scan the QR code with your phone camera or click the button below to
            fill out our sign-up form. It only takes a minute!
          </p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="signup-btn"
          >
            Open Sign-Up Form →
          </a>
        </div>
      </div>
    </div>
  );
}
