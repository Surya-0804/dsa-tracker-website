import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { MdAlternateEmail } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { IoIosCloseCircle } from "react-icons/io";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../AuthContext';


const Login = ({ toggleLoginModal }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          isGoogleUser: false
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const data = await response.json();

      if (data.token && data.user) {
        login(data.user, data.token);
        toggleLoginModal();
      } else {
        throw new Error("Failed to log in");
      }

    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.uid,
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
    <div className="outer-container-login">
      <div className="inner-container-login">
        <div className="login-component-heading-container">
          <h2 className="login-component-heading">
            Log in
            <IoIosCloseCircle
              className="login-component-close-mark"
              onClick={toggleLoginModal}
            />
          </h2>
        </div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login-component-label-and-input-container">
            <label className="login-component-label">Email</label>
            <div className="login-component-input-container">
              <div className="login-component-input-icon-wrapper">
                <MdAlternateEmail className="login-component-input-icon" />
              </div>
              <input
                className="login-component-input"
                type="email"
                ref={emailRef}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="login-component-label-and-input-container">
            <label className="login-component-label">Password</label>
            <div className="login-component-input-container">
              <div className="login-component-input-icon-wrapper">
                <IoLockClosed className="login-component-input-icon" />
              </div>
              <input
                className="login-component-input"
                type="password"
                ref={passwordRef}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="login-component-login-button-container">
            <button
              disabled={loading}
              type="submit"
              className="login-component-login-button"
              alt="Login"
            >
              <i>L</i>
              <i>o</i>
              <i>g</i>
              <i>i</i>
              <i>n</i>
            </button>
          </div>
          {/* <div className="login-component-or-description"> OR </div>
          <div className="login-component-google-button-container">
            <button
              onClick={handleGoogleLogin}
              className="login-component-google-button"
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
              Continue with Google
            </button>
          </div> */}
        </form>
        <div className="login-component-signup-redirect-description">
          Need an account?{" "}
          <a href="/signup" className="login-component-signup-redirect">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
