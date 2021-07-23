import React, { Component, useEffect, useState } from "react";
import "../dashboard/Dashboard.css";
import { useHistory } from "react-router-dom";
import nosubs from "../../assets/no-subs.png";
import PaymentModal from "../paymentmodal/PaymentModal";
import iconsubs from "../../assets/icon-subs.png";
import Header2 from "../../pages/Header/Header2";
import { useDispatch, useSelector } from "react-redux";
import masterCardLogo from '../../assets/master-card1.png'
import visaLogo from '../../assets/visa.png'
import { changePayMethod } from "../../../redux/action/paymentAction";
import { getUserDetail, getUserPaymentCards } from "../../../services/userService";
import { changePaymentMethod, getProfileData, getUserPayment, setReload } from "../../../redux/action/profileAction";
import ThreeDots from '../../features/loading/threeDots'

const Dashboard = () => {
  const email = useSelector(state=>state.user.email)
  const dispatch = useDispatch();
  const cardList = useSelector(state=>state.profile.userPayment);
  const primaryPayMethod = useSelector(state=>state.profile.primary);
  const {card_number, type } = primaryPayMethod[0]
  const [paymentTogle, setPaymentTogle] = useState(false);
  const history = useHistory();
  const [paymentModalTogle, setPaymentModalTogle] = useState(false);
  const [rbutton, setRbutton] = useState(false);
  const [cName, setCName] = useState('user-list')
  const [fullName,setFullName]=useState()
  const reload = useSelector(state =>state.profile.reload)
  const [refresh, setRefresh]=useState(false)
  const token = useSelector(state=>state.user.currentUser.token)
  // console.log("modal togle", primaryPayMethod);

  const handleClick = () => {
    history.push("/biller/subscription");
  };

  const handleProfile = () => {
    history.push("/update/profile")
  }

  console.log('email',email)
  function cc_format(value) {
    var matches = value.match(/.*\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
  }

  function maskify(cc) {
    return cc.replace(/.(?=.{4})/g, "*");
  }

  const handleTogle=()=>{
    setPaymentTogle(!paymentTogle)
    cName==='user-list'? setCName('user-list user-list-aktif') :  setCName('user-list')
  }
  const profile = useSelector(state=>state.profile.userDetail)

  useEffect(()=>{
      if (reload){
        getUserPaymentCards(token)
        .then ((response)=>{
          console.log('responese getUserPaymentCards',response)
          dispatch(getUserPayment(response.data))
          dispatch(setReload(false))
        })
        .catch((error)=>{
          console.log('error getUserPayamentCards'.error)
          dispatch(setReload(false))
        })
      }
  },[])



 return (
    <>
      <Header2 />
      <div className="dashboard-wrapper">
        <div className="dashboard-background"></div>
        <div className="containerku">
          <div className="dashboard-frame">
            <div className="user-frame">
              <div className="user-info">
              {
                 profile.length===0?<ThreeDots/>: profile.map((d,i)=>(<>{d.first_name} {d.last_name}</>))
              }
              </div>
              <div className="user-menu">
                <div
                  className={cName}
                  onClick={handleTogle}
                >
                  <p>Payment Method</p>
                </div>
                <div className="user-list" onClick={handleProfile}>
                  <p>Update Profile</p>
                </div>
              </div>
            </div>
            {paymentTogle /*paymentwrapper*/ ? (
              <div className="payment-wrapper">
                <div className='line-trans'></div>
                <div className='sprimary'> 
                <p onClick={() => setRbutton(!rbutton)}>Select primary</p>
                </div>
                <div className="payment-frame">
                  <div className="payment-method">
                        <div className="payment-list">
                          {
                          type !== 'Bank Transfer' 
                          ?
                          <div style={{display:'flex', justifyContent:'flex-start'}}>
                           <img style={{height:'20px'}} alt='logo'  src={parseInt(card_number[0]) % 2 === 0 ? visaLogo : masterCardLogo}/> 
                           {cc_format(maskify(card_number))}
                          </div>
                          : type
                          } 
                          <span>primary</span>
                        </div>
                  </div>
                  <div className="paymentform">
                    <h5>Debit/Credit Card</h5>
                    <form>
                        {
                          cardList.map((data, index)=>(
                            data.type !== primaryPayMethod[0].type ?
                            <div className="cardd" key={index}>
                              <div style={{display:'flex',alignItems:'center'}}>
                                {rbutton ? (
                                  <input style={{marginRight:'3px'}} type="radio" name="primary-card" onClick={()=>dispatch(changePaymentMethod(data.card_number, data.type ), setRbutton(!rbutton))}/>
                                ) : (
                                  <></>
                                )}

                                {
                                  data.type === 'Bank Transfer' 
                                  ?
                                  <div>{data.type}</div>
                                  :
                                <>
                                 <img style={{height:'20px'}} src={parseInt(data.card_number[0]) % 2 === 0 ? visaLogo : masterCardLogo} alt='logo' /> 
                                 {cc_format(maskify(data.card_number))}
                                </>
                                }                  
                              </div>
                              <span>edit</span>
                            </div>
                            :<></>
                          ))
                        }
                    </form>
                    <div
                      className="addnewcard"
                      onClick={() => setPaymentModalTogle(!paymentModalTogle)}
                    >
                      Add New Card
                    </div>
                    {paymentModalTogle ? (
                      <PaymentModal
                        togle={(paymentModalTogle) =>
                          setPaymentModalTogle(paymentModalTogle)
                        }
                        refresh={(refresh)=>setRefresh(refresh)}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /*noting*/ <></>
            )}
          </div>
         {/* <h3 className="active-label">Active Subscription</h3> */}
          {/* <div className="active-subs-wrapper">
            <div className="active-subs-frame">
              <div>
                <div className="due-info red">
                  last payment date : <span>18 July 2021</span>{" "}
                </div>
                <div className="column1">
                  <div className="bill-status">Billed every moday</div>
                  <div className="column2">
                    <div className="row1">
                      <div className="row2">
                        <span>
                          <img src={iconsubs} alt="icon" />
                        </span>
                        <div className="column3">
                          <div>PLN -Token</div>
                          <div>141234567890</div>
                        </div>
                      </div>
                      <div className="bold">Rp.51.500</div>
                    </div>
                    <div className="row1">
                      <div className="row2">
                        <span>
                          <img src={iconsubs} alt="icon" />
                        </span>
                        <div className="column3">
                          <div>PLN -Token</div>
                          <div>141234567890</div>
                        </div>
                      </div>
                      <div className="bold">Rp.51.500</div>
                    </div>
                    <div className="row1 late-text">
                      <div>1 day late payment fee (0.5%)</div>
                      <div className="bold">Rp.5.150</div>
                    </div>
                    <div className="total">
                      <div>Total</div>
                      <div className="bold1">Rp. 108.500</div>
                    </div>
                    <div className="btn-pay" onClick={handleClick}>
                      Pay
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="active-subs-frame">
              <div>
                <div className="due-info green">
                  last payment date : <span>28 July 2021</span>{" "}
                </div>
                <div className="column1">
                  <div className="bill-status">Billed every moday</div>
                  <div className="column2">
                    <div className="row1">
                      <div className="row2">
                        <span>
                          <img src={iconsubs} alt="icon" />
                        </span>
                        <div className="column3">
                          <div>PLN -Token</div>
                          <div>141234567890</div>
                        </div>
                      </div>
                      <div className="bold">Rp.51.500</div>
                    </div>
                    <div className="row1">
                      <div className="row2">
                        <span>
                          <img src={iconsubs} alt="icon" />
                        </span>
                        <div className="column3">
                          <div>PLN -Token</div>
                          <div>141234567890</div>
                        </div>
                      </div>
                      <div className="bold">Rp.51.500</div>
                    </div>
                    <div style={{ marginBottom: "32px" }}></div>
                    <div className="total">
                      <div>Total</div>
                      <div className="bold1">Rp. 103.000</div>
                    </div>
                    <div className="btn-pay" onClick={handleClick}>
                      Pay
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="sub-frame">
            <h5>Active Subscription</h5>
            <div className="content">
              <img src={nosubs} alt="no-subscription" />
              <p>No Upcoming Bill Right Now!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
