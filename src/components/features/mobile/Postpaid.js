import React from "react";
import { Link } from "react-router-dom";
import "./Internet.css";

const Postpaid = () => {
  return (
    <div className="wrapper">
      <div className="frame">
        <div className="input-token">
          <form>
            <label>Phone Number</label>
            <input type="number" placeholder="E.g 141234567890" />
          </form>
        </div>
      </div>
      <div className="btn-wrapper">
        <Link className="link" to={"postpaid/receipt"}>
          <div className="confirm-btn">Confirm</div>
        </Link>
      </div>
    </div>
  );
};

export default Postpaid;
