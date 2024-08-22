import React,{useState} from 'react';
import './editprofile.css'; // Ensure this is correctly pointing to your CSS file
import white from './images/white.png';
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';
import linkedin from './images/linkedin.png';
import nakamu from './images/nakamu.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const EditProfile = () => {

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
    newEmail: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/update-email', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentEmail: formData.email,
        newEmail: formData.newEmail,
        firstName: formData.firstName,
        lastName: formData.lastName,
        occupation: formData.occupation,
      }),
    });
  
    if (response.ok) {
      alert('Details Updated Successfully.');
      // Handle success (e.g., show a success message)
    } else {
      alert('Error while updating!');
      // Handle error (e.g., show an error message)
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
          {/* <button href="#">Home</button> */}
          <nav>
            <div className="navbar-right">
              <img src={nakamu} alt="Profile Logo" className="profile-logo" />
            </div>
          </nav>
        </header>

        {/* Middle Space with Color Code 2865AA */}
        <div className="middle-space"></div>

        <div className="form-container">
          <div className="profile-photo-section">
            <img src={nakamu} alt="Profile Logo" className="profile-photo" />
            <button className="upload-photo-btn">Upload New Profile</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row1">
                <input
                  type="text"
                  id="lastName"
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
                placeholder="Current E-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="newemail"
                name="newEmail"  // Changed to "newEmail"
                placeholder="New E-mail"
                value={formData.newEmail}  // Ensure this matches the state
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="update-details">Update Details</button>
          </form>
        </div>
      </main>
    </div>
    </>
  );
};

export default EditProfile;
