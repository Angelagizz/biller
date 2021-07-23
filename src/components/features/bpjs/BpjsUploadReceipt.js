import { ArrowBack } from '@material-ui/icons'
import '../electricity/TokenConfirmation.css'
import React, { useEffect, useRef, useState } from 'react'
import PaymentMethodModal from '../electricity/PaymentMethodModal'
import Recurring from './Recurring'
import { Link, useHistory, useParams } from 'react-router-dom'
import Timer from '../electricity/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { newBillBpjs, bpjsCustomer, uploadReceiptBpjs } from '../../../services/bpjsService'
import { setDataBillBpjs, setBpjsData, setBpjsReceipt } from '../../../redux/action/bpjsAction'
import { data } from 'jquery'
import ListLoading from '../loading/listLoader'
import ListLoader from '../loading/listLoader'
import masterCardLogo from '../../assets/master-card1.png'
import visaLogo from '../../assets/visa.png'
import Header2 from '../../pages/Header/Header2'
import ThreeDots from '../loading/threeDots'

const BpjsUploadReceipt = () =>{
    const tipe = 'bpjs';
    const statusRecurring = useSelector(state=>state.recurring.status)
    const [statusRecur, setStatusRecur]=useState(statusRecurring)
    const tgl = useSelector(state=>state.recurring.date)
    const bln = useSelector(state=>state.recurring.month)
    const thn = useSelector(state=>state.recurring.year)
    const period = useSelector(state=>state.recurring.period)
    const [statusText, setStatusText] = useState('')
    const [billId, setBillId] = useState()
    const [transactionId, setTransactionId] = useState()
    const [file, setFile] = useState()
    const history = useHistory()
    const inputFile = useRef(null)
    const dispatch = useDispatch()
    const time = new Date();
    const {id} = useParams()
    const token = useSelector(state=>state.user.currentUser.token)
    time.setSeconds(time.getSeconds() + 3600);
 
    const date =`${thn}-${bln>=10?bln:`0${bln}`}-${tgl.length===1?`0${tgl}`:tgl}`
    // console.log('date dari child', date)
    // console.log('bulan',bln)
    // console.log('status dari child', statusRecur)


    const datacusto = useSelector(state=>state.bpjs.datacusto)
    const databill = useSelector(state=>state.bpjs.databill)
    const {accountName, accountNo, bank} = databill
    console.log("data bill", databill)
    useEffect(
        () => {
            datacusto.length === 0 &&
            bpjsCustomer(id, token)
            .then((response) => {
                console.log('data', response.data)
              dispatch(setBpjsData(response.data))
            })
            .catch((error) => {
              console.log(error);
            });

            // dataCust.length!==0 &&
            // newBillInternetTv(token, dataCust, payType, statusRecur, period, date)
            // .then((response)=>{
            //     console.log('Response Create New bill di upload', response)
            //     dispatch(setDataBillInternet(response.data.payment_details))
            // })
            // .catch((error)=>{
            //     console.log(error)
            // })
            }, []
    )

    useEffect(
        () => {
            statusText === 'Ok' &&
            history.push('/bpjs/receipt')
        } , [statusText]
    )

    useEffect(
        () => {
            newBillBpjs(token, datacusto, payType, statusRecur, period, date)
            .then((response)=>{
                console.log('Response Create New bill di upload', response)
                dispatch(setDataBillBpjs(response.data.paymentDetail))
                setBillId(response.data.billId);
                setTransactionId(response.data.paymentDetail.transactionId)
            })
            .catch((error)=>{
                console.log(error)
            })
            }, [datacusto]
    )

    console.log('billid n trans id', billId, transactionId)
    console.log('file', file)

    const handleUpload = () =>{
        uploadReceiptBpjs(token, transactionId, billId, file)
        .then((response)=>{
            dispatch(setBpjsReceipt(response.data.receipt))
            console.log('response upload', response)
            setStatusText(response.statusText)

        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const payType = 'Bank Transfer'


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
    
      
      function maskify(cc) {
        return cc.replace(/.(?=.{4})/g, "*");
      }

      const formatRupiah = (data) =>{
        let reverse = data.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return ribuan;
    }
    
    return(
    <>
        <Header2 />
        <div className='dashboard-background'></div>
        <div className='containerku'>
            <div>
                <div className='space-between'>
                    <Link to='/newbill'>
                        <div><ArrowBack/></div>
                    </Link>
                    <Link className='link' to='/dashboard'>
                        <div>Back to home</div>
                    </Link>
                </div>
                <div className='gray'>Payment Confirmation</div>
                <div className='title bold1'>BPJS </div>
            </div>
            <div className='confirmation-frame' style={{marginBottom:'100px'}}>
                <div className='bill-detail'>
                    {
                            <div className='resume'>
                                <div className='gray center'>Please complete your payment in</div>
                               
                                
                                  {
                                    databill.length === 0 ?
                                    <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
                                    <ThreeDots />
                                    </div>
                                    :
                                    databill.map((data,index)=>(
                                    
                                    <>
                                     <div className='bold center'><Timer expiryTimestamp={time} /> </div>
                                        <div className='detail-list'>
                                            Total <span>Rp. {formatRupiah(datacusto[0].total)}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Bank <span>{bank}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Account Name <span>{accountName}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Account No <span>{accountNo}</span>
                                        </div>
                                        <div>
                                             <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])} />  
                                        </div>
                                        <div className='btn-upload' onClick={handleUpload}>
                                           Upload Receipt
                                        </div>
                                    </>
                                     
                                    ))
                                } 
                            </div>
                    }
                 
                    <div className='bold'>Bill Details</div>
                    <div className='detail'>
                        {
                            datacusto.length === 0 ?
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <ListLoader />
                            </div>
                            :
                            datacusto.map((data, index) =>(
                                <div key="{data.item}">
                                <div className='detail-list'>
                                    No VA<span>{data.noVa}</span>
                                </div>
                                <div className='detail-list'>
                                    Fullname<span>{data.fullName}</span>
                                </div>
                                <div className='detail-list'>
                                    Branch<span>{data.branch}</span>
                                </div>
                                <div className='detail-list space'>
                                    Family Member<span>{data.familyMember}</span>
                                </div>
                                <div className='detail-list'>
                                    Payment Period<span>{data.period}</span>
                                </div>
                                <div className='detail-list'>
                                    Count Month<span>{data.countMonth}</span>
                                </div>
                                <div className='detail-list'>
                                    Bill<span>Rp. {formatRupiah(data.bill)}</span>
                                </div>
                                <div className='detail-list'>
                                    Admin<span>Rp. {formatRupiah(data.adminFee)}</span>
                                </div>
                                <div className='detail-list'>
                                    <span>Total</span><span>Rp. {formatRupiah(data.total)}</span>
                                </div>
                                </div>
                            ))
                        }
              
                    </div>
                </div>
                {
                    statusRecurring &&  <Recurring statusRecur={statusRecur=>setStatusRecur(statusRecur)} tipe={tipe} />
                }
               
            </div>
          
        </div>
    </>
    )
}

export default BpjsUploadReceipt