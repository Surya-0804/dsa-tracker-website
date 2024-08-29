// Signup Component
import React, { useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
// import { collection, addDoc } from "firebase/firestore";
import { db, auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import "./Signup.css";
import { MdAlternateEmail } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({ toggleSignupModal, setIsLoginCompleted }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const { login } = useAuth();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const name = nameRef.current.value;
    const phoneNo = phoneRef.current.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await signup(email, password, name, phoneNo);
      toggleSignupModal(); // Close the signup modal on success
      navigate("/"); // Redirect to home or other page after successful signup
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      const userData = user.providerData;

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          password: user.uid,
          photoUrl: user.photoURL,
          googleUid: user.uid,
          isGoogleUser: true
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
        console.log("sdlkfj")
      }
      else {
        toggleSignupModal();
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userData.email,
              password: user.uid,
              isGoogleUser: true
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to log in");
          }
          const data = await response.json();
          console.log(data);
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            toast.success('Registartion Succesfully completed!', {
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
        }
        catch (err) {
        }
      }

      navigate("/");
    } catch (error) {
      setError("Failed to sign up with Google");
    }
  };



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="outer-container-signup">
        <div className="inner-container-signup">
          <div className="signup-component-heading-container">
            <h2 className="signup-component-heading">
              Sign Up
              <IoIosCloseCircle
                className="signup-component-close-mark"
                onClick={toggleSignupModal}
              />
            </h2>
          </div>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="signup-component-label-and-input-container">
              <label className="signup-component-label">Email</label>
              <div className="signup-component-input-container">
                <div className="signup-component-input-icon-wrapper">
                  <MdAlternateEmail className="signup-component-input-icon" />
                </div>
                <input
                  className="signup-component-input"
                  type="email"
                  ref={emailRef}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="signup-component-label-and-input-container">
              <label className="signup-component-label">Name</label>
              <div className="signup-component-input-container">
                <div className="signup-component-input-icon-wrapper">
                  <BiRename className="signup-component-input-icon" />
                </div>
                <input
                  className="signup-component-input"
                  type="text"
                  ref={nameRef}
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            <div className="signup-component-label-and-input-container">
              <label className="signup-component-label">Phone Number</label>
              <div className="signup-component-input-container">
                <div className="signup-component-input-icon-wrapper">
                  <FaPhoneAlt className="signup-component-input-icon-phone" />
                </div>
                <input
                  className="signup-component-input"
                  type="tel"
                  ref={phoneRef}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            <div className="signup-component-label-and-input-container">
              <label className="signup-component-label">Password</label>
              <div className="signup-component-input-container">
                <div className="signup-component-input-icon-wrapper">
                  <IoLockClosed className="signup-component-input-icon" />
                </div>
                <input
                  className="signup-component-input"
                  type="password"
                  ref={passwordRef}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <div className="signup-component-label-and-input-container">
              <label className="signup-component-label">Confirm Password</label>
              <div className="signup-component-input-container">
                <div className="signup-component-input-icon-wrapper">
                  <IoLockClosed className="signup-component-input-icon" />
                </div>
                <input
                  className="signup-component-input"
                  type="password"
                  ref={confirmPasswordRef}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            <div className="signup-component-signup-button-container">
              <button
                disabled={loading}
                type="submit"
                className="signup-component-signup-button"
                alt="Signup"
              >
                <i>s</i>
                <i>i</i>
                <i>g</i>
                <i>n</i>
                <i>u</i>
                <i>p</i>
              </button>
            </div>
            <div className="signup-component-or-description"> OR </div>
            <div className="signup-component-google-button-container">
              <button
                onClick={handleGoogleSignUp}
                className="signup-component-google-button"
                alt="Sign Up with Google"
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
                Continue with Google
              </button>
            </div>
          </form>
          <div className="signup-component-login-redirect-description">
            Already have an account?{" "}
            <a href="/login" className="signup-component-login-redirect">
              Login
            </a>
          </div>
        </div>
      </div>
    </>

  );
};

export default Signup;