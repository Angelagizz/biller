import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo-biller.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { handleLogin } from "../../../redux/action/loginAction";
import { getProfileData, getUserPayment, setReload } from "../../../redux/action/profileAction";
import { userAct, userEmail } from "../../../redux/action/userAction";
import { login, getUserDetail, getUserPaymentCards } from "../../../services/userService";
import { useDispatch} from "react-redux";
import jwt_decode from "jwt-decode";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "bootstrap/dist/css/bootstrap.min.css";
import { EmailOutlined } from "@material-ui/icons";

const eye = <FontAwesomeIcon icon={faEye} />;
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Kolom tidak boleh kosong!
      </div>
    );
  }
};

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusText, setStatusText] = useState("");
  const [val, setVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const form = useRef();
  // const token = useSelector(state => state.user.currentUser.token);

  const handleClick = () => {
    history.push("/biller/signup");
  };
  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    dispatch(
      handleLogin({
        email: email,
        password: password,
        statusText: statusText,
      })
    );
    // dispatch (
    //   getProfileData({
    //     email: email
    //   })
    // )

    const store = window.localStorage;

    login(email, password)
      .then((response) => {
        store.setItem("token", response.token);
        setStatusText(response.statusText);
        console.log(response);
        const { email, token, statusText } = response;
        const decode = jwt_decode(token);
        console.log(decode);
        const temp = { token };
        store.setItem("data", JSON.stringify(temp));
        // const temp = { email, password, token };
        // console.log(temp, "temp");
        // console.log(response, "response");
        // store.setItem("data", JSON.stringify(temp));
        // dispatch(userAct({ email, token }));
        dispatch(userAct( token));
        console.log(statusText);
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
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // getUserDetail(email, token)
    //   .then((response) => {
    //     store.setItem("profile", response.data);
    //     console.log(response);
    //     const { token, email } = response;
    //     const decode = jwt_decode(token);
    //     console.log(decode);
    //     const temp = { email };
    //     store.setItem("user", JSON.stringify(temp));
    //     dispatch(getProfileData(response.data));
    //     console.log(statusText);
    //   })

    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
    // } else {
    //   setLoading(false);
    // }
  };


  useEffect(() => {
    if (statusText === "Ok") {
      setVal(false);
      // setLoading(true);
      history.push("/dashboard");
    } else if (statusText === "") {
      setVal(false);
      // setLoading(true);
    } else if (statusText !== "Ok") {
      setVal(true);
      setLoading(false);
    }
  }, [statusText]);
  console.log(statusText, "status");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="container_login">
      <div className="rectangle"></div>
      <div className="slogan">
        <img src={logo} alt="" width="170px" height="50px"></img>
        <div className="slogan1_login">
          <h2>Easily manage your bill</h2>
        </div>
        <div className="slogan2_login">
          <p>All your bills at a glance, always up to date</p>
        </div>
      </div>
      <div className="form_login">
        <h3>Login</h3>
        <p>
          Don't have account?
          <a href="" onClick={handleClick}>
            {" "}
            Signup
          </a>
        </p>
        <Form onSubmit={loginHandler} ref={form}>
          <div className="email_login">
            <h6>Email</h6>
            <Input
              value={email}
              className="input-email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              validations={[required]}
            ></Input>
          </div>
          <div className="password_login">
            <h6>Password</h6>
            <Input
              value={password}
              className="input-password"
              type={passwordShown ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              // validations={[required]}
            ></Input>
            <i onClick={togglePasswordVisiblity}>{eye}</i>
          </div>

          <div className="val_form">
            {val && <span className="validasi">invalid email or password</span>}
          </div>
        </Form>
        <button type="submit" onClick={loginHandler} disabled={loading}>
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Login</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
