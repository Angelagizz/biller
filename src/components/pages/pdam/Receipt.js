import React from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./Receipt.css";
import { useDispatch, useSelector } from 'react-redux';
import DownIcon from "@material-ui/icons/SystemUpdateAlt";
import payment from "../../assets/payment.svg";
import garis from "../../assets/vector.png";
import Header2 from "../Header/Header2";
import ListLoader from "../../features/loading/listLoader"

const PdamReceipt = () => {
  const history = useHistory();
  const pdamAcc = useSelector(state => state.pdam.pdamAcc)

  const handleClick = () => {
    history.push("/dashboard");
  };
  return (
    <div className="pdam_wrapper">
      {/* <Header2 /> */}
      <div className="pdam_image">
        <img src={payment} alt=""></img>
      </div>
      <div className="topline-pdam">
        <div className="arrow_pdam">
          <div>
            <Link to={"/newbill"}>
              <ArrowBackIcon />
            </Link>
            <div className="gray_aja">Receipt</div>
            <div className="black_tebel">PDAM - DKI Jakarta</div>
          </div>
          <div className="backhome-pdam">
            <p onClick={handleClick}>Back to home</p>
          </div>
        </div>
      </div>
      <div className="contents_wrap_pdam">
        <div className="receipt_pdam">
          <div className="title_receipt_pdam">
            <p>Receipt</p>
            <div className="pdam-list abu">
              <DownIcon fontSize="small" />
              Download
            </div>
          </div>
          <img className="garis_pdam" src={garis} alt="garis" />
        </div>
        <div className="pdam_receipt">
          {
            pdamAcc.length === 0 ?
            <ListLoader />
            :
            pdamAcc.map((data, index) =>(
          <div key="{data.item}">
          <div className="pdam-list">
            No Customer<span>{data.customerNumber}</span>
          </div>
          <div className="pdam-list">
            Name<span>{data.name}</span>
          </div>
          <div className="pdam-list">
            Period<span>{data.period}</span>
          </div>
          <div className="pdam-list">Stand Meter (M3)</div>
          <div className="pdam-list tab">
            Last Month
            <span>{data.lastMonthStandMeter}</span>
          </div>
          <div className="pdam-list tab">
            This Month
            <span>{data.thisMonthStandMeter}</span>
          </div>
          <div className="pdam-list tab">
            Usage
            <span>{data.usage}</span>
          </div>
          <div className="pdam-list space">
            Bill<span>{data.bill}</span>
          </div>
          <div className="pdam-list">
            Admin<span>{data.admin}</span>
          </div>
          <div className="pdam-list bold">
            Total<span>{data.total}</span>
          </div>
          </div>
          ))
        }
        </div>
      </div>
    </div>
  );
};
export default PdamReceipt;
