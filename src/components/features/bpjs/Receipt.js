import React from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./Receipt.css";
import { useDispatch, useSelector } from 'react-redux';
import DownIcon from "@material-ui/icons/SystemUpdateAlt";
import payment from "../../assets/payment.svg";
import garis from "../../assets/vector.png";
import ListLoader from "../../features/loading/listLoader";

const BpjsReceipt = () => {
  const datacusto = useSelector(state=>state.bpjs.datacusto)
  const history = useHistory();   

  const handleClick = () => {
    history.push("/dashboard");
  };
  return (
    <div className="receipt_wrapper">
      <div className="payment_image">
        <img src={payment} alt=""></img>
      </div>
      <div className="topline">
        <div className="arrow_bpjs">
          <Link to={"/newbill"}>
            <ArrowBackIcon />
          </Link>
          <div className="gray_normal">Receipt</div>
          <div className="black_bold">BPJS</div>
        </div>
        <div className="back_home">
          <p onClick={handleClick}>Back to home</p>
        </div>
      </div>
      <div className="contents_wrap">
        <div className="receipt_bpjs">
          <div className="title_receipt">
            <p>Receipt</p>
            <div className="content-list grayy">
              <DownIcon fontSize="small" />
              Download
            </div>
          </div>
          <img src={garis} alt="garis" className="borderline01"></img>
        </div>
        <div className="content_receipt">
          {
            datacusto.length === 0 ?
            <ListLoader />
              :
            datacusto.map((data, index) =>(
          <div key="{data.item}">
          <div className="content-list">
            No VA<span>{data.noVa}</span>
          </div>
          <div className="content-list">
            Fullname<span>{data.fullName}</span>
          </div>
          <div className="content-list">
            Branch<span>{data.branch}</span>
          </div>
          <div className="content-list">
            Family Member<span>{data.familyMember}</span>
          </div>
          <div className="content-list">
            Payment Period
            <span>{data.period}</span>
          </div>
          <div className="double">
            <p>{data.countMonth}</p>
          </div>
          <div className="content-list space">
            Bill<span>{data.bill}</span>
          </div>
          <div className="content-list">
            Admin<span>{data.adminFee}</span>
          </div>
          <div className="content-list bold">
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
export default BpjsReceipt;
