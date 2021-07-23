import React from "react";
import "./Receipt.css";
import DownIcon from "@material-ui/icons/SystemUpdateAlt";

const ReceiptPulsa = () => {
  return (
    <div className="bill-detail">
      <div className="detail-list">
        <span>Receipt</span>
        <div className="detail-list gray">
          <DownIcon fontSize="small" />
          Download
        </div>
      </div>
      <div className="detail">
        <div className="detail-list">
          Phone Number<span>081234567890</span>
        </div>
        <div className="detail-list">
          Provider <span>Telkomsel </span>
        </div>

        <div className="detail-list space">
          Voucher <span>Rp 50.000,00</span>
        </div>
        <div className="detail-list">
          Admin<span>Rp 1.500,00</span>
        </div>
        <div className="detail-list bold">
          Total<span>Rp 51.500,00</span>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPulsa;
