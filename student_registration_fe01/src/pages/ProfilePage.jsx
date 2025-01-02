import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState(null); // Holds the fetched profile data
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fetch the profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/students/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data.data;

        // Format the date fields for the form
        if (data.years_of_study_start) {
          data.years_of_study_start = formatDate(data.years_of_study_start);
        }
        if (data.years_of_study_end) {
          data.years_of_study_end = formatDate(data.years_of_study_end);
        }
        setFormData(data); // Update state with fetched data
        console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        alert("Error fetching profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save action
  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:8080/students/update",
        {
          name: formData.name,
          qualification: formData.qualification,
          grade: formData.grade,
          years_of_study_start: formData.years_of_study_start,
          years_of_study_end: formData.years_of_study_end,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  // If data is still loading
  if (!formData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Student Profile</h1>
      <form className="profile-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>University:</label>
          <input
            type="text"
            name="university"
            value={formData.university || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Grade:</label>
          <input
            type="text"
            name="grade"
            value={formData.grade || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Years of Study Start:</label>
          <input
            type="date"
            name="years_of_study_start"
            value={formData.years_of_study_start || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Years of Study End:</label>
          <input
            type="date"
            name="years_of_study_end"
            value={formData.years_of_study_end || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Registration ID:</label>
          <input
            type="text"
            name="registrationId"
            value={formData.registrationId || ""}
            disabled
          />
        </div>

        <div className="form-actions">
          {!isEditing ? (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button type="button" className="save-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
