import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import './style2.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="svgContainer">
        <svg viewBox="0 0 120 15" className="footer-svg">
          <defs>
            <mask id="xxx">
              <circle cx="7" cy="15" r="40" fill="#000" />
            </mask>

            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="
                                    1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 13 -9"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
            <path
              id="wave"
              d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
            />
          </defs>

          <use id="wave3" className="wave" xlinkHref="#wave" x="0" y="-2" />
          <use id="wave2" className="wave" xlinkHref="#wave" x="0" y="0" />

          <g className="gooeff">
            <circle className="drop drop1" cx="20" cy="2" r="1.8" />
            <circle className="drop drop2" cx="25" cy="2.5" r="1.5" />
            <circle className="drop drop3" cx="16" cy="2.8" r="1.2" />
            <use id="wave1" className="wave" xlinkHref="#wave" x="0" y="1" />
          </g>
        </svg>
      </div>

      <div className="footerData">
        <div className='header'>
          <h1>DSA-Tracker</h1>
        </div>
        <div className="footer-container">
          <div className="row">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li><Link to="/about-us">about us</Link></li>
                <li><Link to="/services">our services</Link></li>
                <li><Link to="/privacy-policy">privacy policy</Link></li>
                <li><Link to="/affiliate-program">affiliate program</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/shipping">shipping</Link></li>
                <li><Link to="/returns">returns</Link></li>
                <li><Link to="/order-status">order status</Link></li>
                <li><Link to="/payment-options">payment options</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>online shop</h4>
              <ul>
                <li><Link to="/shop/watch">watch</Link></li>
                <li><Link to="/shop/bag">bag</Link></li>
                <li><Link to="/shop/shoes">shoes</Link></li>
                <li><Link to="/shop/dress">dress</Link></li>
              </ul>
            </div>
            <div className="footer-col follow-us">
              <h4>follow us</h4>
              <div className="social-links">
                <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
                <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;