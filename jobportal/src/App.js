import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import ProfilePage from './Components/ProfilePage';
import Login from './Components/Login';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
   <>
   <Router>
   <NavBar/>
   <ProfilePage/>
   <Login/>

   </Router>

   </>
  );
}

export default App;
