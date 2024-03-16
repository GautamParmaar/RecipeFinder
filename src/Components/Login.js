import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Login.css";
function Login() {

    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  
  



 

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Check if the input email is a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputEmail);
    setIsValidEmail(isValid);

    // Update error message
    setErrorMessage(isValid ? "" : "Invalid email address");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://localhost:8080/login"
      const response = await fetch("https://betting-backend-beta.vercel.app/login"

      
      , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // Handle successful login on the client side (e.g., redirect to home page)
        console.log("Login successful!");
        setErrorMessage("");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };
   
    
  
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
              className={`input ${isValidEmail ? "" : "invalid"}`}
              value={email}
              onChange={handleEmailChange}
            />
           
          </div>

          <div className="field input-field">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordVisible ? (
                  <VisibilityIcon
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )}
              </div>

          <div className="form-link">
            <Link className="forgot-pass" to="/ForgetPassword">
              Forgot password?
            </Link>
          </div>
          {isValidEmail ? null : (
              <div className="error-message">{errorMessage}</div>
            )}

          <div className="field button-field">
            <button type="submit">Login</button>
          </div>
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