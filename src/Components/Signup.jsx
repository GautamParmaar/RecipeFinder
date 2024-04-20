import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import { setDoc,doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from './Config';
import "./CSS/Signup.css"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";




function SignUp() {
 
 
  const navigate=useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [loading, setLoading] = useState(false);




  // for backend
  const [values, setValues] = useState({
    email: '',
    pass: '',
    name :'',
 }) 


 const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  // Input validation checks
  if (!values.name.trim()) {
    toast.error('Please enter your name.', { position: 'top-center' });
    setLoading(false);
    return;
  }

  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    toast.error('Please enter a valid email address.', { position: 'top-center' });
    setLoading(false);
    return;
  }

  if (values.pass.length < 6) {
    toast.error('Password must be at least 6 characters long.', { position: 'top-center' });
    setLoading(false);
    return;
  }

  if (values.pass !== values.confirmPass) {
    toast.error('Password and Confirm Password do not match.', { position: 'top-center' });
    setLoading(false);
    return;
  }

  // Attempt user creation
  const createUserPromise = createUserWithEmailAndPassword(auth, values.email, values.pass);

  const waitToastId = toast.promise(createUserPromise, {
    pending: 'Please wait...',
    success: 'Account Created successfully',
    error: (error) => `Error: ${error.message}`,
    autoClose: 3000,
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "dark",
  });

  try {
    const userCredential = await createUserPromise;
    const user = userCredential.user;
    await updateProfile(user, { displayName: values.name });
    await setDoc(doc(db, 'users', user.uid), { uid: user.uid, name: user.displayName, email: user.email });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
    toast.dismiss(waitToastId);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }
};
  if (redirecting) {
    setTimeout(() => {
      navigate('/');
    }, 3000); // Adjust the delay time as needed
  }


  // 
  const [passwordVisible, setPasswordVisible] = useState(false);

  
  



 

 


  return (
    <>



{/* login form hi daalna hai yaha */}

<div  className="container5 forms">
    <div className="form login">
      <div className="form-content">
        <header>Signup</header>
        <form onSubmit={handleSubmit}>

        <div className="field input-field">
            <input style={{width:'100%',backgroundColor:''}}
              type="text"
              placeholder="Your Name"
             
              
              onChange={(events) => {
                setValues((prev) => ({ ...prev, name: events.target.value }))
              }}            />
           
          </div>
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
                  onChange={(event) => {
                    setValues((prev) => ({ ...prev, pass: event.target.value }));
                  }}
                />
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
              <div className="field input-field">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={(event) => {
                    setValues((prev) => ({ ...prev, confirmPass: event.target.value }));
                  }}
                />
              </div>

          <div className="form-link">
            
          </div>
          {'isValidEmail' ? null : (
              <div className="error-message"></div>
            )}

          <div className="field button-field">
            <button onClick={handleSubmit} >Signup</button>
          </div>
          <ToastContainer position="top-center"/>
          <ToastContainer position="top-center"/>

        </form>
        <ToastContainer position="top-center"/>

        <div className="form-link">
          <span>
            Already have an account?{" "}
            <Link className="link signup-link" to="/Login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default SignUp