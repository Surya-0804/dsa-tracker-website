import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { useCookies } from "react-cookie";
import loud_btn from "../sounds/loud_btn_clk.wav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import "./style2.css";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";
import { auth, googleProvider } from "../../pages/auth/firebase";
import { signInWithPopup } from "firebase/auth";
import { FaArrowLeft, FaCircleUser, FaCode } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import { ToastContainer, toast } from "react-toastify";
export default function Nav() {
  const navigate = useNavigate();
  const navigateToSignup = () => {
    navigate("/signup");
  };
  const clientUrl = process.env.CLIENT_URL;

  const [play] = useSound(loud_btn);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [showSignupModel, setShowSignupModel] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const isModalOpen = showLoginModel || showSignupModel;
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

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

  useEffect(() => {}, []);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              password: user.uid,
              isGoogleUser: true,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to log in");
        }

        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          toast.success("Registration successfully completed!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          console.error(data.error);
          throw new Error("Failed to log in");
        }
      } catch (err) {
        console.error(err);
      }
      navigate("/");
    } catch (error) {
      setError("Failed to log in with Google");
    }
  };

  return (
    <>
      <div className={`navbar-container ${isModalOpen ? "blur" : ""}`}>
        <div className="NavContainer">
          <div className="logo">
            <h4>DSA-Tracker</h4>
          </div>
          <nav className="fill stroke">
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={play}
              >
                Home
              </Link>
            </li>
            <li className="dropdown">
              <Link
                to="/leaderboard"
                onClick={play}
                className={location.pathname === "/leaderboard" ? "active" : ""}
              >
                LeaderBoard
              </Link>
            </li>
            <li className="dropdown">
              <Link
                to="/algoVisualiser"
                onClick={play}
                className={
                  location.pathname === "/algoVisualiser" ? "active" : ""
                }
              >
                AlgoVisualizer
              </Link>
            </li>
            <li className="dropdown">
              <Link
                to="/stats"
                onClick={play}
                className={location.pathname === "/stats" ? "active" : ""}
              >
                Stats
              </Link>
            </li>
          </nav>
          {currentUser ? (
            <div className="profile" onClick={play}>
              <Link
                to="/stats"
                style={{ textDecoration: "none", color: "#000" }}
              >
                {/* <span className="name">{currentUser.name}</span>
                 */}
                <div className="userProfileContainer">
                  <img src="/images/userProfile.png"></img>
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
              </Link>
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
                onClick={navigateToSignup}
                className="login-signup-button-nav"
              >
                Signup
              </button>
              <button
                onClick={handleGoogleLogin}
                className="login-signup-button-nav"
                alt="Login with Google"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
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
                    {/* <div>
                      <button
                        onClick={handleGoogleLogin}
                        className="logout-button-res"
                        alt="Login with Google"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid"
                          viewBox="0 0 256 262"
                        >
                          <path
                            fill="#4285F4"
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          ></path>
                          <path
                            fill="#EB4335"
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          ></path>
                        </svg>
                      </button>
                    </div> */}
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
            <Login toggleLoginModal={toggleLoginModal} />
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
            <Login toggleLoginModal={toggleLoginModal} />
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
    </>
  );
}
