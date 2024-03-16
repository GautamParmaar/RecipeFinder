import logo from './logo.svg';
import './App.css';
import RegistrationForm from './Components/Signup';
import ProfilePage from './Components/ProfilePage';
import Login from './Components/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import JobCards from "./Components/JobCards";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <LandingPage />
        <NavBar />
        <JobCards />
        <RegistrationForm />
        <ProfilePage />
        <Login />

      </Router>

    </>

  )
}
export default App;
