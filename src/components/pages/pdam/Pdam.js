import React, { useState, useEffect } from "react";
// import SearchField from "react-search-field";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { setRecurringStatus } from '../../../redux/action/recurringAction'
import { getRegion, getPdamAccount } from "../../../services/pdamService";
import { setSearchKey, getRegionAll, getAccountPdam } from "../../../redux/action/pdamAction";
import { useDispatch, useSelector } from "react-redux";
import '../../features/electricity/Electricity.css';
import '../../features/electricity/TokenPln.css';
import "./Pdam.css";

const Pdam = () => {
  // const [q, setQ] = useState("");
  const [nocust, setNocust]=useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState()
  const [loading, setLoading] = useState(false);
  const regions = useSelector((state) => state.pdam.data);
  const [month, setMonth] = useState("")
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.currentUser.token);

  const [region, setRegion] = useState("");

  console.log(regions);
  useEffect(() => {
    getRegion(token) 
      .then((response) => {
        // setRegion(response.data);
        console.log(response);
        dispatch(getRegionAll(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(region);

  const handleChange = (e) => {
    setRegion(e.target.value);
    dispatch(setSearchKey(e.target.value));
    // console.log(value);
  };
  const handleInputChange =(e)=>{
        setNocust(e.target.value)    
    }
  const handleClick = () => {
    history.push(`/pdam/confirmation/${nocust}`);
    dispatch(setRecurringStatus(false))
    setStatus()
    setLoading(!loading)
    getPdamAccount(nocust, token)
    .then((response) => {
          console.log('no cust', response);
          setStatus(response.statusCode)
          setMessage(response.message)
          dispatch(getAccountPdam(response.data))
        })
        .catch((error) => {
          console.log(error);
          setStatus(500)
          setMessage(`Can't Find Data`)
        });
  };
  useEffect(() => {
        if (status === 200) {
       history.push(`/pdam/confirmation/${nocust}`);
        } else if (status == 500){
        setLoading(!loading)
        }
    }, [status]);
  const regionSearch = regions.filter((data) => {
    return Object.values(data)
      .join("")
      .toLowerCase()
      .includes(region.toLowerCase());
  });
  return (
    <div className="pdam_container">
      <div className="pdam_container1">
        <div className="pdam_search">
          <p>Service Area</p>
          <div className="kolom_search">
            <input
              type="text"
              placeholder="Please select"
              onChange={handleChange}
              value={region}
            />
            <i className="search-icon">
              <SearchIcon />
            </i>
          </div>
          {region !== "" && (
            <div className="search-boxes">
              {regionSearch.map((b, i) => (
                <div className="boxes" key={i}>
                  <span className="btn-box">{b.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="pdam_customer">
          <p>No. Customer</p>
          <textarea
            type="submit"
            name="nocustomer"
            placeholder="e.g. 1234567890"
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>
      <div className="btn-wrapper">
        {
                    (nocust.length >= 10 ) ? 
                    <button className="confirm-btn" onClick={handleClick} disabled={loading} >
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

export default Pdam;
