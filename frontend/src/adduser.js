import React, { useState } from 'react';
import white from './images/white.png';
import facebook from './images/facebook.png';
import instagram from './images/instagram.png';
import linkedin from './images/linkedin.png';
import nakamu from './images/nakamu.png';
import './adduser.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const AddUser = () => {

  const handleDropdownClick = (e) => {
    e.currentTarget.classList.toggle('active');
    const dropdownContent = e.currentTarget.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    occupation: '',
    email: '',
    password: '',
    retypePassword: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('User added successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          occupation: '',
          email: '',
          password: '',
          retypePassword: '',
          role: '',
        });
      } else {
        alert('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
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
                    One-To-One <i className="fa fa-chevron-down" aria-hidden="true">   </i>
                    </button>
                    <div className="dropdown-container">
                    <Link to="/OneToOneAdd">Add Slip</Link>
                    <br></br>
                    <Link to="/OneToOneReview">Review Slip</Link>
                    </div>
                </li>
                <li>
                    <button className="dropdown-btn" onClick={handleDropdownClick}>
                    Referral <i className="fa fa-chevron-down" aria-hidden="true">   </i>
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
                    Fees <i className="fa fa-chevron-down" aria-hidden="true">   </i>
                    </button>
                    <div className="dropdown-container">
                    <Link to="/FeesAdd">Add Slip</Link>
                    <br></br>
                    <Link to="/FeesReview">Review Slip</Link>
                    </div>
                </li>
                <li>
                    <button className="dropdown-btn" onClick={handleDropdownClick}>
                    Thank-You Slip <i className="fa fa-chevron-down" aria-hidden="true">   </i>
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
                    Account Settings <i className="fa fa-chevron-down" aria-hidden="true">   </i>
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
              <a href="www.google.com"><img src={facebook} alt="Facebook" /></a>
              <a href="www.google.com"><img src={instagram} alt="Instagram" /></a>
              <a href="www.google.com"><img src={linkedin} alt="LinkedIn" /></a>
            </div>
          </div>
        </aside>
        </div>
        <main className="main-content">
          <header className="header">
            {/* <button type="submit">Edit Profile</button> */}
            <nav>
              <div className="navbar-right">
                <img src={nakamu} alt="Profile Logo" className="profile-logo" />
              </div>
            </nav>
          </header>

          <div className="middle-space"></div>

          <div className="form-container">
            <h2>Add User</h2>
            <form id="useForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row1">
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="retype-password"
                  name="retypePassword"
                  placeholder="Retype Password"
                  value={formData.retypePassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="role-label">Role:</label> {/* Add this label */}
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Member"
                    checked={formData.role === 'Member'}
                    onChange={handleChange}
                  />
                  Member
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={formData.role === 'Admin'}
                    onChange={handleChange}
                  />
                  Admin
                </label>
              </div>
              <button type="submit" className="update-details">Add User</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddUser;