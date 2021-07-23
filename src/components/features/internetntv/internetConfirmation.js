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
import { setRecurringStatus } from '../../../redux/action/recurringAction'


const InternetConfirmation = () =>{
    const tipe = 'internet';
    const [statusRecur, setStatusRecur] = useState(false)
    const tgl = useSelector(state=>state.recurring.date)
    const bln = useSelector(state=>state.recurring.month)
    const thn = useSelector(state=>state.recurring.year)
    const period = useSelector(state=>state.recurring.period)
    const history = useHistory()
    const bcrypt = require('bcryptjs')
    const [newPin, setNewPin] = useState()
    const payMethod = useSelector(state=>state.payment.primary)
    const [openModal, setOpenModal] = useState(false)
    const [payTrans, setPayTrans] = useState(false)
    const [payCard, setPayCard] = useState(false)
    const [billId, setBillId] = useState()
    const [transactionId, setTransactionId] = useState()
    const inputFile = useRef(null)
    const dispatch = useDispatch()
    const time = new Date();
    const {id} = useParams()
    const token = useSelector(state=>state.user.currentUser.token)
    time.setSeconds(time.getSeconds() + 3600);
    const handleOpenModal = () =>{
        setOpenModal(true)
    }
    const date =`${thn}-${bln>=10?bln:`0${bln}`}-${tgl.length===1?`0${tgl}`:tgl}`
    // console.log('date dari child', date)
    // console.log('bulan',bln)
    // console.log('status dari child', statusRecur)


    const dataCust = useSelector(state=>state.internet.datacust)
    useEffect(
        () => {
            dataCust.length === 0 &&
            getInternetAccount(id, token)
            .then((response) => {
                console.log('data', response)
              dispatch(setInternetCust(response.data))
            })
            .catch((error) => {
              console.log(error);
            });
            }, [id]
    )

    useEffect(
        ()=>{
            dispatch(setRecurringStatus(false))
        }
    ,[])

    const payType = 'Bank Transfer'


    const handlePayClick=()=>{
        //create new bill
        newBillInternetTv(token, dataCust, payType, statusRecur, period, date)
        .then((response)=>{
            console.log('Response Create New bill', response)
            dispatch(setDataBillInternet(response.data.payment_details))
            setBillId(response.data.billId);
            setTransactionId(response.data.transactionId)
        })
        .catch((error)=>{
            console.log(error)
        })
        payMethod[0].name === 'Bank transfer' ? 
        history.push(`/internettv/confirmation/upload/${id}`)
        //setPayTrans(!payTrans)
         :
        setPayCard(!payCard)
    }
    console.log('pay method',payMethod[0].name)
    // console.log('pin',dataCust[0].pin)

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
    

      const handleCompare=()=>{
         uploadReceiptInternet(token, transactionId, billId )
        .then((response)=>{
            dispatch(setInternetReceipt(response.data.receipt))
            console.log('response pay card', response)
        })
        .catch((error)=>{
            console.log(error)
        })
         bcrypt.compareSync(newPin, dataCust[0].pin, ) ? history.push(`/internettv/receipt`) : alert('Pin Salah')
        //  history.push('internettv/receipt')
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
                <div className='title bold1'>Internet TV</div>
            </div>
            <div className='confirmation-frame'>
                <div className='bill-detail'>
                    {
                        payTrans &&
                            <div className='resume'>
                                <div className='gray center'>Please complete your payment in</div>
                                <div className='bold center'><Timer expiryTimestamp={time} /> </div>
                                <div className='detail-list'>
                                    Total <span>{dataCust[0].total}</span>
                                </div>
                                <div className='detail-list'>
                                    Bank <span>Bank Central Asia</span>
                                </div>
                                <div className='detail-list'>
                                    Account Name <span>PT. Biller Indonesia</span>
                                </div>
                                <div className='detail-list'>
                                    Account No <span>0123456789</span>
                                </div>
                                <div className='btn-upload' onClick={()=>inputFile.current.click()}>
                                   Upload Resume
                                </div>
                                <input type="file" id="file" ref={inputFile} style={{display:'none'}}/>  
                            </div>
                    }
                 
                    <div className='bold'>Bill Details</div>
                    <div className='detail'>
                        {
                            dataCust.length === 0 ?
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <ListLoader/>
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
                                    Bill <span>{data.bill}</span>
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
                    {
                        !payTrans &&
                            <>
                            {
                                payCard ?
                                <div className='pin-wrapper'>
                                    <div>Masukkan Pin Transaksi Anda</div>
                                    <input type='password' onChange={(e)=>setNewPin(e.target.value)} value={newPin}/>
                                    <buttton className='pin-btn' onClick={handleCompare}>Pay</buttton>
                                </div>
                                :
                                <>
                                <div className='payment'>
                                    <div className='rowku'><span>Payment Method</span> <div className='change gray' onClick={handleOpenModal}>Change</div></div>  
                                    {
                                        openModal ? <PaymentMethodModal togle={openModal => setOpenModal(openModal)} /> : <></>
                                    }
                                <div className='gray'> 
                                {
                                    payMethod[0].name !== 'Bank transfer' 
                                    ?
                                    <>
                                        <img style={{height:'20px'}}  src={payMethod[0].name==='visa' ? visaLogo : payMethod[0].name==='master-card' ? masterCardLogo : ''}/> 
                                        { cc_format(maskify(payMethod[0].number))} 
                                    </>
                                    : payMethod[0].name
                                } 
                                </div>
                                </div>
                                <div className='payment-btn' onClick={handlePayClick}>
                                    Pay {dataCust.length !== 0 && ` : Rp. ${formatRupiah(dataCust[0].total)}`}
                                </div>
                                </>
                            }
                            </>
                    }
                </div>
                <Recurring statusRecur={statusRecur=>setStatusRecur(statusRecur)} tipe={tipe} />
            </div>
          
        </div>
    </>
    )
}

export default InternetConfirmation