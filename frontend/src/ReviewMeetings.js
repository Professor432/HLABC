import React, { useState, useEffect } from 'react';
import './ReviewMeetings.css'; // Ensure this is correctly pointing to your CSS file
import white from './images/white.png';
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';
import linkedin from './images/linkedin.png';
import nakamu from './images/nakamu.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ReviewMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({});

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

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/meetings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setMeetings(data);
        // Initialize attendance state
        const initialAttendance = {};
        data.forEach(meeting => {
          initialAttendance[meeting._id] = {};
          users.forEach(user => {
            initialAttendance[meeting._id][user._id] = false; // Default all to false (absent)
          });
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers().then(() => {
      fetchMeetings();
    });
  }, [users]);  

  const handleAttendanceChange = (meetingId, userId, attended) => {
    setAttendance(prev => ({
      ...prev,
      [meetingId]: {
        ...prev[meetingId],
        [userId]: attended
      }
    }));
  };

  const handleUpdate = async () => {
    const updates = Object.keys(attendance).map(meetingId => {
      return {
        meetingId,
        attendees: Object.keys(attendance[meetingId]).map(userId => ({
          userId,
          attended: attendance[meetingId][userId]
        }))
      };
    });

    try {
      const response = await fetch('http://localhost:5000/api/meetings/attendance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        alert('Attendance updated successfully');
        // Optionally, re-fetch meetings or update state
      } else {
        alert('Error updating attendance');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
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
          <header className="header">
            <nav>
              <div className="navbar-right">
                <img src={nakamu} alt="Profile Logo" className="profile-logo" />
              </div>
            </nav>
          </header>

          <div className="middle-space"></div>

          <div className="review-meetings">
            <h2>Review Meetings</h2>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  {meetings.map((meeting, index) => (
                    <th key={index}>{meeting.date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.firstName} {user.lastName}</td>
                    {meetings.map((meeting) => (
                      <td key={meeting._id}>
                        <input
                          type="checkbox"
                          checked={attendance[meeting._id]?.[user._id] || false}
                          onChange={(e) => handleAttendanceChange(meeting._id, user._id, e.target.checked)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleUpdate} style={{margin: '25px 0 0 0'}}>Update</button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ReviewMeetings;
