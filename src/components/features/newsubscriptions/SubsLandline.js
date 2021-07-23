import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../electricity/TokenPln.css";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  setLandlineInfo,
  setCloseModal,
} from "../../../redux/action/landlineAction";
import { getLandlineAccount } from "../../../services/landlineService";

const SubsLandline = () => {
  const [noPhone, setNoPhone] = useState("");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const history = useHistory();
  const token = useSelector((state) => state.user.currentUser.token);

  const handleChange = (e) => {
    setNoPhone(e.target.value);
  };

  const handleClick = () => {
    // history.push("/newSubscription");
    getLandlineAccount(noPhone, token)
      .then((response) => {
        console.log("data cust", response);
        setStatus(response.statusCode);
        setMessage(response.message);
        dispatch(setLandlineInfo(response.data));
        dispatch(setCloseModal());
      })
      .catch((error) => {
        console.log(error);
        dispatch(setCloseModal());
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
export default SubsLandline;
