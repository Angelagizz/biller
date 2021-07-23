import { ArrowBack } from '@material-ui/icons'
import '../electricity/TokenConfirmation.css'
import React, { useEffect, useRef, useState } from 'react'
import PaymentMethodModal from '../electricity/PaymentMethodModal'
import Recurring from './Recurring'
import { Link, useHistory, useParams } from 'react-router-dom'
import Timer from '../electricity/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { getInternetAccount, newBillInternetTv, uploadReceiptInternet } from '../../../services/internettvService'
import { setDataBillInternet, setInternetCust, setInternetCustNoPin, setInternetReceipt } from '../../../redux/action/internetAction'
import { data } from 'jquery'
import ListLoading from '../loading/listLoader'
import ListLoader from '../loading/listLoader'
import masterCardLogo from '../../assets/master-card1.png'
import visaLogo from '../../assets/visa.png'
import Header2 from '../../pages/Header/Header2'
import ThreeDots from '../loading/threeDots'

const InternetUploadReceipt = () =>{
    const tipe = 'internet';
    const statusRecurring = useSelector(state=>state.recurring.status)
    const [statusRecur, setStatusRecur]=useState(statusRecurring)
    const tgl = useSelector(state=>state.recurring.date)
    const bln = useSelector(state=>state.recurring.month)
    const thn = useSelector(state=>state.recurring.year)
    const period = useSelector(state=>state.recurring.period)
    const [statusText, setStatusText] = useState('')
    const [billId, setBillId] = useState()
    const [transactionId, setTransactionId] = useState()
    const history = useHistory()
    const inputFile = useRef(null)
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    const time = new Date();
    const {id} = useParams()
    const token = useSelector(state=>state.user.currentUser.token)
    time.setSeconds(time.getSeconds() + 3600);
 
    const date =`${thn}-${bln>=10?bln:`0${bln}`}-${tgl.length===1?`0${tgl}`:tgl}`
    // console.log('date dari child', date)
    // console.log('bulan',bln)
    // console.log('status dari child', statusRecur)


    const dataCust = useSelector(state=>state.internet.datacust)
    const dataBill = useSelector(state=>state.internet.dataBill)
    useEffect(
        () => {
            dataCust.length === 0 &&
            getInternetAccount(id, token)
            .then((response) => {
                console.log('data', response.data)
              dispatch(setInternetCust(response.data))
            })
            .catch((error) => {
              console.log(error);
            });
        } , []
    )

    useEffect(
        () => {
            statusText === 'Ok' &&
            history.push('/internettv/receipt')
        } , [statusText]
    )

    useEffect(
        ()=>{  
            dataCust.length!==0 &&
            newBillInternetTv(token, dataCust, payType, statusRecur, period, date)
            .then((response)=>{
                console.log('Response Create New bill di upload', response)
                dispatch(setDataBillInternet(response.data.payment_details))
                setBillId(response.data.billId);
                setTransactionId(response.data.transactionId)
            })
            .catch((error)=>{
                console.log(error)
            })
            }
     , [dataCust]
    )

    console.log('billid n trans id', billId, transactionId)
    console.log('file', file)

    const handleUpload = () =>{
        uploadReceiptInternet(token, transactionId, billId, file)
        .then((response)=>{
            dispatch(setInternetReceipt(response.data.receipt))
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
                <div className='title bold1'>Internet TV </div>
            </div>
            <div className='confirmation-frame' style={{marginBottom:'100px'}}>
                <div className='bill-detail'>
                    {
                            <div className='resume'>
                                <div className='gray center'>Please complete your payment in</div>
                               
                                {
                                    dataBill.length === 0 ?
                                    <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
                                    <ThreeDots />
                                    </div>
                                    :
                                    dataBill.map((data,index)=>(
                                    <>
                                     <div className='bold center'><Timer expiryTimestamp={time} /> </div>
                                        <div className='detail-list'>
                                            Total <span>{data.total}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Bank <span>{data.bank}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Account Name <span>{data.account_name}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Account No <span>{data.account_number}</span>
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
                            dataCust.length === 0 ?
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <ListLoader />
                            </div>
                            :
                            dataCust.map((data, index) =>(
                                <>
                                <div className='detail-list'>
                                    No Customer<span>{data.customer_number}</span>
                                </div>
                                <div className='detail-list'>
                                    Name<span>{data.name}</span>
                                </div>
                                <div className='detail-list'>
                                    Address<span>{data.address}</span>
                                </div>
                                <div className='detail-list space' style={{display:'flex', alignItems:'flex-start'}}>
                                    Period<span style={{textAlign:'right'}}>{data.payment_period.map((d,i)=>(<div key={i}>{d}</div>))}</span>
                                </div>
                                <div className='detail-list'>
                                    Provider<span>{data.provider}</span>
                                </div>
                                <div className='detail-list'>
                                    Late Payment Fee<span>{data.late_payment}</span>
                                </div>
                                <div className='detail-list'>
                                    Admin<span>{data.admin_fee}</span>
                                </div>
                                <div className='detail-list'>
                                    <span>Total</span><span>{data.total}</span>
                                </div>
                                </>
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

export default InternetUploadReceipt