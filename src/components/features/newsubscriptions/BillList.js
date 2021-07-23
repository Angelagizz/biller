import React, { useState } from "react";
import iconsubs from "../../assets/icon-subs.png";
import documenticon from "../../assets/document.png";
import "./BillList.css";
import { Height } from "@material-ui/icons";
import $ from "jquery";
import { useSelector } from "react-redux";

const BillList = ({ id, data, listfilter }) => {
  const [total, setTotal] = useState(0);
  const landline = useSelector((state) => state.landline.infocust);
  console.log("landline", landline);
  //jquery
  $(document).ready(function () {
    $(".billlist").on("click", ".row1", function () {
      $(".row1").removeClass("active");
      $(this).addClass("active");
    });
  });

  const format = (data) => {
    let reverse = data.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };
  return (
    <div className="wrapperbilllist">
      <div className="billlist">
        {data.map((data, index) => (
          <div
            className="row1"
            key={index}
            onClick={() => id(data.id)}
            onLoad={() => setTotal(total + parseInt(data.total))}
          >
            <div className="row2">
              <span>
                <img src={iconsubs} alt="icon" />
              </span>
              <div className="column3">
                <div>{data.name}</div>
                <div>{data.id}</div>
              </div>
            </div>
            <div className="bold">Rp.{format(data.total)}</div>
          </div>
        ))}

        <div className="total">
          Total<span className="bold">Rp. {format(total)} </span>
        </div>
      </div>

      <div className="billpreview">
        {listfilter.length == 0 ? (
          <div className="image">
            <img src={documenticon} alt="icon" />
            <div className="gray">Click the list to show details</div>
          </div>
        ) : (
          <div className="bill-list-preview">
            <div className="detail-list">
              <span>Receipt</span>
            </div>
            <div className="detail">
              {landline.map((data) => (
                <>
                  <div className="detail-list">
                    No Telephone <span>{data.No_Telephone}</span>
                  </div>
                  <div className="detail-list">
                    Bill<span>{data.Bill}</span>
                  </div>
                  <div className="detail-list">
                    Admin<span>{data.Admin}</span>
                  </div>
                  <div className="detail-list bold">
                    Total<span> Rp. {format(data.Total)}</span>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillList;
