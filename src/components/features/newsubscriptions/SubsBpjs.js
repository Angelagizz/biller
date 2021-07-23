import React from "react";


const SubsBpjs = () => {
  const handleClick = () => {

  };
  return (
    <div className="box-bpjs">
      <div className="box_container">
        <div className="bpjs_form">
          <h3>No. VA</h3>
          <textarea type="submit" name="number"></textarea>
          <p>Please input VA number to continue</p>
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
export default SubsBpjs;
