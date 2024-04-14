import React from 'react'
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import "./CSS/About.css"

function About() {
  return (
<>
<div id="about" className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Unlock Flavorful Adventures with Flavor Finder
        </h1>
        <p className="primary-text">
        Welcome to Flavor Finder, we're passionate about bringing delicious recipes right to your fingertips. Whether you're a seasoned chef or a kitchen novice, our user-friendly platform makes it easy to discover, create, and save your favorite dishes.
        </p>
      </div>
      

    </div>
</>  )
}

export default About