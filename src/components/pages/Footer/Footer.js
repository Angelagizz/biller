import React from "react";
import imglogo from "../../assets/logobiller2.png";
import logo from "../../assets/logo-biller.png";
import "./style.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container-fluid" id="container">
          <div className="container text-md-left mt-5">
            <div className="row">
              <div className="col-md-3 x-auto mb-4">
                <h4>Bill Category</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Internet</a>
                  </li>
                  <li>
                    <a href="#">Landline</a>
                  </li>
                  <li>
                    <a href="#">Internet & TV</a>
                  </li>
                  <li>
                    <a href="#">PDAM</a>
                  </li>
                  <li>
                    <a href="#">BPJS</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 x-auto mb-4">
                <h4>Company</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 x-auto mb-4">
                <h4>Support</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 x-auto mb-4">
                <img src={imglogo} alt="" />
              </div>
            </div>
          </div>
        </div>
        <footer id="sticky-footer" className=" mt-auto py-3 text-white ">
          <div className="container ">
            <small> &copy;Copyright 2021. All right reserved </small>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
