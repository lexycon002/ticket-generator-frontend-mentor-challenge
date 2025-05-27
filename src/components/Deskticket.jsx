import React from 'react'
import "./desktopticket.css";
import logoImg from "../assets/logo-full.svg";
import userImg from "../assets/image-avatar.jpg";
import GitIcon from "../assets/icon-github.svg";

function Deskticket() {

  const date = new Date();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options).replace(',', '');

  const formData = JSON.parse(localStorage.getItem("formData"));


  return (
    <div className="deskticket-container">
        <div className="logo">
          <img src={logoImg} alt="" />
        </div>
        <div className="deskticket-text">
          <h3>Congrats, <span>{formData?.fullName || "Guest"}!</span> Your ticket is ready.</h3>
          <p>We've emailed your ticket to <span>{formData?.email}</span> and will send updates in the run up to the event.</p>
        </div>

        <div className="desticket-info-cont">
          <div className="deskticket-pattern">
            <div className="deskticket-date">
              <img src={logoImg} alt="" />
              <p>{formattedDate} / Lagos, NG</p>
            </div>
            <div className="deskticket-info">
                <div className="deskticket-user-img">
                  <img src={formData?.image || userImg} alt="user-image" />
                </div>
                <div className="deskticket-user-info">
                  <p>{formData?.fullName || "Guest"}</p>
                  <span><img src={GitIcon} alt="Git-Icon"/>@{formData?.github}</span>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Deskticket