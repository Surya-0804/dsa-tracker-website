import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useSound from "use-sound";
import { useCookies } from "react-cookie";
import loud_btn from "../sounds/loud_btn_clk.wav";
import "./style.css";
import "./style2.css";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";
import { FaArrowLeft, FaCircleUser, FaCode } from "react-icons/fa";
import { useAuth } from '../../AuthContext';

export default function Nav() {
  const clientUrl = process.env.CLIENT_URL;

  const [play] = useSound(loud_btn);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [showSignupModel, setShowSignupModel] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const isModalOpen = showLoginModel || showSignupModel;
  const [user, setUser] = useState(null);

  const { currentUser, logout } = useAuth();

  const toggleLoginModal = () => {
    setShowLoginModel((prevState) => !prevState);
  };

  const toggleSignupModal = () => {
    setShowSignupModel((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      logout();
    } catch {
      console.error("Failed to log out");
    }
  };

  useEffect(() => {
    const disableBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
      document.body.style.overflow = "visible";
    };

    if (showLoginModel || showSignupModel) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }

    return () => {
      enableBodyScroll();
    };
  }, [showLoginModel, showSignupModel]);

  useEffect(() => {

  }, []);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <>
      <div className={`navbar-container ${isModalOpen ? "blur" : ""}`}>
        <div className="NavContainer">
          <div className="logo">
            {/* <FaCode className="dsa-tracker-logo" /> */}
            <h4>DSA-Tracker</h4>
          </div>
          <nav className="fill stroke">
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={play}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === "/about" ? "active" : ""} onClick={play}>
                About
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/leaderboard" onClick={play} className={location.pathname === "/leaderboard" ? "active" : ""}>
                LeaderBoard
              </Link>
            </li>
            <li className="dropdown">
              <Link
                to="https://gvk-algorithm-visualizer.vercel.app/"
                onClick={play}
              >
                AlgoVisualizer
              </Link>
            </li>
          </nav>
          {currentUser ? (
            <div className="profile" onClick={play}>
              
              <Link to="/profile" style={{textDecoration:"none",marginRight:"2rem",color:"#000"}}>
              <span className="name">{currentUser.name}</span>
                {/* <FaCircleUser className="user-image-navbar" /> */}
              </Link>
              {/* <img src={currentUser.photoURL} alt="User Avatar" /> */}
              <button
                className="logout-button-navbar"
                onClick={() => handleLogout()}
              >
                <p>Logout</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </div>
          ) : (
            <div className="login-signup-buttons">
              <button
                onClick={toggleLoginModal}
                className="login-signup-button-nav"
              >
                Login
              </button>
              <button
                onClick={toggleSignupModal}
                className="login-signup-button-nav"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="dsa-NavContainer">
        <div className="logo">
          <img src="/images/nav/logo.jpg" alt="Logo" />
          <h4>DSA-Tracker</h4>
        </div>
        <nav className="dsa-nav-responsive">
          <div className="nav-mob-open" onClick={toggleMenu}>
            &#9776;
          </div>

          {showMenu && (
            <div className={`dsa-responsive-menu ${showMenu ? "open" : ""}`}>
              <button
                onClick={toggleMenu}
                className="nav-responsive-closing-button"
              >
                {/* <FaArrowLeft /> */}
              </button>
              <div className="dsa-tags show">
                <div className="nav-responsive-tags">
                  <Link
                    to={clientUrl}
                    className="active link-no-underline"
                    onClick={play}
                  >
                    Home
                  </Link>
                </div>
                <div className="nav-responsive-tags">
                  <Link
                    to={clientUrl}
                    className="link-no-underline"
                    onClick={play}
                  >
                    About
                  </Link>
                </div>
                <div className="nav-responsive-tags">
                  <Link
                    to={clientUrl}
                    className="link-no-underline"
                    onClick={play}
                  >
                    Leaderboard
                  </Link>
                </div>
                <div className="nav-responsive-tags">
                  <Link
                    to={clientUrl}
                    className="link-no-underline"
                    onClick={play}
                  >
                    Algo Visualizer
                  </Link>
                </div>

                {currentUser ? (
                  <>
                    <div className="nav-responsive-tags">
                      <Link to="/profile" className="link-no-underline">
                        Profile
                      </Link>
                    </div>
                    <div>
                      <button
                        onClick={handleLogout}
                        className="logout-button-res"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10%",
                    }}
                  >
                    <div style={{ paddingRight: "2rem" }}>
                      <button
                        onClick={toggleLoginModal}
                        className="logout-button-res"
                        style={{ fontSize: "1rem" }}
                      >
                        Login
                      </button>
                    </div>
                    <div style={{ paddingLeft: "2rem" }}>
                      <button
                        onClick={toggleSignupModal}
                        className="logout-button-res"
                        style={{ fontSize: "1rem" }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>

      {showLoginModel && (
        <div className="modal-overlay">
          <div className="login-modal">
            <Login
              toggleLoginModal={toggleLoginModal}
            />
          </div>
        </div>
      )}

      {showSignupModel && (
        <div className="modal-overlay">
          <div className="signup-modal">
            <Signup toggleSignupModal={toggleSignupModal} />
          </div>
        </div>
      )}

      {showLoginModel && (
        <div className="modal-overlay">
          <div className="login-modal">
            <Login
              toggleLoginModal={toggleLoginModal}
            />
          </div>
        </div>
      )}

      {showSignupModel && (
        <div className="modal-overlay">
          <div className="signup-modal">
            <Signup
              toggleSignupModal={toggleSignupModal}
            />
          </div>
        </div>
      )}
    </>
  );
}


