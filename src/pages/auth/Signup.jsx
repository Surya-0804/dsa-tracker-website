// Signup.js
import React, { useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
// import { collection, addDoc } from "firebase/firestore";
import { db, auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAlternateEmail } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import "./Signup.css";

const Signup = () => {
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
      // toggleSignupModal(); // Close the signup modal on success
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
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Registration successfully completed!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      } else {
        throw new Error("Failed to log in");
      }
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
              />
            </h2>
          </div>
          {error && <p className="error-message">{error}</p>}
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
              >
                Sign Up
              </button>
            </div>
            <div className="signup-component-or-description"> OR </div>
            <div className="signup-component-google-button-container">
              <button
                onClick={handleGoogleSignUp}
                className="signup-component-google-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.315-1.609c33.453-31.039 52.087-76.518 52.087-129.528z"
                  />
                  <path
                    fill="#34A853"
                    d="M130.55 81.696c-7.575-6.982-17.132-10.658-27.492-10.658-20.013 0-37.703 13.764-43.846 32.143l-2.619 1.564-38.573-29.553-2.645 1.612C21.972 72.512 61.73 17.155 113.34 4.936l2.277-1.54-38.004-30.22-1.572 1.04C35.565 22.438 74.838 76.919 130.55 81.696z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M87.058 93.875c-5.866-5.321-12.91-9.644-20.806-12.546L40.026 79.564C28.293 101.975 20.874 124.748 20.874 148.453c0 8.46 1.393 16.45 3.974 24.066L75.5 148.28c9.226-18.216 20.717-33.84 30.557-41.676l-1.978-1.477z"
                  />
                  <path
                    fill="#EA4335"
                    d="M20.874 148.453c0 8.452 1.486 16.766 4.245 24.633L87.58 148.828c-7.208-13.784-21.693-29.584-30.72-34.12L28.317 93.08C20.874 106.42 20.874 118.733 20.874 148.453z"
                  />
                </svg>
                Sign Up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;