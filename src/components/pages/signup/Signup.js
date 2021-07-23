import React, { useState, useRef } from "react";
import "./Signup.css";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo-biller.png";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { register } from "../../../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";

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

const Signup = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [pinShown, setPinShown] = useState(false);
  // const { handleSubmit } = useForm();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const history = useHistory();

  const handleClick = () => {
    history.push("/biller/login");
  };
  const handleSubmit = (e) => {
    // console.log(data);
    history.push("/biller/login");

    e.preventDefault();
    setLoading(true);

    form.current.validateAll();

    const store = window.localStorage;
    register(firstname, lastname, email, password, pin)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const togglePinVisiblity = () => {
    setPinShown(pinShown ? false : true);
  };
  return (
    <div className="container_signup">
      <div className="rectangle_signup"></div>
      <div className="slogan_signup">
        <img src={logo} alt="" width="170px" height="50px"></img>
        <div className="slogan1">
          <h2>Easily manage your bill</h2>
        </div>
        <div className="slogan2">
          <p>All your bills at a glance, always up to date</p>
        </div>
      </div>
      <div className="form">
        <h3>Signup</h3>
        <p>
          Already have account?
          <a href="" onClick={handleClick}>
            {" "}
            Login
          </a>
        </p>

        <div className="flex">
          <Form onSubmit={handleSubmit} ref={form}>
            <div className="flex-box2">
              <div className="firstname">
                <h6>First Name</h6>
                <Input
                  type="firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="First Name"
                  value={firstname}
                ></Input>
              </div>
              <div className="lastname">
                <h6>Last Name</h6>
                <Input
                  type="lastname"
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last Name"
                  value={lastname}
                ></Input>
              </div>
            </div>
          </Form>
        </div>
        <Form onSubmit={handleSubmit} ref={form}>
          <div className="email">
            <h6>Email</h6>
            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              validations={[required]}
            ></Input>
          </div>
          <div className="password">
            <h6>Password</h6>
            <Input
              type={passwordShown ? "text" : "password"}
              value={password}
              placeholder="Password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <i onClick={togglePasswordVisiblity}>{eye}</i>
          </div>
          <div className="pin">
            <h6>Pin</h6>
            <Input
              type={pinShown ? "text" : "pin"}
              value={pin}
              placeholder="Pin"
              onChange={(e) => setPin(e.target.value)}
            ></Input>
            <i onClick={togglePinVisiblity}>{eye}</i>
          </div>
        </Form>

        <button type="submit" onClick={handleSubmit} disabled={loading}>
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Signup</span>
        </button>
      </div>
    </div>
  );
};
export default Signup;
