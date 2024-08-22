import React, { useState, useEffect } from 'react';
import './OneToOneReview.css';
import white from './images/white.png';
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';
import linkedin from './images/linkedin.png';
import nakamu from './images/nakamu.png';
import sortIcon from './images/sort.png'; // Add sort icon
import { Link } from 'react-router-dom';

const OneToOneReview = () => {
  const [oneToOneData, setOneToOneData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

  useEffect(() => {
    // Fetch the initial data here
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/onetoone', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        // Filter data based on the logged-in user's ID
        const userId = localStorage.getItem('userId');
        const filteredData = data.filter(entry => entry.userId === userId);
        setOneToOneData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/onetoone?searchQuery=${searchQuery}`);
      const data = await response.json();
      // Filter search results based on the logged-in user's ID
      const userId = localStorage.getItem('userId');
      const filteredData = data.filter(entry => entry.userId === userId);
      setOneToOneData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (show error message, etc.)
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleDropdownClick = (e) => {
    e.currentTarget.classList.toggle('active');
    const dropdownContent = e.currentTarget.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  };

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const sortedData = [...oneToOneData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

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

        <main className="main-content">
          <header className="header">
            <nav>
              <div className="navbar-right">
                <img src={nakamu} alt="Profile Logo" className="profile-logo" />
              </div>
            </nav>
          </header>

          <div className="middle-space"></div>

          <div className="table-container">
            <h2>One-To-One Review</h2>
            <div className="search-container">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search by Met With or Invited By"
                  value={searchQuery}
                  onChange={handleChange}
                />
                <button type="submit">Search</button>
              </form>
            </div>

            <table>
              <thead>
                <tr>
                  <th onClick={() => sortData('date')}>
                    Date <img src={sortIcon} alt="Sort" />
                  </th>
                  <th onClick={() => sortData('metWith')}>
                    Met With <img src={sortIcon} alt="Sort" />
                  </th>
                  <th onClick={() => sortData('invitedBy')}>
                    Invited By <img src={sortIcon} alt="Sort" />
                  </th>
                  <th onClick={() => sortData('location')}>
                    Location <img src={sortIcon} alt="Sort" />
                  </th>
                  <th onClick={() => sortData('topic')}>
                    Topic <img src={sortIcon} alt="Sort" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.metWith}</td>
                    <td>{entry.invitedBy}</td>
                    <td>{entry.location}</td>
                    <td>{entry.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default OneToOneReview;
