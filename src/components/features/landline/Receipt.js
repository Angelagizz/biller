import React, { useEffect, useState } from "react";
import "../electricity/TokenConfirmation.css";
import DownIcon from "@material-ui/icons/SystemUpdateAlt";
import { ArrowBack } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import ListLoader from "../loading/listLoader";
import { useParams } from "react-router";
import { getLandlineAccount } from "../../../services/landlineService";
import { setLandlineInfo } from "../../../redux/action/landlineAction";
import Header2 from "../../pages/Header/Header2";
import notif from "../../assets/pay_success.png";

const LandlineReceipt = () => {
  const landlineacc = useSelector((state) => state.landline.infocust);
  const token = useSelector((state) => state.user.currentUser.token);
  const [name, setName] = useState("w3-animate-top");
  const dispatch = useDispatch();
  // const {id} = useParams()
  // useEffect(
  //     ()=>{
  //         dataCust.length === 0 &&
  //         getInternetAccount(id, token)
  //         .then((response) => {
  //           dispatch(setInternetCust(response.data))
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         })
  //     }
  // ,[])
  //setTimeout(setName('out'),40000)
  return (
    <>
      <Header2 />
      <div className={name} onClick={() => setName("out")}>
        <img
          style={{
            width: "250px",
            height: "70px",
            position: "absolute",
            left: "42%",
          }}
          src={notif}
          alt="notif"
        />
      </div>
      <div className="containerku">
        <div className="space-between">
          <div>
            <ArrowBack />
          </div>
          <div>Back to home</div>
        </div>
        <div className="gray">Receipt</div>
        <div className="bold1">Landline</div>
        <div className="dashboard-background"></div>
        <div className="tengah">
          <div className="bill-detail">
            <div className="detail-list">
              <span>Receipt</span>
              <div className="detail-list gray">
                <DownIcon fontSize="small" />
                Download
              </div>
            </div>
            <div className="detail">
              {landlineacc.length === 0 ? (
                <ListLoader />
              ) : (
                landlineacc.map((data, index) => (
                  <>
                    <div className="detail-list">
                      No Telephone<span>{data.No_Telephone}</span>
                    </div>

                    <div className="detail-list">
                      Bill<span>{data.Bill}</span>
                    </div>
                    <div className="detail-list">
                      Admin<span>{data.Admin}</span>
                    </div>
                    <div className="detail-list">
                      <span>Total</span>
                      <span>{data.Total}</span>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandlineReceipt;
