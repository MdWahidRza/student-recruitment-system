import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
import logo from "../assets/topnav-logo.png";
import profileIcon from "../assets/profile-icon.png";
import { FaBars } from "react-icons/fa";
const DashboardPage = () => {
  const location = useLocation();
  const student = location.state?.student; // Access student data
  const [menuOpen, setMenuOpen] = useState(false);
  if (!student) {
    return <p>Error: No student data received. Please log in again.</p>;
  }

  return (
    <>
      {/* <navclassName="navbar">
        <div className="navbar-logo-container">
          <a className="active" href="/home">
            <img src={logo} alt="G10X_Logo" className="g10x-logo" />
          </a>
        </div>
        <div className="navbar-links-container">
          <a className="" href="/home">
            Home
          </a>
          <a className="" href="/explore">
            Explore G10X
          </a>
          <a className="" href="/services">
            Services
          </a>
          <a className="" href="/products">
            Products
          </a>
          <a className="" href="/career">
            Careers
          </a>
          <a className="" href="/news-and-events">
            News &amp; Events
          </a>
          <a className="" href="/blogs">
            Blogs
          </a>
        </div>
        <div>
          <a href="/get-in-touch">
            <button className="navbar-button-container">Logout</button>
          </a>
        </div>
      </nav> */}
      <nav>
        {/* Hamburger Menu */}
        <label
          htmlFor="check"
          className="checkbtn"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FaBars />
        </label>

        {/* Logo */}
        <label className="logo">
          <img src={logo} alt="Logo" className="nav-logo" />
        </label>

        {/* Navigation Links */}
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <a className="active" href="/home">
              Home
            </a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>
      <main className="dashboard-main">
        <h1>Welcome to the Hiring Process</h1>
        <div className="profile-container">
          <div className="profile-image">
            <img src={profileIcon} alt="" className="nav_photo" />
          </div>
          <div className="profile-name">{student.name}</div>
          <div className="user-email">{student.email}</div>
          <div className="registration-id">{student.registrationId}</div>
        </div>
        <div className="separator"></div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Activity</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Candidate Registration</th>
              <td>Registered</td>
              <td>01/01/2025 00:00</td>
            </tr>
            <tr>
              <th scope="row">Application Received</th>
              <td>Application Received</td>
              <td>01/01/2025 10:00</td>
            </tr>
            <tr>
              <th scope="row">Applied for Drive</th>
              <td>Applied for Drive</td>
              <td>01/01/2025 12:00</td>
            </tr>
            <tr>
              <th scope="row">Candidate Batched</th>
              <td>Batched</td>
              <td>01/01/2025 14:00</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default DashboardPage;
