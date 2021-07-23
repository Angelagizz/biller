import { ArrowBack } from "@material-ui/icons";
import "../electricity/TokenConfirmation.css";
import React, { useEffect, useRef, useState } from "react";
import PaymentMethodModal from "../electricity/PaymentMethodModal";
import Recurring from "./Recurring";
import { Link, useHistory, useParams } from "react-router-dom";
import Timer from "../electricity/Timer";
import { useDispatch, useSelector } from "react-redux";
import {
  getLandlineAccount,
  newBillLandline,
  uploadReceiptLandline,
} from "../../../services/landlineService";
import {
  setLandlineInfo,
  setBillLandline,
  setLandlineReceipt,
  setLandlineCust,
} from "../../../redux/action/landlineAction";
import { data } from "jquery";
import ListLoading from "../loading/listLoader";
import ListLoader from "../loading/listLoader";
import masterCardLogo from "../../assets/master-card1.png";
import visaLogo from "../../assets/visa.png";
import Header2 from "../../pages/Header/Header2";
import ThreeDots from "../loading/threeDots";

const LandlineUploadReceipt = () => {
  const tipe = "landline";
  const statusRecurring = useSelector((state) => state.recurring.status);
  const [statusRecur, setStatusRecur] = useState(statusRecurring);
  const tgl = useSelector((state) => state.recurring.date);
  const bln = useSelector((state) => state.recurring.month);
  const thn = useSelector((state) => state.recurring.year);
  const Period = useSelector((state) => state.recurring.Period);
  const [statusText, setStatusText] = useState("");
  const [bill_id, setBillId] = useState();
  const [transaction_id, settransaction_id] = useState();
  const history = useHistory();
  const inputFile = useRef(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const time = new Date();
  const { id } = useParams();
  const token = useSelector((state) => state.user.currentUser.token);
  time.setSeconds(time.getSeconds() + 3600);

  const date = `${thn}-${bln >= 10 ? bln : `0${bln}`}-${
    tgl.length === 1 ? `0${tgl}` : tgl
  }`;
  // console.log('date dari child', date)
  // console.log('bulan',bln)
  // console.log('status dari child', statusRecur)

  const landlineacc = useSelector((state) => state.landline.infocust);
  const landlineBill = useSelector((state) => state.landline.landlinebill);
  useEffect(() => {
    landlineacc.length === 0 &&
      getLandlineAccount(id, token)
        .then((response) => {
          console.log("data", response.data);
          dispatch(setLandlineInfo(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  useEffect(() => {
    statusText === "Ok" && history.push("/landline/receipt");
  }, [statusText]);

  useEffect(() => {
    landlineacc.length !== 0 &&
      newBillLandline(token, landlineacc, payType, statusRecur, Period, date)
        .then((response) => {
          console.log("Response Create New bill di upload", response);
          dispatch(setBillLandline(response.data.landline_bill_details));
          setBillId(response.data.bill_id);
          settransaction_id(response.data.transaction_id);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [landlineacc]);

  console.log("billid n trans id", bill_id, transaction_id);
  console.log("file", file);

  const handleUpload = () => {
    uploadReceiptLandline(token, transaction_id, bill_id, file)
      .then((response) => {
        dispatch(setLandlineReceipt(response.data.receipt));
        console.log("response upload", response);
        setStatusText(response.statusText);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const payType = "Bank Transfer";

  function cc_format(value) {
    var matches = value.match(/.*\d{4,16}/g);
    var match = (matches && matches[0]) || "";
    var parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  }

  function maskify(cc) {
    return cc.replace(/.(?=.{4})/g, "*");
  }

  const formatRupiah = (data) => {
    let reverse = data.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

  return (
    <>
      <Header2 />
      <div className="dashboard-background"></div>
      <div className="containerku">
        <div>
          <div className="space-between">
            <Link to="/newbill">
              <div>
                <ArrowBack />
              </div>
            </Link>
            <Link className="link" to="/dashboard">
              <div>Back to home</div>
            </Link>
          </div>
          <div className="gray">Payment Confirmation</div>
          <div className="title bold1">Landline </div>
        </div>
        <div className="confirmation-frame" style={{ marginBottom: "100px" }}>
          <div className="bill-detail">
            {
              <div className="resume">
                <div className="gray center">
                  Please complete your payment in
                </div>

                {landlineBill.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <ThreeDots />
                  </div>
                ) : (
                  landlineBill.map((data, index) => (
                    <>
                      <div className="bold center">
                        <Timer expiryTimestamp={time} />{" "}
                      </div>
                      <div className="detail-list">
                        Total <span>{data.Total}</span>
                      </div>
                      <div className="detail-list">
                        Bank <span>{data.account_bank}</span>
                      </div>
                      <div className="detail-list">
                        Account Name <span>{data.account_name}</span>
                      </div>
                      <div className="detail-list">
                        Account No <span>{data.account_number}</span>
                      </div>
                      <div>
                        <input
                          type="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
                      <div className="btn-upload" onClick={handleUpload}>
                        Upload Receipt
                      </div>
                    </>
                  ))
                )}
              </div>
            }

            <div className="bold">Bill Details</div>
            <div className="detail">
              {landlineacc.length === 0 ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ListLoader />
                </div>
              ) : (
                landlineacc.map((data) => (
                  <div key="{data.item}">
                    <div className="detail-list">
                      No Telephone<span>{data.No_Telephone}</span>
                    </div>

                    <div className="detail-list">
                      Bill<span>{data.Bill}</span>
                    </div>
                    <div className="detail-list">
                      Late Payment Fee<span>{data.Late_Payment_Fee}</span>
                    </div>
                    <div className="detail-list">
                      Admin<span>{data.Admin}</span>
                    </div>
                    <div className="detail-list">
                      <span>Total</span>
                      <span>{data.Total}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {statusRecurring && (
            <Recurring
              statusRecur={(statusRecur) => setStatusRecur(statusRecur)}
              tipe={tipe}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LandlineUploadReceipt;
