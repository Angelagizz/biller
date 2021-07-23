import React, { useEffect, useState } from "react";
import imglogo from "../../assets/logobiller2.png";
import logo from "../../assets/logo-biller.png";
import "./Header.css";
import "./Header2.css";
import { Link, useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Icon from "@material-ui/core/Icon";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import success from "../../assets/success.png";
import warning from "../../assets/warning.png";
import info from "../../assets/info.png";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import blankAva from "../../assets/blank-avatar.png";
import {
  getProfileData,
  getUserPayment,
} from "../../../redux/action/profileAction";
import { getUserDetail } from "../../../services/userService";
import { useDispatch, useSelector } from "react-redux";

const Header2 = () => {
  const [notifTogle, setNotifTogle] = useState(false);
  const [profileTogle, setProfileTogle] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);
  const [dataUser, setDataUser] = useState("");
  // const token = useSelector((state) => state.user.currentUser.token);
  const history = useHistory();
  const dispatch = useDispatch();
  const notiflist = [
    {
      title: "PLN Token",
      detail:
        "Transaction of Rp 51,500 for ***7890 (Justin Junaedi) has been successfully paid.",
      id_transaction: "141234567890",
      status: "Payment Success",
    },
    {
      title: "Mobile Pulsa",
      detail: "Subscription for 082123456789 has been successfully created",
      id_transaction: "141234567891",
      status: "Payment Success",
    },
    {
      title: "PLN Token",
      detail:
        "We couldn’t procees your transaction Rp 51,500 for  ***7890 (Justin Junaedi). Please try again",
      id_transaction: "141234567892",
      status: "Payment Failed",
    },
    {
      title: "Your subscription due in 2 days",
      detail:
        "Montly subscribtion (Rp. 103.500) due in 28 June 2021. Please pay before due date to avoid late fee.",
      id_transaction: "141234567893",
      status: "information",
    },
    {
      title: "PLN Token",
      detail:
        "Transaction of Rp 51,500 for ***7890 (Justin Junaedi) has been successfully paid.",
      id_transaction: "141234567894",
      status: "Payment Success",
    },
    {
      title: "Mobile Pulsa",
      detail: "Subscription for 082123456789 has been successfully created",
      id_transaction: "141234567895",
      status: "Payment Success",
    },
    {
      title: "PLN Token",
      detail:
        "We couldn’t procees your transaction Rp 51,500 for  ***7890 (Justin Junaedi). Please try again",
      id_transaction: "141234567896",
      status: "Payment Failed",
    },
    {
      title: "Your subscription due in 2 days",
      detail:
        "Montly subscribtion (Rp. 103.500) due in 28 June 2021. Please pay before due date to avoid late fee.",
      id_transaction: "141234567890",
      status: "information",
    },
    {
      title: "PLN Token",
      detail:
        "We couldn’t procees your transaction Rp 51,500 for  ***7890 (Justin Junaedi). Please try again",
      id_transaction: "141234567897",
      status: "Payment Failed",
    },
    {
      title: "Your subscription due in 2 days",
      detail:
        "Montly subscribtion (Rp. 103.500) due in 28 June 2021. Please pay before due date to avoid late fee.",
      id_transaction: "141234567898",
      status: "information",
    },
  ];
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = notiflist.slice(0, indexOfLastData);

  // useEffect(() => {
  //   getUserDetail(token)
  //     .then((response) => {
  //       // setRegion(response.data);
  //       console.log(response);
  //       dispatch(getProfileData(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const seemoreClick = () => {
    document.removeEventListener("click", onClickOutsideListener);
    setCurrentPage(currentPage + 1);
  };

  const onClickOutsideListener = () => {
    setNotifTogle(false);
    document.removeEventListener("click", onClickOutsideListener);
  };
  const logoutHandler = () => {
    history.push("/");
    const store = window.localStorage;
    store.clear("");
   // window.location.reload();
  };

  const onClickOutsideListenerProfile = () => {
    setProfileTogle(false);
    document.removeEventListener("click", onClickOutsideListenerProfile);
  };
  const store = window.localStorage;
  const token = store.getItem("token");

  const datauser = useSelector((state) => state.profile.userDetail);
  // console.log(datauser, "data")
  useEffect(() => {
    getUserDetail(token)
      .then((response) => {
        console.log(response);
        dispatch(getProfileData(response.data.account));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <section id="header" className="spacing-sm head">
        <div id="nav">
          <Fade bottom>
            <header
              style={{ padding: "0px 30px" }}
              className="d-flex shadow-sm flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4"
            >
              <Link className="navbar-brand" to={"/dashboard"}>
                <img src={logo} alt="" className="img-fluid" />
              </Link>
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <Link className="nav-link px-2" to={"/biller/subscription"}>
                    {/* <a href="#" className="nav-link px-2 "> */}
                    Subscription
                    {/* </a> */}
                  </Link>
                </li>
                <li>
                  <Link className="nav-link px-2" to={"/history"}>
                    {/* <a href="#" className="nav-link px-2 "> */}
                    History
                    {/* </a> */}
                  </Link>
                </li>
              </ul>
              <div className="col-md-3 menu-right" id="button">
                <button type="button" className="btn btn-success">
                  <Link to={"/newbill"}>New Bill</Link>
                </button>
                <div
                  style={{ position: "relative", justifyContent: "flex-start" }}
                >
                  <div className={notifTogle ? "bell-aktif" : "bell"}>
                    <NotificationsIcon
                      onClick={() => setNotifTogle(!notifTogle)}
                      onMouseLeave={() => {
                        document.addEventListener(
                          "click",
                          onClickOutsideListener
                        );
                      }}
                      color="primary"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <PersonIcon
                      className={profileTogle ? "person-aktif" : "person"}
                      color="primary"
                      id="icon"
                      onClick={() => setProfileTogle(!profileTogle)}
                      onMouseLeave={() => {
                        document.addEventListener(
                          "click",
                          onClickOutsideListenerProfile
                        );
                      }}
                    />
                  </div>
                </div>
                {notifTogle && (
                  <div
                    className="notif"
                    onMouseLeave={() => {
                      document.addEventListener(
                        "click",
                        onClickOutsideListener
                      );
                    }}
                  >
                    {currentData.map((data) => (
                      <Link to={"/notification"} style={{ color: "black" }}>
                        <div className="notif-list">
                          <div>
                            <img
                              src={
                                data.status === "Payment Success"
                                  ? success
                                  : data.status === "Payment Failed"
                                  ? warning
                                  : info
                              }
                            />
                          </div>
                          <div>
                            <div className="notif-title">
                              {data.title}{" "}
                              {data.status === "information"
                                ? ""
                                : ` - ${data.status}`}
                            </div>
                            <div className="notif-detail">{data.detail}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="see-more" onClick={seemoreClick}>
                      See More
                    </div>
                  </div>
                )}
                {profileTogle && (
                  <div
                    className="notif"
                    onMouseEnter={() => {
                      document.removeEventListener(
                        "click",
                        onClickOutsideListenerProfile
                      );
                    }}
                    onMouseLeave={() => {
                      document.addEventListener(
                        "click",
                        onClickOutsideListenerProfile
                      );
                    }}
                  >
                    {datauser.map((data) => (
                      <div key="{data.item}">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50px",
                              marginRight: "10px",
                            }}
                            src={
                              data.image_url === null
                                ? blankAva
                                : data.image_url
                            }
                          />
                          <div>
                            {data.first_name} {data.last_name}
                          </div>
                        </div>
                      </div>
                    ))}

                    <hr />
                    <div className="profile-list">Update Profile</div>
                    <div className="profile-list">Help</div>
                    <hr />
                    <div
                      className="profile-list"
                      style={{ alignItems: "center" }}
                      onClick={logoutHandler}
                    >
                      <LogoutIcon
                        style={{ marginBottom: "3px" }}
                        fontSize="small"
                      />{" "}
                      Log out
                    </div>
                    <hr />
                  </div>
                )}
              </div>
            </header>
          </Fade>
        </div>
      </section>
    </>
  );
};
export default Header2;
