import React, { useState } from "react";
// import SearchField from "react-search-field";
import SearchIcon from "@material-ui/icons/Search";

const SubsPdam = () => {
  const [q, setQ] = useState("");
  const dropdownlist = [
    {
      "btn-id": 1,
      name: "DKI Jakarta",
    },
    {
      "btn-id": 2,
      name: "Kota Surabaya",
    },
    {
      "btn-id": 3,
      name: "Solo",
    },
    {
      "btn-id": 4,
      name: "Kota Bandung",
    },
    {
      "btn-id": 5,
      name: "Kab Bandung",
    },
  ];

  const handleChange = (value) => {
    setQ(value);
    console.log(value);
  };
  const handleClick = () => {
  
  };
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
              value={""}
            />
            <i className="search-icon">
              <SearchIcon />
            </i>
          </div>
          {q !== "" && (
            <div className="search-boxes">
              {dropdownlist.map((b, i) => {
                return (
                  <div className="boxes" key={i}>
                    <span className="btn-box">{b.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="pdam_customer">
          <p>No. Customer</p>
          <textarea
            type="submit"
            name="nocustomer"
            placeholder="e.g. 1234567890"
          ></textarea>
        </div>
      </div>
      <div className="button_pdam">
        <button type="submit" name="submit" onClick={handleClick}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SubsPdam;
