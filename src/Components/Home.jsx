import React from 'react';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import "./CSS/Home.css"

function Home() {
  return (
<>
<div  id="home" className="home-container">
    
    
    <div className="home-banner-container">
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
   
      <div className="home-text-section">
        <h1 className="primary-heading">
        Explore endless recipes, tailored just for you
        </h1>
        <p className="primary-text">
        Discover recipes with what's in your pantry and fridge. Easy cooking made deliciously simple!"
        </p>
        
      </div>
      <div className="home-image-section">
        <img  className="home-img"src={BannerImage} alt="" />
       
       
      </div>
     
    </div>
  
  
    <div className="dod-img"> 
    
    
   
   
    </div>
    
   </div>
</>  )
}

export default Home