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


  // for backend
  const [values, setValues] = useState({
    email: '',
    pass: '',
    name :'',
 }) 


  const handleSubmit = (event) => {
    event.preventDefault();

    // Custom validation checks
    if (!values.name ||  !values.email || !values.pass) {
      toast.error('Please fill in all required fields.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    if (values.pass !== values.confirmPass) {
      toast.error('Password and Confirm Password do not match.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    
    // Mobile number validation using regex (10 digits)
   

    // If all validation checks pass, continue with form submission
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        const user = res.user;
        setTimeout(() => {
          console.log('delayed')
          navigate("/");

          toast.success('Account Created successfully', {
      
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }, 1000);

        await updateProfile(user, {
          displayName: values.name,
        }).catch((error) => {
          // Handle profile update error
          toast.error(error.message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });

        try {
          const docRef = await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          });

          setTimeout(() => {
            console.log('delayed',docRef);
            toast.success('Account Created successfully', {
      
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
         
          }, 1000); // Adjust the delay as needed
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
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
            <input
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
            <button onClick={handleSubmit} type="submit">Signup</button>
          </div>
          <ToastContainer/>
          <ToastContainer/>

        </form>
        <ToastContainer/>
          <ToastContainer/>

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