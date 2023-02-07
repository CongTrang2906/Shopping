import React from "react";
import { useState } from "react";
import { MdOutlineEast } from "react-icons/md";
import { MdOutlineWest } from "react-icons/md";
import "./Slider.scss";
const Slider = () => {
  const [currentSlide, setcurrentSlide] = useState(0);
  const data = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];
  const prevSlide = () => {
    // nếu điều kiện trước dấu ? trả về true thì sẽ trả về giá trị 2 còn false thì sẽ trả về giá trị (prev) => prev - 1
    setcurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlider = () => {
    setcurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };
  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <MdOutlineWest />
        </div>
        <div className="icon" onClick={nextSlider}>
          <MdOutlineEast />
        </div>
      </div>
    </div>
  );
};

export default Slider;
