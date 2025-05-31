import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo-full.svg";
import ImageInput from "../assets/icon-upload.svg";
import uploadImg from "../assets/icon-info.svg";
import dashImage from "../assets/pattern-squiggly-line-bottom-desktop.svg";
import loader from "../assets/loader.gif";
import "./dashboard.css";
import "./loading.css";

const INPUT_FIELDS = [
  { label: "Full Name", type: "text", key: "fullName" },
  { label: "Email Address", type: "email", key: "email" },
  { label: "Github Username", type: "text", key: "github" },
];

function Dashboard() {
  const [formData, setFormData] = useState({ fullName: "", email: "", github: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateFields = () => {
    const { fullName, email, github } = formData;
    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const githubExp = /^[a-zA-Z0-9-]{1,39}$/;

    if (!fullName || !email || !github || !image) {
      return "All fields are required and image must be uploaded";
    }
    if (!emailExp.test(email)) return "Please enter a valid email address";
    if (!githubExp.test(github)) return "Please enter a valid GitHub username (no special characters)";

    return null;
  };

  const processFile = (file) => {
    if (file && file.size <= 500 * 1024 && ["image/jpeg", "image/png"].includes(file.type)) {
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setError("Invalid file. Please upload JPEG or PNG under 500KB");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleImageChange = (e) => processFile(e.target.files[0]);

  const handleGenerateTicket = () => {
    const errorMsg = validateFields();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    localStorage.setItem("formData", JSON.stringify({ ...formData, image }));
    setIsLoading(true);
    setTimeout(() => navigate("/loading"), 500);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrap-cont">
        <div className="dashboard">
          <img src={logoImg} alt="coding curf" />
        </div>
        <div className="dashboard-text">
          <h1>Your Journey to Start Coding Conf</h1>
          <h1>2025 Start Here!</h1>
          <p>Secure your spot at next year's biggest coding conference</p>
        </div>

        <div className="dashboard-input-wrap">
          <div className="dashboard-input">
            <p className="dash-text">Upload Avatar</p>
            <div
              className={`upload-box ${isDragging ? "dragging" : ""}`}
              onClick={() => document.getElementById("file-input").click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {image ? <img src={image} alt="Avatar" className="dashboard-input-img" /> : <img src={ImageInput} alt="Upload Icon" className="dashboard-input-img" />}
              {image && (
                <div className="upload-options">
                  <div className="remove-img-option img-option" onClick={(e) => { e.stopPropagation(); setImage(null); }}>
                    <p>Remove Image</p>
                  </div>
                </div>
              )}
              {!image && <span className="dash-label-text">Drag and drop or click to upload</span>}
            </div>
            <div className="dash-upload">
              <img src={uploadImg} alt="upload info" />
              {error ? <p className="error-message">{error}</p> : <span>Upload JPEG or PNG (max-size: 500KB)</span>}
            </div>
            <input type="file" id="file-input" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          <div className="dashboard-user-details-container">
            {INPUT_FIELDS.map(({ label, type, key }) => (
              <React.Fragment key={key}>
                <label><p>{label}</p></label>
                <input
                  type={type}
                  className="user-input"
                  value={formData[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                />
              </React.Fragment>
            ))}
          </div>

          <div className="dash-button">
            <button onClick={handleGenerateTicket} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate my ticket"}
            </button>
          </div>
        </div>

        <div className="dash-background-img">
          <img src={dashImage} alt="background" />
        </div>
      </div>

      {isLoading && (
        <div className="loading-container">
          <img src={loader} alt="Loading..." />
          <p>Generating your ticket, please wait....</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

