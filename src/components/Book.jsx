import React from "react";
import "./Book.css";

function Book() {
  return (
    <div className="sec3">

      <form>
      <h1>Book a Table</h1>
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="Phone Number" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="How many Persons" />
        <input type="date" />
        <button className="btn" type="submit">Book Now</button>
      </form>
    <img src="./src/assets/product-img/about-img.png" alt=""/>
    </div>
  );
}

export default Book;