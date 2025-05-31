import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "../assets/loader.gif";
import "./loading.css";

function Loading() {
    const navigate = useNavigate();

    useEffect(()=> {

        const timer = setTimeout(()=> {
            navigate("/ticket");
        }, 5000);

        return () => clearTimeout(timer);
    },[navigate]);
    
  return (
    <div>
    <div className="loading-container">
      <h2>Generating Your Ticket...</h2>
      <img src={Loader} alt="Loading..." className="loading-img" />
      <p>Please wait while we process your request.</p>
    </div>
    </div>
  )
}

export default Loading