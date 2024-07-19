import React from 'react';
import Wave from 'react-wavify';
import './NewFooter.css';

const NewFooter = () => {
  return (
    <div className="footer-container">
      <Wave
        fill="url(#gradient)"
        paused={false}
        options={{
          height: 20,
          amplitude: 45,
          speed: 0.18,
          points: 3
        }}
        className='footer-svg-style'
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor="#badfd2" />
            <stop offset="20%" stopColor="#8dd3ba" />
            <stop offset="90%" stopColor="#8dd3ba" />
          </linearGradient>
        </defs>
      </Wave>
      <div className="footerMain-content">
        <div className="footer-header">
          <h2>DSA-Tracker</h2>
        </div>
        <div className="footer-section-content">
          <div className="footer-section-line1">
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li>About Us</li>
                <li>Our Services</li>
                <li>Privacy Policy</li>
                <li>Affiliate Program</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Get Help</h3>
              <ul>
                <li>FAQ</li>
                <li>Shipping</li>
                <li>Returns</li>
                <li>Order Status</li>
                <li>Payment Options</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Online Shop</h3>
              <ul>
                <li>Watch</li>
                <li>Bag</li>
                <li>Shoes</li>
                <li>Dress</li>
              </ul>
            </div>
          </div>
          <div className="footer-section follow-us" style={{marginTop:"0"}}>
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFooter;
