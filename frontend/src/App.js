// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './home';
import Adduser from './adduser';
import Createadmin from './createadmin';
import Groups from './groups';
import Editprofile from './editprofile';
import OneToOneAdd from './OneToOneAdd';
import OneToOneReview from './OneToOneReview';
import AddMeetings from './AddMeetings';
import ReviewMeetings from './ReviewMeetings';
import FeesAdd from './FeeAdd';
import FeesReview from './FeesReview';
import ChangePass from './changepass';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/createadmin" element={<Createadmin />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/editprofile" element={<Editprofile />} />
        <Route path="/OneToOneAdd" element={<OneToOneAdd />} />
        <Route path="/OneToOneReview" element={<OneToOneReview />} />
        <Route path="/AddMeetings" element={<AddMeetings />} />
        <Route path="/ReviewMeetings" element={<ReviewMeetings />} />
        <Route path="/FeesAdd" element={<FeesAdd />} />
        <Route path="/FeesReview" element={<FeesReview />} />
        <Route path="/ChangePass" element={<ChangePass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;