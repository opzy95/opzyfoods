import React, { useState, useEffect } from "react";
import './About.css'
import { motion } from "framer-motion";


function About(){
    return(
        <div className="sec1">
    <motion.img className="about-img" src="./about-img.png" alt="" initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}/>
    <div className="about-text">
        <h1>About Us</h1>
        <p>
            At our restaurant, every meal is more than just food — it’s an experience. From the moment you take your first bite, you’ll taste the perfect blend of freshness, flavor, and quality that sets us apart. Our dishes are carefully prepared using the finest ingredients, ensuring every plate is rich, satisfying, and unforgettable.

Whether you’re craving something quick and delicious or a full, hearty meal, we have something to delight every taste bud. Our chefs are passionate about delivering meals that not only fill you up but leave you wanting more. Every recipe is crafted with care, bringing you the perfect balance of taste, aroma, and presentation.

But it’s not just about the food — it’s about the feeling. The warm atmosphere, friendly service, and consistent quality make every visit special. We believe good food brings people together, and we’re proud to be a place where great moments are shared.

So why wait? Treat yourself to something truly delicious today. Visit us, place your order, and experience the difference. Once you try our meals, you’ll understand why our customers keep coming back for more.


        </p>
    </div>
    </div>
    )
}
export default About