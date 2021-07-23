import React from "react";
import token from "../../assets/icon-subs.png";
import frame from "../../assets/Frame-subs.png";
import { useHistory } from "react-router-dom";
import "./Subscription.css";
import Header2 from "../Header/Header2";

const Subscription = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/history");
  };
  const handleChange = () => {
    history.push("/newSubscription");
  };

  return (
    <div className="subscription">
      <Header2 />
      <div className="top_column">
        <div className="column1_sub">
          <div className="last-pay merah">
            Last payment date: <span>13 May 2021</span>
          </div>
          <h4>Billed every Monday</h4>
          <div className="content_column1">
            <div className="pertama">
              <span>
                <img src={token} alt="token"></img>
              </span>
              <div className="baris_satu">
                <h6>PLN -Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price">Rp.51.500</div>
            </div>
            <div className="pertama">
              <span>
                <img src={token} alt="token"></img>
              </span>
              <div className="baris_satu">
                <h6>PLN -Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price">Rp.51.500</div>
            </div>
          </div>
          <div className="pertama late-pay">
            <div>1 day late payment fee (0.5%)</div>
            <div className="price">Rp.5.150</div>
          </div>
          <div className="total_price">
            <p>Total</p>
            <div className="sub_price">Rp. 103.000</div>
          </div>
          <div className="button_pay" onClick={handleClick}>
            Pay
          </div>
        </div>
        <div className="column1_sub">
          <div className="lasted-pay biru">
            Last payment date: <span>20 May 2021</span>
          </div>
          <h4>Billed every Monday</h4>
          <div className="content_column1">
            <div className="pertama">
              <span>
                <img src={token} alt="token"></img>
              </span>
              <div className="baris_satu">
                <h6>PLN -Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price">Rp.51.500</div>
            </div>
            <div className="pertama">
              <span>
                <img src={token} alt="token"></img>
              </span>
              <div className="baris_satu">
                <h6>PLN -Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price">Rp.51.500</div>
            </div>
          </div>
          <div className="latepay_fee"></div>
          <div className="sum_price">
            <p>Total</p>
            <div className="sub_price">Rp. 103.000</div>
          </div>
          <div className="button_pay" onClick={handleClick}>
            Pay
          </div>
        </div>
      </div>
      <div className="top_column">
        <div className="column1_sub">
          <h4>Billed every month at 12nd</h4>
          <div className="content_column1">
            <div className="pertama">
              <span>
                <img src={token} alt="token"></img>
              </span>
              <div className="baris_satu">
                <h6>PLN -Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price">Rp.51.500</div>
            </div>
            <div className="pertama">
              <span>
                <img src={token} alt="token"></img>
              </span>
              <div className="baris_satu">
                <h6>PLN -Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price">Rp.51.500</div>
            </div>
          </div>

          <div className="total_price">
            <p>Total</p>
            <div className="sub_price">Rp. 103.000</div>
          </div>
          <div className="frame_subs">
            <img src={frame} alt="frame"></img>
          </div>
        </div>
        <div className="column1_sub">
          <h4>Billed every year at 14th February</h4>
          <div className="content_column1">
            <div className="pertama">
              <span>
                <img src={token} alt="token"></img>
              </span>
              <div className="baris_satu">
                <h6>PLN -Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price">Rp.51.500</div>
            </div>
            <div className="pertama">
              <span>
                <img src={token} alt="token"></img>
              </span>
              <div className="baris_satu">
                <h6>PLN -Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price">Rp.51.500</div>
            </div>
          </div>

          <div className="total_price">
            <p>Total</p>
            <div className="sub_price">Rp. 103.000</div>
          </div>
          <div className="frame_subs">
            <img src={frame} alt="frame"></img>
          </div>
        </div>
      </div>
      <button className="add-new" onClick={handleChange}>
        Add New
      </button>
    </div>
  );
};

export default Subscription;
