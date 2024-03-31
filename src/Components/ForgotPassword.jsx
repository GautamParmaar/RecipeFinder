import React , { useState }from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import "./Login.css";


function ForgotPassword() {



    
  const [values, setValues] = useState({
    email: '',



  })

  const validateEmail = (email) => {
    // Very basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  



 

 

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!validateEmail(values.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

    const auth = getAuth();
    
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast.success('Password reset email sent successfully');
    } catch (error) {
      toast.error(error.message);
      console.error('Error sending reset email:', error.message);
    }
  };

    // Use a conditional redirect to delay the navigation
 
  return (
    <div className="container5 forms">
    <div className="form login">
      <div className="form-content">
        <header>Forgot Password</header>
        <form onSubmit={handleSubmit}>
          <div className="field input-field">
            <input
              type="email"
              placeholder="Enter Email for reset your password"
              className={`input ${'isValidEmail' ? "" : "invalid"}`}
              
              onChange={(events) => {
                setValues((prev) => ({ ...prev, email: events.target.value }))
              }}            />
           
          </div>

           
        
          {'isValidEmail' ? null : (
              <div className="error-message"></div>
            )}

          <div className="field button-field">
            <button onClick={handleSubmit} type="submit">Submit</button>
          </div>
          <ToastContainer/>

        </form>
        <div className="form-link">
          <span>
            Click here to{" "}
            <Link className="link signup-link" to="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>  )
}

export default ForgotPassword




