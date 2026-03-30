import React, { useState, useEffect } from "react";
import "./Hero.css";


function Hero() {
  const texts = [
    "Where Quality Meets Taste 👨‍🍳 Crafted for True Food Lovers 🍽️ Not Just Food — It’s an Experience ✨",
    "Craving Something Delicious? We’ve Got You 😍 Every Bite Tells a Story 🍔 Happiness is Just One Order Away 😊",
    "Fast Food, Faster Satisfaction ,Hot, Fresh, Delivered Fast 🔥.Taste That Keeps You Coming Back 😋",
    "Order Now & Get It Fresh in Minutes ⏱️ Big Flavor. Small Price 💸 Your Favorite Meals, Anytime 🍕",
  ];

  const [index, setIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="hero">
      <img
        src="/hero.jpg"
        alt=""
        
      />

      <div className="hero-text">
        <h1 className="sentence">
          {texts[index].split(" ").map((word, i) => (
            <span
              key={i}
              className="word"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default Hero;
