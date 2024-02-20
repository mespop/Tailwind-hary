import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Login } from './Pages/login';
import { Home } from './Pages/main/main';
import './App.css';
import { Nav } from './components/NavBar';
import './index.css'

import { CreateForm } from './Pages/create-post/createForm';


function App() {
  return (
  <div>

    
    <Router>
      <Nav/>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} /> 
        <Route path='/createpost' element={<CreateForm/>} /> 
        
      </Routes>
    </Router>
  </div>
  );
}

export default App;
