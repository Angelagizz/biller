import { ArrowBack } from '@material-ui/icons'
import '../../features/electricity/TokenConfirmation.css'
import React, { useEffect, useRef, useState } from 'react'
import PaymentMethodModal from '../../features/electricity/PaymentMethodModal'
import Recurring from '../../features/electricity/Recurring'
import { Link, useParams, useHistory } from 'react-router-dom'
import Timer from '../../features/electricity/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { newBillPdam, getPdamAccount } from '../../../services/pdamService'
import { data } from 'jquery'
import ListLoading from '../../features/loading/listLoader';
import ListLoader from '../../features/loading/listLoader';
import masterCardLogo from '../../assets/master-card1.png'
import visaLogo from '../../assets/visa.png'
import Header2 from '../../pages/Header/Header2'
import { getAccountPdam, setDataBillPdam } from '../../../redux/action/pdamAction'
import { setRecurringStatus } from "../../../redux/action/recurringAction";

const PdamConfirmation = () =>{
    const tipe = "pdam";
    const [statusRecur, setStatusRecur] = useState(false)
    const tgl = useSelector(state=>state.recurring.date)
    const bln = useSelector(state=>state.recurring.month)
    const thn = useSelector(state=>state.recurring.year)
    const periode = useSelector(state=>state.recurring.period)
    const bcrypt = require('bcryptjs')
    const [newPin, setNewPin] = useState()
    const payMethod = useSelector(state=>state.payment.primary)
    const [openModal, setOpenModal] = useState(false)
    const [payTrans, setPayTrans] = useState(false)
    const [payCard, setPayCard] = useState(false)
    const inputFile = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const time = new Date();
    const {nocust} = useParams()
    const token = useSelector(state=>state.user.currentUser.token)
    console.log(token)
    time.setSeconds(time.getSeconds() + 3600);
    const handleOpenModal = () =>{
        setOpenModal(true)  
    }
    const date =`${thn}-${bln>=10?bln:`0${bln}`}-${tgl.length===1?`0${tgl}`:tgl}`
    const pdamAcc = useSelector(state=>state.pdam.pdamAcc)
    // console.log(useSelector(state=>state.bpjs.datacusto));
    useEffect(
        () => {
            pdamAcc.length === 0 &&
            getPdamAccount(nocust, token)
            .then((response) => {
              dispatch(getAccountPdam(response.data))
              console.log("data", response)
            })
            .catch((error) => {
              console.log(error);
            });
            }, [nocust]
    )
    useEffect(() => {
        dispatch(setRecurringStatus(false));
    }, []);

    const payType = 'Bank Transfer'

    const handlePayClick=()=>{
        newBillPdam(token, pdamAcc, payType, statusRecur, periode, date)
        .then((response)=>{
            console.log('Response Create New bill', response)
            dispatch(setDataBillPdam(response.data.paymentDetail));
        })
        .catch((error)=>{
            console.log(error)
        })
        payMethod[0].name === 'Bank transfer' ? 
        history.push(`/pdam/confirmation/upload/${nocust}`) :
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
         bcrypt.compareSync(newPin, pdamAcc[0].pin) ? alert('Pin benar') : alert('Pin Salah')

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
                <div className='title bold'>PDAM </div>
            </div>
            <div className='confirmation-frame'>
                <div className='bill-detail'>
                    {
                        payTrans &&
                            <div className='resume'>
                                <div className='gray center'>Please complete your payment in</div>
                                <div className='bold center'><Timer expiryTimestamp={time} /> </div>
                                <div className='detail-list'>
                                    Total <span>Rp 51.500,00</span>
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
                            pdamAcc.length === 0 ?
                            <ListLoader />
                            :
                            pdamAcc.map((data) =>(
                            
                                <div key="{data.item}">
                                <div className='detail-list'>
                                    No Customer<span>{data.customerNumber}</span>
                                </div>
                                <div className='detail-list'>
                                    Name<span>{data.name}</span>
                                </div>
                                <div className='detail-list'>
                                    Period<span>{data.period}</span>
                                </div>
                                <div className='detail-list space'>
                                    Last Month<span>{data.lastMonthStandMeter}</span>
                                </div>
                                <div className='detail-list'>
                                    This Month<span>{data.thisMonthStandMeter}</span>
                                </div>
                                <div className='detail-list'>
                                    Usage<span>{data.usage}</span>
                                </div>
                                <div className='detail-list'>
                                    Bill<span>{data.bill}</span>
                                </div>
                                <div className='detail-list'>
                                    Late Payment Fee<span>{data.latePaymentFee}</span>
                                </div>
                                <div className='detail-list'>
                                    Admin<span>{data.admin}</span>
                                </div>
                                <div className='detail-list'>
                                    <span>Total</span><span>{data.total}</span>
                                </div>
                                </div>
                                
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
                                    Pay: {pdamAcc.length !== 0 && ` : Rp. ${formatRupiah(pdamAcc[0].total)}`}
                                </div>
                                </>
                            }
                            </>
                           
                    }
                </div>
                <Recurring statusRecur={statusRecur=>setStatusRecur(statusRecur)}
                tipe={tipe}/>
                
            </div>
          
        </div>
    </>
    )
}

export default PdamConfirmation