import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import "../electricity/PaymentMethodModal.css";
import PaymentModal from "../paymentmodal/PaymentModal";
import masterCardLogo from "../../assets/master-card1.png";
import visaLogo from "../../assets/visa.png";
import { changePayMethod } from "../../../redux/action/paymentAction";

const PaymentMethodModal = (props) => {
  const cardList = useSelector((state) => state.payment.paymentMethod);
  const primaryPayMethod = useSelector((state) => state.payment.primary);
  const [newPayName, setNewPayName] = useState();
  const [newPayNumber, setNewPayNumber] = useState();
  const [newPayCardHolder, setNewPayCardHolder] = useState();
  const [newCardModal, setNewCardModal] = useState(false);
  const { name, number, card_holder } = primaryPayMethod[0];
  const dispatch = useDispatch();

  const customStyles = {
    overlay: {
      background: "rgba(38, 55, 101, 0.7)",
    },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const closeModal = () => {
    props.togle(!props.togle);
  };

  function cc_format(value) {
    var matches = value.match(/.*\d{4,16}/g);
    var match = (matches && matches[0]) || "";
    var parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  }

  function maskify(cc) {
    return cc.replace(/.(?=.{4})/g, "*");
  }

  const handleRadioClick = (name, number, card_holder) => {
    setNewPayName(name);
    setNewPayNumber(number);
    setNewPayCardHolder(card_holder);
  };

  const handleSave = () => {
    dispatch(changePayMethod(newPayName, newPayNumber, newPayCardHolder));
    props.togle(!props.togle);
  };

  return (
    <>
      <Modal
        isOpen={props.togle}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="paymentmethodmodal">
          <div className="title">
            Select Payment Method <span>x</span>
          </div>
          <div className="column">
            <div className="current-payment">
              {name !== "Bank transfer" ? (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <img
                    style={{ height: "20px" }}
                    src={
                      name === "visa"
                        ? visaLogo
                        : name === "master-card"
                        ? masterCardLogo
                        : ""
                    }
                  />
                  {cc_format(maskify(number))}
                </div>
              ) : (
                name
              )}
            </div>
            <div className="payment-options">
              <div className="title">Debit/Credit Card</div>
              {cardList.map((data, index) =>
                data.name !== primaryPayMethod[0].name ? (
                  <div className="cardd" key={index}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {data.name === "Bank transfer" ? (
                        <div>
                          <input
                            type="radio"
                            name="card"
                            onClick={() =>
                              handleRadioClick(
                                data.name,
                                data.number,
                                data.card_holder
                              )
                            }
                          />
                          {data.name}
                        </div>
                      ) : (
                        <>
                          <input
                            type="radio"
                            name="card"
                            onClick={() =>
                              handleRadioClick(
                                data.name,
                                data.number,
                                data.card_holder
                              )
                            }
                          />
                          <img
                            style={{ height: "20px" }}
                            src={
                              data.name === "visa"
                                ? visaLogo
                                : data.name === "master-card"
                                ? masterCardLogo
                                : ""
                            }
                            alt="logo"
                          />
                          {cc_format(maskify(data.number))}
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )}
              {/* <div className='cardd'><input type='radio' name='card' /> Visa *** **** ***1234</div>
                                <div className='cardd'><input type='radio' name='card' /> Mastercard *** **** ***1234</div> */}
              <div
                className="btn-newcard"
                onClick={() => setNewCardModal(!newCardModal)}
              >
                Add New Card
              </div>
              {newCardModal && (
                <PaymentModal
                  togle={(newCardModal) => setNewCardModal(newCardModal)}
                />
              )}
            </div>
            <div className="btn-save" onClick={handleSave}>
              Save
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PaymentMethodModal;
