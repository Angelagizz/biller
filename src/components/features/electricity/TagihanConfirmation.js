import { ArrowBack } from '@material-ui/icons'
import '../electricity/TokenConfirmation.css'
import React, { useEffect, useState } from 'react'
import PaymentMethodModal from './PaymentMethodModal'
import Recurring from './Recurring'
import { Link, useHistory, useParams } from 'react-router-dom'
import Header2 from '../../pages/Header/Header2'
import { useDispatch, useSelector } from 'react-redux'
import { createTagihanBill, getTagihanAccInfo, uploadReceiptElectricity } from '../../../services/electricityService'
import { setBillTagihan, setBillTagihanLagi, setReceiptTagihan } from '../../../redux/action/electricityAction'
import ListLoader from '../loading/listLoader'
import Timer from './Timer'
import masterCardLogo from '../../assets/master-card1.png'
import visaLogo from '../../assets/visa.png'
import { setRecurringStatus } from '../../../redux/action/recurringAction'

const TagihanConfirmation = () =>{
    const tipe = 'PLN - Tagihan'
    const [statusRecur, setStatusRecur] = useState(false)
    const token = useSelector(state=>state.user.currentUser.token)
    const billTagihan = useSelector(state=>state.electricity.billTagihan)
    const payMethod = useSelector(state=>state.payment.primary)
    const dispatch = useDispatch()
    const {idpel} = useParams()
    const [newPin, setNewPin] = useState()
    const [billId, setBillId] = useState()
    const [transactionId, setTransactionId] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [payTrans, setPayTrans] = useState(false)
    const [payCard, setPayCard] = useState(false)
    const history = useHistory()
    const bcrypt = require('bcryptjs')
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3600);

    //       //2021-07-10 => Jul
    //       const convert_bulan = (data) =>{
    //         let x = data.slice(5,7)
    //         switch (x) {
    //             case '01' :
    //                 return 'Jan'
    //             case '02 ':
    //                 return 'Feb'
    //             case '03' :
    //                 return 'Mar'
    //             case '04' :
    //                 return 'Apr'
    //             case '05' :
    //                 return 'May'
    //             case '06' :
    //                 return 'Jun'
    //             case '07' :
    //                 return 'Jul'
    //             case '08' :
    //                 return 'Aug'
    //             case '09' :
    //                 return 'Sep'
    //             case '10' :
    //                 return 'Oct'
    //             case '11' :
    //                 return 'Nov'
    //             case '12' :
    //                 return 'Dec'  
    //             default:
    //                 return 'Jan'
    //         }

    // }
    // //2021-07-10 => 2021
    // const tahun = (data) =>{
    //     return data.slice(0,4)
    // }
    
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCompare = () => {
    uploadReceiptElectricity(token, transactionId, billId )
    .then((response)=>{
        dispatch(setReceiptTagihan(response.data.receipt))
        console.log('response pay card', response)
    })
    .catch((error)=>{
        console.log(error)
    })
    bcrypt.compareSync(newPin, billTagihan[0].PIN)
      ? history.push(`/electricity/tagihan/receipt`)
      : alert("Pin Salah");
    //  history.push('internettv/receipt')
  };

  let data = [];

  const handlePayClick = () => {
    createTagihanBill(token, billTagihan)
      .then((response) => {
        console.log("Response Create new bill tagihan", response);
        dispatch(setBillTagihanLagi(response.data.bankTransferDetails));
        setBillId(response.data.bill_id);
        setTransactionId(response.data.transaction_id)
      })
      .catch((error) => {
        console.log("errornya : ", error);
      });
    payMethod[0].name === "Bank transfer"
      ? history.push(`/electricity/tagihan/upload/${idpel}`)
      : // setPayTrans(!payTrans)
        setPayCard(!payCard);
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

  const formatRupiah = (data) => {
    let reverse = data.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

  useEffect(() => {
    billTagihan.length === 0 &&
      getTagihanAccInfo(token, idpel)
        .then((response) => {
          console.log("data tagihan", response);
          dispatch(setBillTagihan(response.data));
        })
        .catch((error) => {
          console.log("errornya : ", error);
        });
  }, []);

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
          <div className="title bold1">Electricity - PLN Tagihan</div>
        </div>
        <div className="confirmation-frame" style={{ marginBottom: "100px" }}>
          <div className="bill-detail">
            {payTrans && (
              <div className="resume">
                <div className="gray center">
                  Please complete your payment in
                </div>
                <div className="bold center">
                  <Timer expiryTimestamp={time} />
                </div>
                <div className="detail-list">
                  Total <span>Rp. {formatRupiah(billTagihan[0].Total)}</span>
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
                <div className="btn-upload ">Upload Resume</div>
              </div>
            )}

            <div className="bold">Bill Details</div>
            <div className="detail">
              {billTagihan.length === 0 ? (
                <ListLoader />
              ) : (
                billTagihan.map((data, index) => (
                  <div key={index}>
                    <div className="detail-list">
                      IDPEL<span>{data.IDPEL}</span>
                    </div>
                    <div className="detail-list">
                      Name<span>{data.Name}</span>
                    </div>
                    <div className="detail-list">
                      Tarif/Daya<span>{data.Tarif_Daya}</span>
                    </div>
                    <div
                      className="detail-list space"
                      style={{ display: "flex", alignItems: "flex-start" }}
                    >
                      Bulan/Tahun
                      <span>
                        {
                          data.Bulan_Tahun.map((d, i) => (
                            <div key={i}>{d}</div> ))
                        }
                        {/* {data.Bulan_Tahun.split(",").map((d, i) => (
                          <div key={i}>{d}</div>
                        ))} */}
                      </span>
                    </div>
                    {data.Late_Payment_Fee !== 0 && (
                      <div className="detail-list late-text">
                        late payment fee
                        <span className="bold">
                          Rp. {formatRupiah(data.Late_Payment_Fee)}
                        </span>
                      </div>
                    )}
                    <div className="detail-list">
                      Bill<span>Rp. {formatRupiah(data.Bill)}</span>
                    </div>
                    <div className="detail-list">
                      Admin<span>Rp. {formatRupiah(data.Admin)}</span>
                    </div>
                    <div className="detail-list">
                      <span>Total</span>
                      <span>Rp. {formatRupiah(data.Total)}</span>
                    </div>
                  </div>
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
                      {billTagihan.length !== 0 &&
                        ` : Rp. ${formatRupiah(billTagihan[0].Total)}`}
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

export default TagihanConfirmation;
