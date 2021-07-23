import React, { useEffect, useState } from "react";
import gambar from "../../../assets/icon-subs.png";
import "./MainHistory.css";
import doc from "../../../assets/doc.jpg";
import DownIcon from "@material-ui/icons/SystemUpdateAlt";
import garis from "../../../assets/vector.png";
import Header2 from "../../Header/Header2";
import { getDataHistory, filterDataHistoryToday,filterDataHistoryLastWeek,filterDataHistoryLastMonth, filterDataHistoryLast3Month, getHistoryDetail } from "../../../../services/historyService";
import { useDispatch, useSelector } from "react-redux";
import { setDataHistory, setHistoryDetail, setHistoryLoading } from "../../../../redux/action/historyAction";
import { data } from "jquery";
import ThreeDots from '../../../features/loading/threeDots'
import $ from "jquery";

const MainHistory = () => {
  const token = useSelector(state=>state.user.currentUser.token)
  const [detail, setDetail] = useState([])
  const [fbutton, setFbutton] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState();
  const dispatch = useDispatch()
  const listHistory = useSelector(state=>state.history.dataHistory)
  const historyDetail = useSelector(state=>state.history.historyDetail)
  const loading = useSelector(state=>state.history.historyLoading)
  const [type, setType] = useState('')
  console.log('history', listHistory)

  const formatRupiah = (data) => {
    let reverse = data.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

    //jquery
    $(document).ready(function () {
      $(".kotak_payment").on("click", ".pertama_kotak", function () {
        $(".pertama_kotak").removeClass("akktiv");
        $(this).addClass("akktiv");
      });
    });


  // const historylist = [
  //   {
  //     nometer: "141234567890",
  //     id: "511234567890",
  //     name: "Justin Junaedi",
  //     tarif: "R1/2200 VA",
  //     ref: "0213170Z1E5B19370EA",
  //     kwh: "32,1",
  //     stroom: "46.296,00",
  //     ppj: "3.704,00",
  //     admin: "1.500,00",
  //     total: "51.500,00",
  //     token: "4060 7604 1644 1230 5567",
  //   },
  // ];
  // const historyfilter = historylist.filter((data) => data.id === id);

  // console.log('history detail', historyDetail)
  // console.log('type', type)
  // console.log('loading', loading)

  useEffect(
    ()=>{
      getDataHistory(token)
      .then((response)=>{
        console.log('response getDataHistory', response)
        dispatch(setDataHistory(response.data))
      })
      .catch((error)=>{
        console.log('error getDataHistory', error)
      })
    }
  ,[])

  const filterToday=()=>{
    filterDataHistoryToday(token)
    .then((response)=>{
      console.log('response filter today', response)
      dispatch(setDataHistory(response.data))
    })
    .catch((error)=>{
      console.log('error filter today', error)
    })
  }

  const filterLastWeek=()=>{
    filterDataHistoryLastWeek(token)
    .then((response)=>{
      console.log('response filter lastweek', response)
      dispatch(setDataHistory(response.data))
    })
    .catch((error)=>{
      console.log('error filter lastweek', error)
    })
  }

  const filterLastMonth=()=>{
    filterDataHistoryLastMonth(token)
    .then((response)=>{
      console.log('response filter lastmonth', response)
      dispatch(setDataHistory(response.data))
    })
    .catch((error)=>{
      console.log('error filter lastmonth', error)
    })
  }

  const filterLast3Month=()=>{
    filterDataHistoryLastMonth(token)
    .then((response)=>{
      console.log('response filter last3month', response)
      dispatch(setDataHistory(response.data))
    })
    .catch((error)=>{
      console.log('error filter last3month', error)
    })
  }

  const handlePick = (id, type) =>{
    setType(type)
    setHistoryLoading()
    getHistoryDetail(token, id)
    .then((response)=>{
      console.log('response get history detail', response)
      dispatch(setHistoryDetail(response.data.receipt))
    })
    .catch((error)=>{
      console.log('error get history detail', error)
    })
  }

  function cc_format(value) {
    var matches = value.match(/.*\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
}

  return (
    <div className="main_container">
      <Header2 />
      <div className="payment_history">
        <div className="subtitle1">
          <h2>Payment History</h2>
        </div>
        <div className="subtitle2">
          <p onClick={() => setFbutton(!fbutton)}>Filter</p>
          {fbutton && (
            <form>
              <div className="filter_card">
                <div>
                  <input type="radio" name="primary-card" onClick={filterToday}/> Today
                </div>
              </div>
              <div className="filter_card">
                <div>
                  <input type="radio" name="primary-card" onClick={filterLastWeek} /> Last week
                </div>
              </div>
              <div className="filter_card">
                <div>
                  <input type="radio" name="primary-card" onClick={filterLastMonth} /> Last month
                </div>
              </div>
              <div className="filter_card">
                <div>
                  <input type="radio" name="primary-card" onClick={filterLast3Month} /> Last 3 months
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="history">
        <div> 
          {
          listHistory === undefined ? 
          
            <div className='kotak_payment'>
              <div className="history_date">
                    <span>No History to Show</span>
              </div>
              <div className="pertama_kotak" style={{padding:'20px 0px', display:'flex', justifyContent:'center'}}>
                    <span>No History to Show</span>
              </div>
            </div> 
         : listHistory.length === 0 ?

          <div className='kotak_payment'>
             <div className="history_date">
                    <span><ThreeDots /></span>
              </div>
              <div className="pertama_kotak" style={{padding:'20px 0px', display:'flex', justifyContent:'center'}}>
                    <span><ThreeDots /></span>
              </div>
          </div> 
          :
          <div className='kotak_payment'>
            {
            listHistory.map((data, index)=>(
              <>
                <div className="history_date">
                    <span>{Object.keys(data)}</span>
                </div>
                {Object.values(data).map((d,i)=>(
                  <>
                     {
                       d.map((data,index)=>(
                        <div
                        className="pertama_kotak"
                        key={index}
                        onClick={() => handlePick(data.bill_id, data.bill_type)}
                        //setDetail([data]), 
                      >
                        <div style={{display:'flex', justifyContent:'flex-start'}}>
                          <img src={gambar} alt="token" width="45" height="45" style={{marginRight:'10px'}}></img>
                            <div className="baris_kotak">
                              <h6>{data.bill_type}</h6>
                              <p>{data.customer_number}</p>
                            </div>
                          </div>
                          <div className="price_kotak">Rp. {formatRupiah(data.total)}</div>
                        </div>
                       ))
                     }
                  </>
                ))}
              </>
              )
            )
            }
          </div>
          }
      
          {/* {historylist.map((data, index) => (
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
          {historylist.map((data, index) => (
            <div
              className="pertama_kotak"
              key={index}
              onClick={() => setId(data.id)}
            >
              <img src={gambar} alt="token" width="45" height="45"></img>
              <div className="baris_kotak">
                <h6>Pulsa - Telkomsel</h6>
                <p>082134567890</p>
              </div>
              <div className="price_kotak">Rp.51.500</div>
            </div>
          ))}
          <div className="history_date">
            <span>10 May 2021</span>
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
          ))} */}
          {/* {historylist.map((data, index) => (
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
          {historylist.map((data, index) => (
            <div
              className="pertama_kotak"
              key={index}
              onClick={() => setId(data.id)}
            >
              <img src={gambar} alt="token" width="45" height="45"></img>
              <div className="baris_kotak">
                <h6>Pulsa - Telkomsel</h6>
                <p>082134567890</p>
              </div>
              <div className="price_kotak">Rp.51.500</div>
            </div>
          ))}
          <div className="history_date">
            <span>10 May 2021</span>
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
          {historylist.map((data, index) => (
            <div
              className="pertama_kotak"
              key={index}
              onClick={() => setId(data.id)}
            >
              <img src={gambar} alt="token" width="45" height="45"></img>
              <div className="baris_kotak">
                <h6>Pulsa - Telkomsel</h6>
                <p>082134567890</p>
              </div>
              <div className="price_kotak">Rp.51.500</div>
            </div>
          ))} */}
        </div>

        {/* <div className="empty">
          <img src={doc} alt="" width="100" heigh="100"></img>
          <p>Click the list to show receipt</p>
        </div> */}
        <div className="empty">
          {historyDetail.length == 0 ? (
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
                { type === 'Listrik-Token' && historyDetail.map((data) => (
                  <div key="{data.item}">
                    <div className="history-list">
                      No Meter<span>{data.meter_number}</span>
                    </div>
                    <div className="history-list">
                      IDPEL <span>{data.customer_number}</span>
                    </div>
                    <div className="history-list">
                      Tarif/Daya<span>{data.power}</span>
                    </div>
                    <div className="history-list">
                      kWh<span>{data.kwh}</span>
                    </div>
                    <div className="history-list">
                      Rp Stroom/Token<span>Rp. {data.token !== undefined && formatRupiah(data.token)}</span>
                    </div>
                    <div className="history-list">
                      PPJ<span>Rp. {data.ppj !== undefined ? formatRupiah(data.ppj): '....'}</span>
                    </div>
                    <div className="history-list">
                      Admin<span>Rp. {data.admin_fee !== undefined ? formatRupiah(data.admin_fee) : '....'}</span>
                    </div>
                    <div className="history-list bolddd">
                      Total<span>Rp. {data.total !== undefined ? formatRupiah(data.total) : '....'}</span>
                    </div>
                    <div className="history-list">Stroom / Token</div>
                    <div className="token">
                      <span>{data.stroom_code !== undefined ? cc_format(data.stroom_code) : '....'}</span>
                    </div>
                  </div>
                ))}
                { type === 'Internet-TV' &&  historyDetail.map((data) => (
                  <div key="{data.item}">
                    <div className="history-list">
                      No Customer<span>{data.customer_number}</span>
                    </div>
                    <div className="history-list">
                      Provider <span>{data.provider}</span>
                    </div>
                    <div className="history-list space">
                      Bill<span>Rp. {data.bill_fee !== undefined ? formatRupiah(data.bill_fee) : '....'}</span>
                    </div>
                    <div className="history-list">
                      Admin<span>Rp. {data.admin_fee !== undefined ? formatRupiah(data.admin_fee) : '....'}</span>
                    </div>
                    <div className="history-list bolddd total">
                      Total<span>Rp. {data.total !== undefined ? formatRupiah(data.total) : '....'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MainHistory;
