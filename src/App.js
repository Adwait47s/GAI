// src/App.js
import React from 'react';
import Login from './login';
import AdminPage from './AdminDashboard';
import UserPage from './UserDashboard';
import Navbar from './Navbar';
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
      </BrowserRouter>

    </div>
  );
}

export default App;
