import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import NavBar from "./Components/NavBar";
import Signup from './Components/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />

      <Routes>

        <Route path='/'     element={<Login/>}/>

        <Route path='/signup'     element={<Signup/>}/>

 

        </Routes>

      </BrowserRouter>

    </>

  )
}
export default App;
