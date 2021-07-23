import React, { useState } from "react";
import "../electricity/TokenConfirmation.css";
import infoicon from "../../assets/info-icon.png";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Bulan from "../electricity/Bulan";
import Tahun from "../electricity/Tahun";
import { useDispatch } from "react-redux";
import {
  setRecurringPeriod,
  setRecurringDate,
  setRecurringMonth,
  setRecurringYear,
  setRecurringDay,
} from "../../../redux/action/recurringAction";

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

const RecurringBill = (props) => {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState("");
  const [day, setDay] = useState("");
  const [tgl, setTgl] = useState("");
  const [tanggal, setTanggal] = useState("");
  const date = new Date();
  const bulan = date.getMonth() + 1;
  const tahun = date.getFullYear();

  console.log(period);
  dispatch(setRecurringPeriod(period));
  dispatch(setRecurringDate(tgl));
  dispatch(setRecurringMonth(bulan + 1));
  dispatch(setRecurringYear(tahun));
  dispatch(setRecurringDay(day));
  console.log("props tipe", props.tipe);
  return (
    <div>
      <div className="recurring-menu">
        <div className="formgroup">
          <label>Period</label>
          <select onChange={(e) => setPeriod(e.target.value)}>
            <option value="" disabled selected>
              Please Select
            </option>
            <option
              disabled={
                props.tipe === "internet" ||
                (props.tipe === "electricity-tagihan" && true)
              }
              value="Week"
            >
              Every Week
            </option>
            <option value="Month">Every Month</option>
            <option
              disabled={
                props.tipe === "internet" ||
                (props.tipe === "electricity-tagihan" && true)
              }
              value="Year"
            >
              Every Year
            </option>
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

        <div className="information">
          <img src={infoicon} alt="icon" />
          <div style={{ padding: "10px" }}>
            {period == "Week" && day !== null && (
              <>
                <div>
                  Next payment will due <span>{day} Next Week</span>
                </div>
                <div>Pay before {day}, 23:59 to avoid late payment fee</div>
              </>
            )}

            {period == "Month" && tgl !== null && (
              <>
                <div>
                  Next payment will due{" "}
                  <span>
                    {tgl} <Bulan bulan={bulan + 1} /> {tahun}{" "}
                  </span>
                </div>
                <div>
                  Pay before {tgl} <Bulan bulan={bulan + 1} /> {tahun}, 23:59 to
                  avoid late payment fee
                </div>
              </>
            )}

            {period == "Year" && tanggal !== null && (
              <>
                <div>
                  Next payment will due{" "}
                  <span>
                    <Tahun data={tanggal} />{" "}
                  </span>
                </div>
                <div>
                  Pay before <Tahun data={tanggal} /> , 23:59 to avoid late
                  payment fee
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringBill;
