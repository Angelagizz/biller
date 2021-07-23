import React, { useState } from "react";
import "./Mobile.css";
import Pulsa from "./Pulsa";
import Internet from "./Internet";
import Postpaid from "./Postpaid";

const Mobile = () => {
  const [tipePln, setTipePln] = useState("");

  const handleClick = (e) => {
    setTipePln(e.target.value);
  };

  return (
    <div className="containerku">
      <div>
        <div className="mobile-option">
          <h3>Service Type</h3>
          <div className="rowku">
            <div className="opsi">
              <input
                type="radio"
                name="mobile"
                onClick={handleClick}
                value="pulsa"
              />
              Pulsa
            </div>
            <div className="opsi">
              <input
                type="radio"
                name="mobile"
                onClick={handleClick}
                value="internet"
              />
              Internet
            </div>
            <div className="opsi">
              <input
                type="radio"
                name="mobile"
                onClick={handleClick}
                value="postpaid"
              />
              Postpaid
            </div>
          </div>
        </div>
        {tipePln === "pulsa" ? (
          <Pulsa />
        ) : tipePln === "internet" ? (
          <Internet />
        ) : tipePln === "postpaid" ? (
          <Postpaid />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Mobile;
