import React, { useState } from "react";
import electricityicon from "../../assets/electricitybill.png";
import mobileicon from "../../assets/mobilebill.png";
import interneticon from "../../assets/internetbill.png";
import landlineicon from "../../assets/landlinebill.png";
import bpjsicon from "../../assets/bpjsbill.png";
import pdamicon from "../../assets/pdambill.png";
import "../newbill/Newbill.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Category from "./Category";
import { Link } from "react-router-dom";
import Header2 from "../../pages/Header/Header2";
import $ from "jquery";

const Newbill = () => {
  const [service, setService] = useState();
  //jquery
  $(document).ready(function () {
    $(".bills-category").on("click", ".bill-card", function () {
      $(".bill-card").removeClass("selected");
      $(this).addClass("selected");
    });
  });

  return (
    <div className="header_newbill">
      <Header2 />
      <div className='dashboard-background'/>
      <div className="containerku">
        <div className="new-bill">
          <div className="arrow-icon">
            <Link to={"/dashboard"}>
              <ArrowBackIcon />
            </Link>
            <div className="gray">New bill</div>
            <div className="bold1">Select Category</div>
          </div>
          <div className="bills-category">
            <div
              className="bill-card"
              onClick={() => setService("electricity")}
            >
              <div className="content">
                <img src={electricityicon} alt="icon" />
                <h4>Electricity</h4>
              </div>
            </div>
            <div className="bill-card" onClick={() => setService("mobile")}>
              <div className="content">
                <img src={mobileicon} alt="icon" />
                <h4>Mobile</h4>
              </div>
            </div>
            <div className="bill-card" onClick={() => setService("internettv")}>
              <div className="content">
                <img src={interneticon} alt="icon" />
                <h4>Internet & TV</h4>
              </div>
            </div>
            <div className="bill-card" onClick={() => setService("landline")}>
              <div className="content">
                <img src={landlineicon} alt="icon" />
                <h4>Landline</h4>
              </div>
            </div>
            <div className="bill-card" onClick={() => setService("bpjs")}>
              <div className="content">
                <img src={bpjsicon} alt="icon" />
                <h4>BPJS</h4>
              </div>
            </div>
            <div className="bill-card" onClick={() => setService("pdam")}>
              <div className="content">
                <img src={pdamicon} alt="icon" />
                <h4>PDAM</h4>
              </div>
            </div>
          </div>
          <Category service={service} />
        </div>
      </div>
    </div>
  );
};

export default Newbill;
