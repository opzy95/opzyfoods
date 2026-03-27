import React, { useState, useEffect } from "react";
import "./Hero.css";

function Hero() {
  const texts = [
    "Where Quality Meets Taste 👨‍🍳 Crafted for True Food Lovers 🍽️ Not Just Food — It’s an Experience ✨",
    "Craving Something Delicious? We’ve Got You 😍 Every Bite Tells a Story 🍔 Happiness is Just One Order Away 😊",
    "Fast Food, Faster Satisfaction ,Hot, Fresh, Delivered Fast 🔥.Taste That Keeps You Coming Back 😋",
    "Order Now & Get It Fresh in Minutes ⏱️ Big Flavor. Small Price 💸 Your Favorite Meals, Anytime 🍕"
  ];

  const [index, setIndex] = useState(0);

  // change text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="hero">
      <img src="./src/assets/product-img/hero.jpg" alt="" />

      <div className="hero-text">
        <h1 className="fade">{texts[index]}</h1>
      </div>
    </div>
  );
}

export default Hero;