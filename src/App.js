// src/App.js
import React from 'react';
import Login from './login.js';
import AdminPage from './AdminDashboard.js';
import UserPage from './UserDashboard.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminViewInfo from './AdminViewInfo';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/AdminPage' element={<AdminPage />} />
          <Route path="/UserPage" element={<UserPage />} />
          <Route path="/AdminViewInfo" element={<AdminViewInfo />}/>
          <Route render={() => <Navigate to="/" />} />
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
