import React, { useState } from "react";
import "../../features/mobile/Mobile.css";


const SubsMobile = () => {
    const [phoneNumberPulsa, setphoneNumberPulsa] = useState("");
    const [hargaPulsa, setHargaPulsa] = useState("");
    const [tipePln, setTipePln] = useState("");
    const [phoneNumberInternet, setphoneNumberInternet] = useState("");
    const [hargaInternet, setHargaInternet] = useState("");
  
    const handleClickPulsa = (e) => {
      setHargaPulsa(e.target.value);
    };
  
    const handleChangePulsa = (e) => {
      setphoneNumberPulsa(e.target.value);
    };

    const handleClickInternet = (e) => {
        setHargaInternet(e.target.value);
    };

    const handleChangeInternet = (e) => {
        setphoneNumberInternet(e.target.value);
    };

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
            <div className="wrapper">
              <div className="frame">
                <div className="input-token">
                  <form>
                    <label>Phone Number</label>
                    <input
                      value={phoneNumberPulsa}
                      onChange={handleChangePulsa}
                      type="number"
                      placeholder="E.g 141234567890"
                    />
                  </form>
                </div>
                <div className="pulsa-harga">
                  <div value="20.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.20.000</p>
                  </div>
                  <div value="50.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.50.000</p>
                  </div>
                  <div value="100.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.100.000</p>
                  </div>
                  <div value="200.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.200.000</p>
                  </div>
                  <div value="500.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.500.000</p>
                  </div>
                  <div value="1.000.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.1.000.000</p>
                  </div>
                  <div value="5.000.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.5.000.000</p>
                  </div>
                  <div value="10.000.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.10.000.000</p>
                  </div>
                  <div value="50.000.000" onClick={handleClickPulsa} className="harga">
                    <p>Rp.50.000.000</p>
                  </div>
                </div>
              </div>
              <div className="btn-wrapper">
                {phoneNumberPulsa !== "" && hargaPulsa !== "" ? (
                    <div className="confirm-btn">Confirm</div>
                ) : (
                  <div className="disable-btn">Confirm</div>
                )}
              </div>
            </div>
        ) : tipePln === "internet" ? (
            <div className="wrapper">
            <div className="frame">
              <div className="input-token">
                <form>
                  <label>Phone Number</label>
                  <input
                    value={phoneNumberInternet}
                    onChange={handleChangeInternet}
                    type="number"
                    placeholder="E.g 141234567890"
                  />
                </form>
              </div>
              <div className="token-harga">
                <div value="20.000" onClick={handleClickInternet} className="harga-internet">
                  <h5>GamesMAX Unlimited</h5>
                  <p>
                    1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
                    Hari
                  </p>
                  <h6>Rp 50.000,00</h6>
                </div>
                <div value="50.000" onClick={handleClickInternet} className="harga-internet">
                  <h5>GamesMAX Unlimited</h5>
                  <p>
                    1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
                    Hari
                  </p>
                  <h6>Rp 50.000,00</h6>
                </div>
                <div value="100.000" onClick={handleClickInternet} className="harga-internet">
                  <h5>GamesMAX Unlimited</h5>
                  <p>
                    1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
                    Hari
                  </p>
                  <h6>Rp 50.000,00</h6>
                </div>
                <div value="200.000" onClick={handleClickInternet} className="harga-internet">
                  <h5>GamesMAX Unlimited</h5>
                  <p>
                    1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
                    Hari
                  </p>
                  <h6>Rp 50.000,00</h6>
                </div>
                <div value="500.000" onClick={handleClickInternet} className="harga-internet">
                  <h5>GamesMAX Unlimited</h5>
                  <p>
                    1 GB Kuota All Net + 30 GB Games + 0.5 GB Youtube. Masa aktif 30
                    Hari
                  </p>
                  <h6>Rp 50.000,00</h6>
                </div>
                <div
                  value="1.000.000"
                  onClick={handleClickInternet}
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
              {phoneNumberInternet !== "" && hargaInternet !== "" ? (
                  <div className="confirm-btn">Confirm</div>
              ) : (
                <div className="disable-btn">Confirm</div>
              )}
            </div>
          </div>
        ) : tipePln === "postpaid" ? (
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
                    <div className="confirm-btn">Confirm</div>
                </div>
            </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SubsMobile;
