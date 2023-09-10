
import { Route, Routes} from 'react-router-dom';
import React , {createContext,useContext,useState} from 'react';


import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Otp from './pages/Otp';
import HomeBtech from './pages/HomeBtech';
import { LoginContexts } from './context/LoginContext';

const App = () => {
const [userLogin,setUserLogin]=useState(false);

  return (
    <>
    <LoginContexts.Provider value={{setUserLogin}}>
      <Navbar login={userLogin}/>
      <Routes>
      <Route path="/home-bca" element={<Home />} />
       <Route path="/home-btech" element={<HomeBtech />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/otp/:id" element={<Otp />} />
      </Routes>
      </LoginContexts.Provider>
    </>
  );
};

export default App;
