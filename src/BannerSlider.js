// BannerSlider.js
import React, { useEffect, useState } from "react";
import "./BannerSlider.css";

const banners = [
  "/images/banner2.png",
  "/images/banner3.png",
  "/images/bbanner4.png",
];

function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner_slider">
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner}
          alt={`Banner ${index + 1}`}
          className={`banner_image ${index === currentIndex ? "active" : ""}`}
        />
      ))}
    </div>
  );
}

export default BannerSlider;
