import { Link } from 'react-router-dom';
import { APP_NAME } from '../utils/constants';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h4>{APP_NAME}</h4>
          <p style={{ maxWidth: 320, color: '#e9d4ae' }}>
            Book darshan slots and skip the queue at temples across India — simple, secure, and
            transparent pricing.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/temples">Browse temples</Link></li>
            <li><Link to="/my-bookings">My bookings</Link></li>
            <li><Link to="/about">About us</Link></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Contact us</Link></li>
            <li><a href="mailto:help@darshanease.example">help@darshanease.example</a></li>
            <li><a href="tel:+911800000000">1800-000-000</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {year} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
