import React from "react";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer row">
        <div className="col-6 col-md-3 mt-3 buttons">
          <button><a href="https://github.com/abhishekpawan/Expense_Tracker" target="_blank">Github Repo.</a></button>
        </div>
        <div className="col-6 col-md-3 d-flex mt-3 d-md-none buttons">
          <button><a href="https://abhishekpawan.me" target="_blank">My Website</a></button>
        </div>
        <div className="col-12 col-md-6">
          <div className="row myicons">
            <div className="findme col-12">Find me here: </div>
            <div className="col-12 socialIcons">
                <a href="https://twitter.com/non_altruistic" target="_blank" ><i><BsTwitter/></i></a>
                <a href="https://www.facebook.com/iAbhishekPawan/" target="_blank"><i><BsFacebook/></i></a>
                <a href="https://instagram.com/_.abhishekpawan._" target="_blank"><i><BsInstagram/></i></a>
                <a href="https://github.com/abhishekpawan" target="_blank"><i><BsGithub/></i></a>
                <a href="https://www.linkedin.com/in/abhishekpawan/" target="_blank"><i><BsLinkedin/></i></a>
            </div>
            <div className="created col-12">
              Created by <span> Abhishek Pawan</span>
            </div>
          </div>
        </div>
        <div className="col-3 d-none d-md-flex buttons">
          <button><a href="https://abhishekpawan.me" target="_blank">My Website</a></button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
