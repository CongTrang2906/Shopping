import React from "react";
import "./Contact.scss";
import { AiFillFacebook } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsPinterest } from "react-icons/bs";
const Contact = () => {
  return (
    <div className="contact">
      <div className="wrapper">
        <span>BE IN TOUCH WITH US;</span>
        <div className="mail">
          <input type="text" placeholder="Enter your e-mail..." />
          <button>JOIN US</button>
        </div>
        <div className="icons">
          <AiFillFacebook />
          <BsInstagram />
          <AiOutlineTwitter />
          <FcGoogle />
          <BsPinterest />
        </div>
      </div>
    </div>
  );
};

export default Contact;
