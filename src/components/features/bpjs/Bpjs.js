import React, { useState, useRef, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import "./Bpjs.css";
import { setRecurringStatus } from '../../../redux/action/recurringAction'
import { setBpjsData, setDataBillBpjs } from '../../../redux/action/bpjsAction'
import { bpjsCustomer, newBillBpjs } from '../../../services/bpjsService'
import { useHistory } from "react-router-dom";
import '../electricity/Electricity.css'
import '../electricity/TokenPln.css'
import ThreeDots from '../loading/threeDots'

const Bpjs = () => {
  const history = useHistory();
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [customerNumber, setCustomerNumber] = useState("");
  const [month, setMonth] = useState("")
  const form = useRef();
  const token = useSelector(state=>state.user.currentUser.token)

  const handleClick = (e) => { 
    setCustomerNumber(e.target.value)
  };

  const handleChange = () => {
    history.push(`/bpjs/confirmation/${customerNumber}`);
    dispatch(setRecurringStatus(false))
    setStatus()
    setLoading(!loading)
    bpjsCustomer(customerNumber, token)
      .then((response) => {
        console.log('data cust', response);
        setStatus(response.statusCode)
        setMessage(response.message)
        dispatch(setBpjsData(response.data))
      })
      .catch((error) => {
        console.log(error);
        setStatus(500)
        setMessage(`Can't Find Data`)
      });
  }
  useEffect(() => {
        if (status === 200) {
       history.push(`/bpjs/confirmation/${customerNumber}`);
        } else if (status == 500){
        setLoading(!loading)
        }
    }, [status]);
  return (
    <div className="box-bpjs">
      <div className="box_container">
        <div className="bpjs_form">
          <h3>No. VA</h3>
          <textarea
            type="submit"
            name="number"
            value={customerNumber}
            onChange={handleClick}
          ></textarea>
          {
              status == 500 ?
              <div className='space center' style={{backgroundColor:'pink', color:'red', padding:'10px'}}>{message}</div>
              :
              <div className='gray space center'>Please input your number to continue</div>
          }
        </div>
      </div>
      <div className="btn-wrapper">
        {
                    (customerNumber.length >= 10 ) ? 
                    <button className="confirm-btn" onClick={handleChange} disabled={loading} >
                    {loading && (
                         <span className="spinner-border spinner-border-sm"></span>
                     )}
                        Confirm
                    </button>: <div className="disable-btn">Confirm</div>
                    }  
      </div>
    </div>
  );
};
export default Bpjs;
