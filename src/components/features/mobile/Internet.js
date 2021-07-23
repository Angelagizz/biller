import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Internet.css";

const Internet = () => {
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
        <div className="token-harga">
          <div value="20.000" onClick={handleClick} className="harga-internet">
            <h5>GamesMAX Unlimited</h5>
            <p>
              1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
              Hari
            </p>
            <h6>Rp 50.000,00</h6>
          </div>
          <div value="50.000" onClick={handleClick} className="harga-internet">
            <h5>GamesMAX Unlimited</h5>
            <p>
              1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
              Hari
            </p>
            <h6>Rp 50.000,00</h6>
          </div>
          <div value="100.000" onClick={handleClick} className="harga-internet">
            <h5>GamesMAX Unlimited</h5>
            <p>
              1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
              Hari
            </p>
            <h6>Rp 50.000,00</h6>
          </div>
          <div value="200.000" onClick={handleClick} className="harga-internet">
            <h5>GamesMAX Unlimited</h5>
            <p>
              1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
              Hari
            </p>
            <h6>Rp 50.000,00</h6>
          </div>
          <div value="500.000" onClick={handleClick} className="harga-internet">
            <h5>GamesMAX Unlimited</h5>
            <p>
              1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
              Hari
            </p>
            <h6>Rp 50.000,00</h6>
          </div>
          <div
            value="1.000.000"
            onClick={handleClick}
            className="harga-internet"
          >
            <h5>GamesMAX Unlimited</h5>
            <p>
              1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
              Hari
            </p>
            <h6>Rp 50.000,00</h6>
          </div>
        </div>
      </div>
      <div className="btn-wrapper">
        {phoneNumber !== "" && harga !== "" ? (
          <Link className="link" to={"internet/receipt"}>
            <div className="confirm-btn">Confirm</div>
          </Link>
        ) : (
          <div className="disable-btn">Confirm</div>
        )}
      </div>
    </div>
  );
};

export default Internet;
