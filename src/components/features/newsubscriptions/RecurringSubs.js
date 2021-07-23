import React, { useState } from "react";
import "../electricity/TokenConfirmation.css";
import { Checkbox } from "@material-ui/core";
import iconsubs from "../../assets/landline.png";
import infoicon from "../../assets/info-icon.png";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Bulan from "../electricity/Bulan";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const RecurringSubs = () => {
  const history = useHistory();
  const tgl = useSelector((state) => state.recurring.date);
  const date = new Date();
  const bulan = date.getMonth();
  console.log("dfdsf", bulan);
  const thn = date.getFullYear();
  const landline = useSelector((state) => state.landline.infocust);
  const format = (data) => {
    let reverse = data.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

  const handleReturn = () => {
    history.push("/dashboard")
  }

  const handleClick = () => {
    history.push("/newSubscription")
  }
  
  return (
    <div className="containerku">
      <div className="space-between">
        <div onClick={handleClick}>
          <ArrowBack />
        </div>
        <div onClick={handleReturn}>Back to home</div>
      </div>
      <div className="gray" onClick={handleClick}>Select Bills</div>
      <div className="bold">New Subscription</div>
      <div className="dashboard-background"></div>
      <div className="tengah">
        <div className="bill-recurring">
          <div className="rowku">
            <div className="text">
              <div>
                <span>Recurring Billing</span>
              </div>
              <div>
                <p>
                  Create automatic billing for your next purchase.
                  <br />
                  Available in weekly, montly and yearly basis
                </p>
              </div>
            </div>
          </div>
          <div className="line-blue"></div>

          {landline.map((data) => (
            <>
              <div className="billcard">
                <div className="right">Billed every month at 12nd</div>
                <div className="row1">
                  <div className="row2">
                    <span>
                      <img src={iconsubs} alt="icon" />
                    </span>
                    <div className="column3">
                      <div>Landline</div>
                      <div>{data.No_Telephone}</div>
                    </div>
                  </div>
                  <div className="bold">{data.Total}</div>
                </div>
                <div className="total">
                  Total <span>Rp. {format(data.Total)}</span>
                </div>
                <div className="information">
                  <img src={infoicon} alt="icon" />
                  <div>
                    <p>
                      Next payment will due{" "}
                      <span>
                        {`${tgl} `}
                        <Bulan bulan={bulan + 2} />
                        {` ${thn}`}
                      </span>
                    </p>
                    <p>
                      Pay before {`${tgl} `}
                      <Bulan bulan={bulan + 2} />
                      {` ${thn}`}, 23:59 to avoid late payment fee
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecurringSubs;
