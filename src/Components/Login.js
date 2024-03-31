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

  
  



 

 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        toast.success('You are now logged in', {
      
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      

        console.log(user);
        setRedirecting(true);

        // navigate("/sign");

        
        

      })
      .catch((error) => {
        console.error("Authentication error:", error);
        toast.error(error.message, {
      
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
        
      });
  }

    // Use a conditional redirect to delay the navigation
    if (redirecting) {
      setTimeout(() => {
        navigate('/signup');
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
            <button onClick={handleSubmit} type="submit">Login</button>
          </div>
          <ToastContainer/>

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