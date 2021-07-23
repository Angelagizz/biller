import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Landline.css";
import "../electricity/TokenPln.css";
import { useHistory } from "react-router-dom";
import { setLandlineInfo } from "../../../redux/action/landlineAction";
import { getLandlineAccount } from "../../../services/landlineService";

const Landline = () => {
  const [noPhone, setNoPhone] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const token = useSelector((state) => state.user.currentUser.token);

  const handleChange = (e) => {
    setNoPhone(e.target.value);
  };

  const handleClick = () => {
    history.push(`/landline/confirmation/${noPhone}`);
    getLandlineAccount(noPhone, token)
      .then((response) => {
        console.log("data cust", response);
        setStatus(response.statusCode);
        setMessage(response.message);
        dispatch(setLandlineInfo(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="box-landline">
      <div className="box_container">
        <div className="landline_form">
          <h3>No. Customer</h3>
          <textarea
            type="submit"
            name="number"
            onChange={handleChange}
            value={noPhone}
          ></textarea>
          <p>Please input customer number to continue</p>
        </div>
      </div>
      <div className="confirm">
        <button type="submit" name="submit" onClick={handleClick}>
          Confirm
        </button>
      </div>
    </div>
  );
};
export default Landline;
