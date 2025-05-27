import React, { useState } from "react";
import "./dashboard.css";
import { IoIosClose } from "react-icons/io";
import logoImg from "../assets/logo-full.svg";
import ImageInput from "../assets/icon-upload.svg";
import uploadImg from "../assets/icon-info.svg";
import dashImage from "../assets/pattern-squiggly-line-bottom-desktop.svg";
import loader from "../assets/loader.gif";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const[showTicket, setShowTicket] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[github, setGithub] = useState("");

  const navigate = useNavigate()



  const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      processFile(file);
  }

  const handleDragOver = (e) => {
  e.preventDefault();
  setIsDragging(true);
};

const handleDragLeave = () => {
  setIsDragging(false);
};

const processFile = (file) => {
  if (file) {
    if (file.size > 500 * 1024) {
      setError("File too large. please upload a photo under 500KB");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  processFile(file);
};

  const handleCloseBtn = (e) => {
    e.stopPropagation();
    setImage(null);
  }

  const handleGenerateTicket = () => { 
    localStorage.setItem("formData", JSON.stringify({ fullName, email, github, image }));
        setTimeout(()=> {
          setIsLoading(true);
          navigate("/loading");
          setShowTicket(true);
        }, 500);
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrap-cont">
        <div className="dashboard">
          <img src={logoImg} alt="coding curf" />
        </div>
        <div className="dashboard-text">
        <div className="dashboard-wrap">
          <h1>Your Journey to Start Coding Conf</h1>
          <h1>2025 Start Here!</h1>
          <p>Secure your spot at next year's biggest coding conference</p>
        </div>
      </div>
      <div className="dashboard-input-wrap">
        <div className="dashboard-input">
          <p className="dash-text">Upload Avatar</p>
          <div className={`upload-box ${isDragging ? "dragging" : ""}`}
            onClick={() => document.getElementById("file-input").click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <img src={image} alt="Uploaded Avatar" className="dashboard-input-img" />
            ) : (
              <img src={ImageInput} alt="Upload Icon" className="dashboard-input-img"/>
            )}
            {image && (
              <div className="upload-options">
                  <div className="remove-img-option" onClick={handleCloseBtn}>
                    <p>Remove Image</p>
                  </div>
                  <div className="change-img-option">
                    <p>Change Image</p>
                  </div>
              </div>
            )}
            {!image && <span className="dash-label-text">Drag and drop or click to upload</span> }
          </div>
            <div className="dash-upload">
              <img src={uploadImg} alt="upload-image"  />
              {error ? (
                <p className="error-message">{error}</p> 
              ) : 
              <span>upload your photos (JPEG or PNG, max-size: 500KB)</span>
              }
            </div>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      <div className="dashboard-user-details-container">
        <label htmlFor=""><p>Full Name</p></label>
        <input type="text" 
        className="user-input"
        onChange={(e)=> setFullName(e.target.value)}
        />
        <label htmlFor=""><p>Email Address</p></label>
        <input type="email" 
        className="user-input"
        onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor=""><p>Github Username</p></label>
        <input type="text" 
        className="user-input"
        onChange={(e) => setGithub(e.target.value)}
        />
      </div>
      <div className="dash-button">
        <button onClick={handleGenerateTicket}>Generate my ticket</button>
      </div>
      </div>
      <div className="dash-background-img">
        <img src={dashImage} alt="dashboard background image" />
      </div>
      </div>
      {isLoading && 
        <div className="loading-container">
          <img src={loader} alt="loading..." />
          <p>Generating your ticket,please wait....</p>
    </div>
      }
        {showTicket && !isLoading && (
        <div className="ticket-container">
          <h2>Your Ticket</h2>
          {image && (
            <img src={image} alt="User Avatar" className="ticket-avatar" />
          )}
          <p><strong>Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>GitHub:</strong> {github}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
