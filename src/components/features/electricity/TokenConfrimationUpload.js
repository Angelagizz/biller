import { ArrowBack } from '@material-ui/icons'
import '../electricity/TokenConfirmation.css'
import React, { useEffect, useRef, useState } from 'react'
import PaymentMethodModal from './PaymentMethodModal'
import Recurring from './Recurring'
import { Link, useHistory, useParams } from 'react-router-dom'
import Timer from './Timer'
import { useDispatch, useSelector } from 'react-redux'
import { createTokenBill, getTokenAccInfo, uploadReceiptElectricity } from '../../../services/electricityService'
import { setBillToken, setBillTokenLagi, setReceiptToken } from '../../../redux/action/electricityAction'
import ListLoader from '../loading/listLoader'
import masterCardLogo from '../../assets/master-card1.png'
import visaLogo from '../../assets/visa.png'
import ThreeDots from '../loading/threeDots'
import { setRecurringStatus } from '../../../redux/action/recurringAction'
import Header2 from '../../pages/Header/Header2'

const TokenConfirmationUpload = () =>{
    const tipe = 'PLN - Token'
    const statusRecurring = useSelector(state=>state.recurring.status)
    const [statusRecur, setStatusRecur] = useState(statusRecurring)
    const [payTrans, setPayTrans] = useState(true)
    const payMethod = useSelector(state=>state.payment.primary)
    const [newPin, setNewPin] = useState()
    const history = useHistory()
    const inputFile = useRef(null)
    const [statusText, setStatusText] = useState('')
    const [billId, setBillId] = useState()
    const [transactionId, setTransactionId] = useState()
    const [file, setFile] = useState()
    const token = useSelector(state=>state.user.currentUser.token)
    const dataBillToken = useSelector(state=>state.electricity.billToken)
    const dataBillTokenLagi = useSelector(state=>state.electricity.billTokenLagi)
    const {no_meter, harga} = useParams()
    const dispatch = useDispatch()
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3600);
    // console.log('nometer',no_meter)
    // console.log('hrga', harga)
    const formatRupiah = (data) =>{
        let reverse = data.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return ribuan;
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
    
      
      function maskify(cc) {
        return cc.replace(/.(?=.{4})/g, "*");
      }
    
    useEffect(
        ()=>{
            dataBillToken.length === 0  &&
            getTokenAccInfo(token,no_meter,harga)
            .then((response)=>{
                console.log('token acc info di uplod', response)
                dispatch(setBillToken(response.data))
            })
            .catch((error)=>{
                console.log(error)
            })

            createTokenBill(token, dataBillToken)
            .then((response)=>{
                console.log('reponse create new bill di halaman upload receipt', response)
                dispatch(setBillTokenLagi(response.data.bankTransferDetails))
                setBillId(response.data.bill_id);
                setTransactionId(response.data.transaction_id)
            })
            .catch((error)=>{
                console.log(error)
            })
        } , [dataBillToken]
    )

    const handleUpload = () =>{
        uploadReceiptElectricity(token, transactionId, billId, file)
        .then((response)=>{
            dispatch(setReceiptToken(response.data.receipt))
            console.log('response upload', response)
            setStatusText(response.statusText)

        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(
        () => {
            statusText === 'Ok' &&
            history.push('/electricity/token/receipt')
        } , [statusText]
    )


    console.log('billid n trans id', billId, transactionId)
    console.log('file', file)


    return(
        <>
        <Header2/>
        <div className='dashboard-background'/>
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
                <div className='title bold1'>Electricity - PLN Token</div>
            </div>
            <div className='confirmation-frame' style={{marginBottom:'100px'}}>
                <div className='bill-detail'>
                    {
                        payTrans &&
                            <div className='resume'>
                                <div className='gray center'>Please complete your payment in</div>
                                {
                                    dataBillTokenLagi.length === 0 ?
                                    <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                                        <ThreeDots/>
                                    </div>
                                    :
                                    dataBillTokenLagi.map((data,index)=>(
                                        <>
                                        <div className='bold center'><Timer expiryTimestamp={time} /> </div>
                                        <div className='detail-list'>
                                            Total <span>Rp. {formatRupiah(data.Total)}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Bank <span>{data.account_bank}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Account Name <span>{data.account_name}</span>
                                        </div>
                                        <div className='detail-list'>
                                            Account No <span>{data.account_number}</span>
                                        </div>
                                        <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])} />  
                                        <div className='btn-upload' onClick={handleUpload} >
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
                            dataBillToken.length === 0
                            ?
                            <div style={{display:'flex'}}>
                            <ListLoader />
                            </div>
                            :
                            dataBillToken.map((data, index)=>(
                            <>
                                <div className='detail-list'>
                                    No Meter<span>{data.No_Meter}</span>
                                </div>
                                <div className='detail-list'>
                                    IDPEL<span>{data.IDPEL}</span>
                                </div>
                                <div className='detail-list'>
                                    Name<span>{data.Name}</span>
                                </div>
                                <div className='detail-list'>
                                    Tarif/Daya<span>{data.Tarif_Daya}</span>
                                </div>
                                <div className='detail-list space'>
                                    Token<span>Rp. {formatRupiah(data.Token)}</span>
                                </div>
                                <div className='detail-list'>
                                    PPJ<span>Rp. {formatRupiah(data.PPJ)}</span>
                                </div>
                                <div className='detail-list'>
                                    Admin<span>Rp. {formatRupiah(data.Admin)}</span>
                                </div>
                                <div className='detail-list'>
                                    <span>Total</span><span>Rp. {formatRupiah(data.Total)}</span>
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

export default TokenConfirmationUpload