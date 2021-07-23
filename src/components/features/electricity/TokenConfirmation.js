import { ArrowBack } from "@material-ui/icons";
import "../electricity/TokenConfirmation.css";
import React, { useEffect, useRef, useState } from "react";
import PaymentMethodModal from "./PaymentMethodModal";
import Recurring from "./Recurring";
import { Link, useHistory, useParams } from "react-router-dom";
import Timer from "./Timer";
import { useDispatch, useSelector } from "react-redux";
import {
  createTokenBill,
  getTokenAccInfo,
  uploadReceiptElectricity,
} from "../../../services/electricityService";
import {
  setBillToken,
  setBillTokenLagi,
  setReceiptToken,
} from "../../../redux/action/electricityAction";
import ListLoader from "../loading/listLoader";
import masterCardLogo from "../../assets/master-card1.png";
import visaLogo from "../../assets/visa.png";
import { setRecurringStatus } from "../../../redux/action/recurringAction";
import Header2 from "../../pages/Header/Header2";

const TokenConfirmation = () =>{
    const tipe = 'PLN - Token'
    const tgl = useSelector(state=>state.recurring.date)
    const bln = useSelector(state=>state.recurring.month)
    const thn = useSelector(state=>state.recurring.year)
    const period = useSelector(state=>state.recurring.period)
    const [statusRecur, setStatusRecur] = useState(false)
    const bcrypt = require('bcryptjs')
    const [openModal, setOpenModal] = useState(false)
    const [payTrans, setPayTrans] = useState(false)
    const [payCard, setPayCard] = useState(false)
    const [billId, setBillId] = useState()
    const [transactionId, setTransactionId] = useState()
    const payMethod = useSelector(state=>state.payment.primary)
    const [newPin, setNewPin] = useState()
    const history = useHistory()
    const inputFile = useRef(null)
    const token = useSelector(state=>state.user.currentUser.token)
    const dataBillToken = useSelector(state=>state.electricity.billToken)
    const {no_meter, harga} = useParams()
    const dispatch = useDispatch()
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3600);
    const statusRecurring = useSelector(state=>state.recurring.status)
  

  console.log("tipe di tokenconfir", tipe);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  // console.log('nometer',no_meter)
  // console.log('hrga', harga)
  const formatRupiah = (data) => {
    let reverse = data.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

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

  const handlePayClick = () => {
    createTokenBill(token, dataBillToken)
      .then((response) => {
        console.log("reponse create new bill", response);
        dispatch(setBillTokenLagi(response.data.bankTransferDetails));
        setBillId(response.data.bill_id);
        setTransactionId(response.data.transaction_id)
      })
      .catch((error) => {
        console.log(error);
      });
    payMethod[0].name === "Bank transfer"
      ? history.push(`/electricity/token/upload/${no_meter}/${harga}`)
      : // setPayTrans(!payTrans)
        setPayCard(!payCard);
  };

  const handleCompare = () => {
    uploadReceiptElectricity(token, transactionId, billId )
    .then((response)=>{
        dispatch(setReceiptToken(response.data.receipt))
        console.log('response pay card', response)
    })
    .catch((error)=>{
        console.log(error)
    })
    bcrypt.compareSync(newPin, dataBillToken[0].PIN)
      ? history.push(`/electricity/token/receipt`)
      : alert("Pin Salah");
    //  history.push('/electricity/token/receipt')
  };
  console.log('billid n trans id', billId, transactionId)
  useEffect(() => {
    getTokenAccInfo(token, no_meter, harga)
      .then((response) => {
        console.log("token acc info", response);
        dispatch(setBillToken(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(setRecurringStatus(false));
  }, []);

  return (
    <>
      <Header2 />
      <div className="dashboard-background" />
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
          <div className="title bold1">Electricity - PLN Token</div>
        </div>
        <div className="confirmation-frame">
          <div className="bill-detail">
            {payTrans && (
              <div className="resume">
                <div className="gray center">
                  Please complete your payment in
                </div>
                <div className="bold center">
                  <Timer expiryTimestamp={time} />{" "}
                </div>
                <div className="detail-list">
                  Total <span>Rp. {dataBillToken[0].Total}</span>
                </div>
                <div className="detail-list">
                  Bank <span>Bank Central Asia</span>
                </div>
                <div className="detail-list">
                  Account Name <span>PT. Biller Indonesia</span>
                </div>
                <div className="detail-list">
                  Account No <span>0123456789</span>
                </div>
                <div
                  className="btn-upload"
                  onClick={() => inputFile.current.click()}
                >
                  Upload Resume
                </div>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
              </div>
            )}

            <div className="bold">Bill Details</div>
            <div className="detail">
              {dataBillToken.length === 0 ? (
                <ListLoader />
              ) : (
                dataBillToken.map((data, index) => (
                  <>
                    <div className="detail-list">
                      No Meter<span>{data.No_Meter}</span>
                    </div>
                    <div className="detail-list">
                      IDPEL<span>{data.IDPEL}</span>
                    </div>
                    <div className="detail-list">
                      Name<span>{data.Name}</span>
                    </div>
                    <div className="detail-list">
                      Tarif/Daya<span>{data.Tarif_Daya}</span>
                    </div>
                    <div className="detail-list space">
                      Token<span>Rp. {formatRupiah(data.Token)}</span>
                    </div>
                    <div className="detail-list">
                      PPJ<span>Rp. {formatRupiah(data.PPJ)}</span>
                    </div>
                    <div className="detail-list">
                      Admin<span>Rp. {formatRupiah(data.Admin)}</span>
                    </div>
                    <div className="detail-list">
                      <span>Total</span>
                      <span>Rp. {formatRupiah(data.Total)}</span>
                    </div>
                  </>
                ))
              )}
            </div>
            {!payTrans && (
              <>
                {payCard ? (
                  <div className="pin-wrapper">
                    <div>Masukkan Pin Transaksi Anda</div>
                    <input
                      type="password"
                      onChange={(e) => setNewPin(e.target.value)}
                      value={newPin}
                    />
                    <buttton className="pin-btn" onClick={handleCompare}>
                      Pay
                    </buttton>
                  </div>
                ) : (
                  <>
                    <div className="payment">
                      <div className="rowku">
                        <span>Payment Method</span>{" "}
                        <div className="change gray" onClick={handleOpenModal}>
                          Change
                        </div>
                      </div>
                      {openModal ? (
                        <PaymentMethodModal
                          togle={(openModal) => setOpenModal(openModal)}
                        />
                      ) : (
                        <></>
                      )}
                      <div className="gray">
                        {payMethod[0].name !== "Bank transfer" ? (
                          <>
                            <img
                              style={{ height: "20px" }}
                              src={
                                payMethod[0].name === "visa"
                                  ? visaLogo
                                  : payMethod[0].name === "master-card"
                                  ? masterCardLogo
                                  : ""
                              }
                            />
                            {cc_format(maskify(payMethod[0].number))}
                          </>
                        ) : (
                          payMethod[0].name
                        )}
                      </div>
                    </div>
                    <div className="payment-btn" onClick={handlePayClick}>
                      Pay{" "}
                      {dataBillToken.length !== 0 &&
                        ` : Rp. ${formatRupiah(dataBillToken[0].Total)}`}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <Recurring
            statusRecur={(statusRecur) => setStatusRecur(statusRecur)}
            tipe={tipe}
          />
        </div>
      </div>
    </>
  );
};

export default TokenConfirmation;
