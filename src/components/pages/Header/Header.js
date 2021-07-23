import React, { useEffect } from "react";
import imglogo from "../../assets/logobiller2.png";
import logo from "../../assets/logo-biller.png";
import electricity from "../../assets/electricity.png";
import bpjs from "../../assets/bpjs.png";
import internettv from "../../assets/internettv.png";
import pdam from "../../assets/pdam.png";
import landline from "../../assets/landline.png";
import mobile from "../../assets/mobile.png";
import bg from "../../assets/bg.jpg";
import { useHistory } from "react-router-dom";
import "./Header.css";
import Fade from "react-reveal/Fade";
import Footer from "../Footer/Footer";

const Header = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/biller/signup");
  };
  return (
    <>
      <section id="header" className="spacing-sm">
        <div className="container" id="nav">
          <Fade bottom>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
              <a className="navbar-brand" href="#">
                <img src={logo} alt="" className="img-fluid" />
              </a>
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="#content" className="nav-link px-2 ">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link px-2">
                    Payment Method
                  </a>
                </li>
              </ul>
              {/* <div className="col-md-3 text-end" id="button">
                <button type="button" className="btn btn-success">
                  <a href="#">Sign Up</a> */}
              <div className="col-md-3 text-end">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleClick}
                >
                  Sign Up
                </button>
              </div>
            </header>
          </Fade>
        </div>
      </section>

      <section id="hero" className="hero d-flex align-items-center">
        <div className="container">
          <div className="row" id="jumbotron" style={{ width: "360" }}>
            <Fade right delay={300}>
              <div className="jumbotron jumbotron-fluid">
                <h1 className="display-6">Easily manage your bill</h1>
                <p>All your bills at a glance, always up to date</p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      <section id="content">
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-lg-8 mx-auto">
              <p class="lead mb-0">Pay all your bills in one place</p>
            </div>
          </div>
        </div>
        <div id="card">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-xl-3  col-lg-3 col-sm-4 mb-5 col-6">
                <div className="rounded shadow-sm py-5 px-4" id="cobain">
                  <a href="#">
                    <img
                      src={electricity}
                      alt="listrik"
                      className="img-fluid mb-3"
                    />
                    <h5 className="lead">Electricity</h5>
                  </a>
                </div>
              </div>
              <div className="col-xl-3  col-lg-3 col-sm-4 mb-5 col-6">
                <div className="rounded shadow-sm py-5 px-4" id="cobain">
                  <a href="#">
                    <img src={mobile} />
                    <h5 className="lead">Mobile</h5>
                  </a>
                </div>
              </div>
              <div className="col-xl-3  col-lg-3 col-sm-4 mb-5 col-6">
                <div className="rounded shadow-sm py-5 px-4" id="cobain">
                  <a href="#">
                    <img src={internettv} />
                    <h5 className="lead">Internet & TV</h5>
                  </a>
                </div>
              </div>
            </div>

            <div className="row justify-content-center text-center">
              <div className="col-xl-3  col-lg-3 col-sm-4 mb-5 col-6">
                <div className="rounded shadow-sm py-5 px-4" id="cobain">
                  <a href="#">
                    <img src={landline} />
                    <h5 className="lead">Landline</h5>
                  </a>
                </div>
              </div>
              <div className="col-xl-3  col-lg-3 col-sm-4 mb-5 col-6">
                <div className="rounded shadow-sm py-5 px-4" id="cobain">
                  <a href="#">
                    <img src={bpjs} />
                    <h5 class="lead">BPJS</h5>
                  </a>
                </div>
              </div>
              <div className="col-xl-3  col-lg-3 col-sm-4 mb-5 col-6">
                <div className="rounded shadow-sm py-5 px-4" id="cobain">
                  <a href="#">
                    <img src={pdam} />
                    <h5 className="lead">PDAM</h5>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hero2">
        <Fade right delay={300}>
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-sm-6" id="her2">
                <h1 className="display-6">Take back your time!</h1>
                <p>
                  Bill pay takes only seconds. You can schedule it on <br />{" "}
                  weeks, or months out to plan ahead.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </section>
      <Footer />
    </>
  );
};
export default Header;
