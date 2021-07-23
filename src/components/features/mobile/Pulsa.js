import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Pulsa.css";
import $ from "jquery";

const Pulsa = () => {
  const [phoneNumber, setphoneNumber] = useState("");
  const [harga, setHarga] = useState("");

  const handleClick = (e) => {
    setHarga(e.target.value);
  };

  const handleChange = (e) => {
    setphoneNumber(e.target.value);
  };

  return (
    <div className="wrapper">
      <div className="frame">
        <div className="input-token">
          <form>
            <label>Phone Number</label>
            <input
              value={phoneNumber}
              onChange={handleChange}
              type="number"
              placeholder="E.g 141234567890"
            />
          </form>
        </div>
        <div className="pulsa-harga">
          <div value="20.000" onClick={handleClick} className="harga">
            <p>Rp.20.000</p>
          </div>
          <div value="50.000" onClick={handleClick} className="harga">
            <p>Rp.50.000</p>
          </div>
          <div value="100.000" onClick={handleClick} className="harga">
            <p>Rp.100.000</p>
          </div>
          <div value="200.000" onClick={handleClick} className="harga">
            <p>Rp.200.000</p>
          </div>
          <div value="500.000" onClick={handleClick} className="harga">
            <p>Rp.500.000</p>
          </div>
          <div value="1.000.000" onClick={handleClick} className="harga">
            <p>Rp.1.000.000</p>
          </div>
          <div value="5.000.000" onClick={handleClick} className="harga">
            <p>Rp.5.000.000</p>
          </div>
          <div value="10.000.000" onClick={handleClick} className="harga">
            <p>Rp.10.000.000</p>
          </div>
          <div value="50.000.000" onClick={handleClick} className="harga">
            <p>Rp.50.000.000</p>
          </div>
        </div>
      </div>
      <div className="btn-wrapper">
        {phoneNumber !== "" && harga !== "" ? (
          <Link className="link" to={"pulsa/receipt"}>
            <div className="confirm-btn">Confirm</div>
          </Link>
        ) : (
          <div className="disable-btn">Confirm</div>
        )}
      </div>
    </div>
  );
};

export default Pulsa;
