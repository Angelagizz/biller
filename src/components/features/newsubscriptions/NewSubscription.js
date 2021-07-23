import React, { useState } from "react";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./NewSubscription.css";
import nobill from "../../assets/nobill.png";
import NewSubsModal from "./NewSubsModal";
import BillList from "./BillList";
import { useSelector, useDispatch } from "react-redux";
import { setCloseModal } from "../../../redux/action/landlineAction";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const NewSubscription = () => {
  const [period, setPeriod] = useState();
  const statusModal = useSelector((state) => state.landline.statusModal);
  const [openModal, setOpenModal] = useState(statusModal);
  const [coba, setCoba] = useState(true);
  const [id, setId] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const [day, setDay] = useState("");
  const [tgl, setTgl] = useState("");
  const [tanggal, setTanggal] = useState("");
  const date = new Date();
  const bulan = date.getMonth() + 1;
  const tahun = date.getFullYear();

  const handleClick = () => {
    history.push("/recurring/subscription");
  };

  const billlist = [
    {
      id: "0226012345",
      name: "Landline",
      total: "75000",
    },
    {
      id: "02314032045",
      name: "Landline",
      total: "90000",
    },
    {
      id: "0226012345",
      name: "Landline",
      total: "50000",
    },
    {
      id: "02354013078",
      name: "Landline",
      total: "100000",
    },
  ];

  const listfilter = billlist.filter((data) => data.id === id);

  console.log("ini data filter", listfilter);
  console.log("openmodal", openModal);
  console.log("status modal", statusModal);

  return (
    <div className="containerku">
      <div className="dashboard-background"></div>
      <div className="arrow-icon">
        <Link to={"/biller/subscription"}>
          <ArrowBack />
        </Link>
        <div className="gray">Select Bills</div>
        <div className="bold">New Subscription</div>
      </div>
      <div className="recurring-container box">
        <div className="bold">Recurring Billing</div>
        <div className="gray">
          Create automatic billing for your next purchase. Available in weekly,
          montly and yearly basis
        </div>
        <div className="line-white"></div>
        <div className="bold">Period</div>
        <div className="formgroup half">
          <select onChange={(e) => setPeriod(e.target.value)}>
            <option value="" disabled selected>
              Please Select
            </option>
            <option value="Week">Every Week</option>
            <option value="Month">Every Month</option>
            <option value="Year">Every Year</option>
          </select>
        </div>

        {period === "Week" && (
          <div className="formgroup">
            <label>Day</label>
            <select onChange={(e) => setDay(e.target.value)}>
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          </div>
        )}
        {period === "Month" && (
          <div className="formgroup">
            <label>Date</label>
            <select onChange={(e) => setTgl(e.target.value)}>
              <option value="1" disabled selected>
                {" "}
                Pick Date
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
            </select>
          </div>
        )}

        {period === "Year" && (
          <div className="formgroup">
            <label>Date</label>
            <TextField
              onChange={(e) => setTanggal(e.target.value)}
              id="date"
              type="date"
              defaultValue={date}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        )}
      </div>
      <div className="addnewbill box">
        <div className="title">
          <div className="bold">Bills</div>
          <div
            className="btn-newbill"
            onClick={() => dispatch(setCloseModal())}
          >
            Add New Bill
          </div>
          {statusModal && (
            <NewSubsModal togle={(openModal) => setOpenModal(openModal)} />
          )}
        </div>
        <div className="s-white"></div>
        {billlist.length !== 0 ? (
          <BillList
            id={(id) => setId(id)}
            listfilter={listfilter}
            data={billlist}
          />
        ) : (
          <>
            <div className="img-container">
              <img src={nobill} alt="icon" />
            </div>
            <div className="gray center">No Bill Found</div>
          </>
        )}
      </div>
      <div className="right">
        <div className="btn-hijau" onClick={handleClick}>
          Create
        </div>
      </div>
    </div>
  );
};

export default NewSubscription;
