import { ArrowBack } from '@material-ui/icons'
import '../electricity/TokenConfirmation.css'
import React, { useEffect, useState } from 'react'
import PaymentMethodModal from './PaymentMethodModal'
import Recurring from './Recurring'
import { Link, useHistory, useParams } from 'react-router-dom'
import Header2 from '../../pages/Header/Header2'
import { useDispatch, useSelector } from 'react-redux'
import { createTagihanBill, getTagihanAccInfo, uploadReceiptElectricity } from '../../../services/electricityService'
import { setBillTagihan, setBillTagihanLagi, setReceiptTagihan } from '../../../redux/action/electricityAction'
import ListLoader from '../loading/listLoader'
import Timer from './Timer'
import masterCardLogo from '../../assets/master-card1.png'
import visaLogo from '../../assets/visa.png'
import ThreeDots from '../loading/threeDots'

const TagihanConfirmationUpload = () =>{
    const tipe = 'PLN - Tagihan'
    const statusRecurring = useSelector(state=>state.recurring.status)
    const [statusRecur, setStatusRecur] = useState(statusRecurring)
    const token = useSelector(state=>state.user.currentUser.token)
    const billTagihan = useSelector(state=>state.electricity.billTagihan)
    const billDetails = useSelector(state=>state.electricity.billTagihanLagi)
    const payMethod = useSelector(state=>state.payment.primary)
    const [file, setFile] = useState()
    const [statusText, setStatusText] = useState('')
    const [billId, setBillId] = useState()
    const [transactionId, setTransactionId] = useState()
    const dispatch = useDispatch()
    const {idpel} = useParams()
    const history = useHistory()
    const bcrypt = require('bcryptjs')
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3600);

    
    useEffect(
        ()=>{
            billTagihan.length === 0 &&
            getTagihanAccInfo(token, idpel)
            .then((response)=>{
                console.log('Tagihan acc info', response)
                dispatch(setBillTagihan(response.data))
            })
            .catch((error)=>{
                console.log('error', error)
            })

            createTagihanBill(token, billTagihan)
            .then((response)=>{
                console.log('Response Create new bill tagihan', response)
                dispatch(setBillTagihanLagi(response.data.bankTransferDetails))
            })
            .catch((error)=>{
                console.log('errornya : ',error)
            })
        }
    ,[billTagihan])

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
            billTagihan.length === 0 &&
            getTagihanAccInfo(token, idpel)
            .then((response)=>{
                console.log('data tagihan', response)
                dispatch(setBillTagihan(response.data))
            })
            .catch((error)=>{
                console.log('errornya : ',error)
            })

            createTagihanBill(token, billTagihan)
            .then((response)=>{
                console.log('Response Create new bill tagihan1', response)
                dispatch(setBillTagihanLagi(response.data.bankTransferDetails))
                setBillId(response.data.bill_id);
                setTransactionId(response.data.transaction_id)
            })
            .catch((error)=>{
                console.log('errornya : ',error)
            })
        }
    ,[billTagihan])

    const handleUpload = () =>{
        uploadReceiptElectricity(token, transactionId, billId, file)
        .then((response)=>{
            dispatch(setReceiptTagihan(response.data.receipt))
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
            history.push('/electricity/tagihan/receipt')
        } , [statusText]
    )

    console.log('billid n trans id', billId, transactionId)
    console.log('file', file)



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
                <div className='title bold1'>Electricity - PLN Tagihan</div>
            </div>
            <div className='confirmation-frame' style={{marginBottom:'100px'}}>
                <div className='bill-detail'>
                  <div className='resume'>
                         <div className='gray center'>Please complete your payment in</div>
                               
                    {
                            billDetails.length === 0 ?
                            <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
                            <ThreeDots />
                            </div>
                            :
                            billDetails.map((data,index)=>(
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
                 
                    <div className='bold'>Bill Details</div>
                    <div className='detail'>
                        {
                            billTagihan.length === 0 
                            ?
                            <div style={{display:'flex'}}>
                            <ListLoader />
                            </div>
                            :
                            billTagihan.map((data,index)=>(
                                <div key={index}>
                                    <div className='detail-list'>
                                        IDPEL<span>{data.IDPEL}</span>
                                    </div>
                                    <div className='detail-list'>
                                        Name<span>{data.Name}</span>
                                    </div>
                                    <div className='detail-list'>
                                        Tarif/Daya<span>{data.Tarif_Daya}</span>
                                    </div>
                                    <div className='detail-list space' style={{display:'flex', alignItems:'flex-start'}}>
                                        Bulan/Tahun<span>{
                                            data.Bulan_Tahun
                                        //   data.Bulan_Tahun.split(',').map((d,i)=>(<div key={i}>{d}</div>))
                                        }</span>
                                    </div>
                                    {
                                        data.Late_Payment_Fee !== 0 &&
                                    <div className="detail-list late-text">
                                        late payment fee
                                        <span className="bold">Rp. {formatRupiah(data.Late_Payment_Fee)}</span>
                                    </div>
                                    }
                                    <div className='detail-list'>
                                        Bill<span>Rp. {formatRupiah(data.Bill)}</span>
                                    </div>
                                    <div className='detail-list'>
                                        Admin<span>Rp. {formatRupiah(data.Admin)}</span>
                                    </div>
                                    <div className='detail-list'>
                                        <span>Total</span><span>Rp. {formatRupiah(data.Total)}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    statusRecurring && <Recurring statusRecur={statusRecur=>setStatusRecur(statusRecur)} tipe={tipe}/>
                }
            </div>
        </div>
    </>
    )
}

export default TagihanConfirmationUpload