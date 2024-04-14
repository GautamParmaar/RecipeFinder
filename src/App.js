import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import NavBar from "./Components/NavBar";
import Signup from './Components/Signup';
import { useEffect, useState } from 'react';
import { auth } from './Components/Config';
import ForgotPassword from './Components/ForgotPassword';
import ProfilePage from './Components/ProfilePage';
import SearchRecipe from './Components/SearchRecipe';
import Home from './Components/Home';
import About from './Components/About';


function App() {
  

  const [user,setUser]=useState();

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        console.log(user.uid)
        setUser(user);
      }
      else{
        setUser()
      }
    })
   
  },)

  return (
    <>
      <BrowserRouter>
      <NavBar user={user} />

      <Routes>
        <Route path='/' element={<><Home/> <About/></>}/>

        <Route path='/login'     element={<Login/>}/>
        <Route path='/about' element={<About/>} />

        <Route path='/signup'     element={<Signup/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/Profile' element={<ProfilePage user={user}/>} />
        <Route path='/Search' element={<SearchRecipe/>} />

 

        </Routes>

      </BrowserRouter>

    </>

  )
}
export default App;
