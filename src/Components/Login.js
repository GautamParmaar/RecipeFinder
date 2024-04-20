import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,  } from "../Components/Config"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from 'react-toastify';

import "./Login.css";
function Login() {

  const navigate=useNavigate();
  const [redirecting, setRedirecting] = useState(false);


    
  const [values, setValues] = useState({
    email: '',
    password: '',



  })
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  
  



 

 

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Show "Please wait" toast message
    const waitToastId = toast.promise(
      signInWithEmailAndPassword(auth, values.email, values.password),
      {
        pending: 'Please wait...',
        success: 'You are now logged in',
        error: 'Authentication failed. Please check your credentials.',
        autoClose: 3000,
        // position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        position: "top-center"
      }
    );

    // Handle promise resolution
    waitToastId.then(() => {
      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }).catch((error) => {
      setLoading(false);
      console.error("Authentication error:", error);
    });
  };
    // Use a conditional redirect to delay the navigation
    if (redirecting) {
      setTimeout(() => {
        navigate('/');
      }, 3000); // Adjust the delay time as needed
    }
  
  return (
    <div className="container5 forms">
    <div className="form login">
      <div className="form-content">
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <div className="field input-field">
            <input
              type="email"
              placeholder="Email"
              className={`input ${'isValidEmail' ? "" : "invalid"}`}
              
              onChange={(events) => {
                setValues((prev) => ({ ...prev, email: events.target.value }))
              }}            />
           
          </div>

          <div className="field input-field">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="password"
                  onChange={(events) => {
                    setValues((prev) => ({ ...prev, password: events.target.value }))
                  }}                />
                {passwordVisible ? (
                  <VisibilityIcon fontSize='large'
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ) : (
                  <VisibilityOffIcon fontSize='large'
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )}
              </div>

              <div style={{marginBottom:'-9px'}} className="form-link">
          <span>
            Forgot Password?{" "}
            <Link className="link signup-link" to="/ForgotPassword">
              Click here
            </Link>
          </span>
        </div>

          <div className="form-link">
            
          </div>
          {'isValidEmail' ? null : (
              <div className="error-message"></div>
            )}

          <div className="field button-field">
            <button  onClick={handleSubmit} >Login</button>
          </div>
          <ToastContainer position="top-center"/>

        </form>

        <div className="form-link">
          <span>
            Don't have an account?{" "}
            <Link className="link signup-link" to="/SignUp">
              SignUp
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>  )
}

export default Login