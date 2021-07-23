import React, { useState } from "react";
import gambar from "../../assets/icon-subs.png";
import "../history/main/MainHistory.css";
import doc from "../../assets/doc.jpg";
import DownIcon from "@material-ui/icons/SystemUpdateAlt";
import garis from "../../assets/vector.png";
import Header2 from "../Header/Header2";

const Notif = () => {
  const [fbutton, setFbutton] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState();

  const historylist = [
    {
      nometer: "141234567890",
      id: "511234567890",
      name: "Justin Junaedi",
      tarif: "R1/2200 VA",
      ref: "0213170Z1E5B19370EA",
      kwh: "32,1",
      stroom: "46.296,00",
      ppj: "3.704,00",
      admin: "1.500,00",
      total: "51.500,00",
      token: "4060 7604 1644 1230 5567",
    },
  ];
  const historyfilter = historylist.filter((data) => data.id === id);
  return (
    <div className="main_container">
      <Header2 />
      <div className="payment_history">
        <div className="subtitle1">
          <h2>Notification</h2>
        </div>
        <div className="subtitle2">
          <p onClick={() => setFbutton(!fbutton)}>Filter</p>
          {fbutton && (
            <form>
              <div className="filter_card">
                <div>
                  <input type="radio" name="primary-card" /> Today
                </div>
              </div>
              <div className="filter_card">
                <div>
                  <input type="radio" name="primary-card" /> Last week
                </div>
              </div>
              <div className="filter_card">
                <div>
                  <input type="radio" name="primary-card" /> Last month
                </div>
              </div>
              <div className="filter_card">
                <div>
                  <input type="radio" name="primary-card" /> Last 3 months
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="history">
        <div className="kotak_payment">
          <div className="history_date">
            <span>12 May 2021</span>
          </div>
          {historylist.map((data, index) => (
            <div
              className="pertama_kotak"
              key={index}
              onClick={() => setId(data.id)}
            >
              <img src={gambar} alt="token" width="45" height="45"></img>
              <div className="baris_kotak">
                <h6>PLN - Token</h6>
                <p>141234567890</p>
              </div>

              <div className="price_kotak">Rp.51.500</div>
            </div>
          ))}
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>PLN - Token</h6>
              <p>141234567890</p>
            </div>

            <div className="price_kotak">Rp.51.500</div>
          </div>
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>Pulsa - Telkomsel</h6>
              <p>082134567890</p>
            </div>
            <div className="price_kotak">Rp.51.500</div>
          </div>

          <div className="history_date">
            <span>10 May 2021</span>
          </div>
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>PLN - Token</h6>
              <p>141234567890</p>
            </div>

            <div className="price_kotak">Rp.51.500</div>
          </div>
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>PLN - Token</h6>
              <p>141234567890</p>
            </div>

            <div className="price_kotak">Rp.51.500</div>
          </div>
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>PLN - Token</h6>
              <p>141234567890</p>
            </div>

            <div className="price_kotak">Rp.51.500</div>
          </div>
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>PLN - Token</h6>
              <p>141234567890</p>
            </div>

            <div className="price_kotak">Rp.51.500</div>
          </div>
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>Pulsa - Telkomsel</h6>
              <p>082134567890</p>
            </div>
            <div className="price_kotak">Rp.51.500</div>
          </div>
          <div className="history_date">
            <span>10 May 2021</span>
          </div>
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>PLN - Token</h6>
              <p>141234567890</p>
            </div>

            <div className="price_kotak">Rp.51.500</div>
          </div>
          <div className="pertama_kotak">
            <img src={gambar} alt="token" width="45" height="45"></img>
            <div className="baris_kotak">
              <h6>Pulsa - Telkomsel</h6>
              <p>082134567890</p>
            </div>
            <div className="price_kotak">Rp.51.500</div>
          </div>
        </div>

        {/* <div className="empty">
          <img src={doc} alt="" width="100" heigh="100"></img>
          <p>Click the list to show receipt</p>
        </div> */}
        <div className="empty">
          {historyfilter.length == 0 ? (
            <div className="image-history">
              <img src={doc} alt="icon" width="100" height="100" />
              <div className="grayyy">Click the list to show details</div>
            </div>
          ) : (
            <div className="history-list-preview">
              <div className="receipt_history">
                <div className="title_receipt_history">
                  <p>Receipt</p>
                  <div className="history-list abuu">
                    <DownIcon fontSize="small" />
                    Download
                  </div>
                </div>
                <img src={garis} alt="garis" className="borderline"></img>
              </div>
              <div className="detail-history">
                {historyfilter.map((data) => (
                  <>
                    <div className="history-list">
                      No Meter<span>{data.nometer}</span>
                    </div>
                    <div className="history-list">
                      IDPEL<span>{data.id}</span>
                    </div>
                    <div className="history-list">
                      Nama<span>{data.name}</span>
                    </div>
                    <div className="history-list">
                      Tarif/Daya<span>{data.tarif}</span>
                    </div>
                    <div className="history-list">
                      Ref<span>{data.ref}</span>
                    </div>
                    <div className="coref">
                      <span>{data.ref}</span>
                    </div>
                    <div className="history-list">
                      kWh<span>{data.kwh}</span>
                    </div>
                    <div className="history-list">
                      Rp Stroom/Token<span>Rp {data.stroom}</span>
                    </div>
                    <div className="history-list">
                      PPJ<span>Rp {data.ppj}</span>
                    </div>
                    <div className="history-list">
                      Admin<span>Rp {data.admin}</span>
                    </div>
                    <div className="history-list bolddd">
                      Total<span>{data.total}</span>
                    </div>
                    <div className="history-list">Stroom / Token</div>
                    <div className="token">
                      <span>{data.token}</span>
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notif;
