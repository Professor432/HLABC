import React, { useState } from 'react';
import './changepass.css';
import white from './images/white.png';
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';
import linkedin from './images/linkedin.png';
import nakamu from './images/nakamu.png';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const ChangePass = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');

  const handleDropdownClick = (e) => {
    e.currentTarget.classList.toggle('active');
    const dropdownContent = e.currentTarget.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.put('http://localhost:5000/api/updatepassword', { email, password });
      alert(response.data.message);
    } catch (error) {
      alert('Error updating password');
    }
  };

  return (
    <>
      <div className="contain">
        <div className="scrollbar">
          <aside className="sidebar">
            <div className="sidebar-content">
              <img src={white} alt="whitelogo" style={{ height: '100px' }} />
              <ul style={{ textAlign: 'left', padding: '0px 0px 0px 20px' }}>
                <li><Link to="/home">Home</Link></li>
                {localStorage.getItem('role') !== 'Member' && (
                  <li>
                    <button className="dropdown-btn" onClick={handleDropdownClick}>
                      Manage User <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </button>
                    <div className="dropdown-container">
                      <Link to="/adduser">Add User</Link>
                      <br />
                      <Link to="/createadmin">Create Admin</Link>
                    </div>
                  </li>
                )}
                <li><Link to="/groups">Groups</Link></li>
                <li>
                  <button className="dropdown-btn" onClick={handleDropdownClick}>
                    One-To-One <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                  </button>
                  <div className="dropdown-container">
                    <Link to="/OneToOneAdd">Add Slip</Link>
                    <br></br>
                    <Link to="/OneToOneReview">Review Slip</Link>
                  </div>
                </li>
                <li>
                  <button className="dropdown-btn" onClick={handleDropdownClick}>
                    Referral <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                  </button>
                  <div className="dropdown-container">
                    <Link to="/AddReferral">Add Slip</Link>
                    <br></br>
                    <Link to="/ReferralGiven">Referral Given Slip</Link>
                    <br></br>
                    <Link to="/ReferralReceived">Referral Received Slip</Link>
                  </div>
                </li>
                <li>
                  <button className="dropdown-btn" onClick={handleDropdownClick}>
                    Fees <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                  </button>
                  <div className="dropdown-container">
                    <Link to="/FeesAdd">Add Slip</Link>
                    <br></br>
                    <Link to="/FeesReview">Review Slip</Link>
                  </div>
                </li>
                <li>
                  <button className="dropdown-btn" onClick={handleDropdownClick}>
                    Thank-You Slip <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                  </button>
                  <div className="dropdown-container">
                    <Link to="/ThankYouAdd">Add Slip</Link>
                    <br></br>
                    <Link to="/ThankYouReview">Review Slip</Link>
                  </div>
                </li>
                <li>
                  <button className="dropdown-btn" onClick={handleDropdownClick}>
                    Group Meetings <i className="fa fa-chevron-down" aria-hidden="true"></i>
                  </button>
                    {localStorage.getItem('role') !== 'Member' && (
                      <div className="dropdown-container">
                        <Link to="/AddMeetings">Add Meetings</Link>
                        <br />
                        <Link to="/ReviewMeetings">Review Meetings</Link>
                      </div>)}
                  {localStorage.getItem('role') === 'Member' && (
                    <div className="dropdown-container">
                      <Link to="/ReviewMeetings">Review Meetings</Link>
                    </div>)}
                </li>
                <li>
                  <button className="dropdown-btn" onClick={handleDropdownClick}>
                    Account Settings <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                  </button>
                  <div className="dropdown-container">
                    <Link to="/editprofile">Edit Profile</Link>
                    <br></br>
                    <Link to="/changepass">Change Password</Link>
                    <br></br>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                  </div>
                </li>
              </ul>
              <div className="social-media">
                <a href="https://www.facebook.com"><img src={facebook} alt="Facebook" /></a>
                <a href="https://www.instagram.com"><img src={instagram} alt="Instagram" /></a>
                <a href="https://www.linkedin.com"><img src={linkedin} alt="LinkedIn" /></a>
              </div>
            </div>
          </aside>
        </div>
        <main className="main-content">
          <header className="header">
            <nav>
              <div className="navbar-right">
                <img src={nakamu} alt="Profile Logo" className="profile-logo" />
              </div>
            </nav>
          </header>
          <div className="middle-space"></div>
          <div className="form-container">
            <form id="changePassForm" onSubmit={handleSubmit}>
              <div className="form-group1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <input
                  type="password"
                  id="retype-password"
                  name="retype-password"
                  placeholder="Retype Password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </div>
              {/* {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>} */}
              <button type="submit" className="update-details1">Update Password</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChangePass;
