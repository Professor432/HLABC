import React from 'react';
import './OneToOneAdd.css'; // Ensure this is correctly pointing to your CSS file
import white from './images/white.png';
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';
import linkedin from './images/linkedin.png';
import nakamu from './images/nakamu.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const OneToOneAdd = () => {

  const handleDropdownClick = (e) => {
    e.currentTarget.classList.toggle('active');
    const dropdownContent = e.currentTarget.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      date: formData.get('date'),
      metWith: formData.get('met-with'),
      invitedBy: formData.get('invited-by'),
      location: formData.get('location'),
      topic: formData.get('topic'),
      userId: localStorage.getItem('userId') // Include user _id from localStorage
    };
    console.log('Submitting data:', data);

    try {
      const response = await fetch('http://localhost:5000/api/onetoone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Response from server:', result);
      if (response.ok) {
        alert('One-to-One slip added successfully');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
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
        {/* Left Sidebar (Dashboard) */}
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
                  One-To-One <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="dropdown-container">
                  <Link to="/OneToOneAdd">Add Slip</Link>
                  <br />
                  <Link to="/OneToOneReview">Review Slip</Link>
                </div>
              </li>
              <li>
                <button className="dropdown-btn" onClick={handleDropdownClick}>
                  Referral <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="dropdown-container">
                  <Link to="/AddReferral">Add Slip</Link>
                  <br />
                  <Link to="/ReferralGiven">Referral Given Slip</Link>
                  <br />
                  <Link to="/ReferralReceived">Referral Received Slip</Link>
                </div>
              </li>
              <li>
                <button className="dropdown-btn" onClick={handleDropdownClick}>
                  Fees <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="dropdown-container">
                  <Link to="/FeesAdd">Add Slip</Link>
                  <br />
                  <Link to="/FeesReview">Review Slip</Link>
                </div>
              </li>
              <li>
                <button className="dropdown-btn" onClick={handleDropdownClick}>
                  Thank-You Slip <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="dropdown-container">
                  <Link to="/ThankYouAdd">Add Slip</Link>
                  <br />
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
                  Account Settings <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="dropdown-container">
                  <Link to="/editprofile">Edit Profile</Link>
                  <br />
                  <Link to="/changepass">Change Password</Link>
                  <br />
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

        {/* Main Content */}
        <main className="main-content">
          {/* Top Header */}
          <header className="header">
            <nav>
              <div className="navbar-right">
                <img src={nakamu} alt="Profile Logo" className="profile-logo" />
              </div>
            </nav>
          </header>

          {/* Middle Space with Color Code 2865AA */}
          <div className="middle-space"></div>

          <div className="form-container">
            <h2>One-To-One</h2>
            <form id="userForm" onSubmit={handleSubmit}>
              <div className="form-group1">
                <input type="date" id="date" name="date" placeholder="Date" required />
              </div>
              <div className="form-group1">
                <input type="text" id="met-with" name="met-with" placeholder="Met With" required />
              </div>
              <div className="form-group1">
                <input type="text" id="invited-by" name="invited-by" placeholder="Invited By" required />
              </div>
              <div className="form-group1">
                <input type="text" id="location" name="location" placeholder="Location" required />
              </div>
              <div className="form-group1">
                <input type="text" id="topic" name="topic" placeholder="Topic" required />
              </div>
              <button type="submit" className="update-details1">Add Slip</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default OneToOneAdd;
