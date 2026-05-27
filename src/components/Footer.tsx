import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">CAAP</span>
          <p>College Application Assistance Program</p>
        </div>
        <div className="footer-info">
          <p>Helping rising seniors navigate the college application process 🎓</p>
          <p className="footer-copy">&copy; {new Date().getFullYear()} CAAP. Made with 💙</p>
        </div>
      </div>
    </footer>
  );
}
