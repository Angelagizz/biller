import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import '../paymentmodal/PaymentModal.css'
import Cards from 'react-credit-cards';
import { AddNewPaymentCard, getUserPaymentCards } from '../../../services/userService';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPayment, setReload } from '../../../redux/action/profileAction';

const PaymentModal = (props) =>{
    const date = new Date()
    const [cardNumber, setCardNumber] = useState('')
    const [expDate, setExpDate] = useState()
    const [cardHolderName, setCardHolderName] = useState()
    const [cvv, setCvv] = useState()
    const [type, setType] = useState()
    const dispatch = useDispatch()
    const token = useSelector(state=>state.user.currentUser.token)
    const [loading, setLoading] = useState(false)

    const customStyles = {
        overlay:{
            background:'rgba(38, 55, 101, 0.7)',   
        },
    
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }

    const  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
        object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    
    const closeModal = () =>{
        props.togle(!props.togle)
    }

    const handleSubmit = () =>{
        setLoading(true)
        AddNewPaymentCard(token, cardNumber, cardHolderName, expDate, cvv, type)
        .then((response)=>{
            console.log('response addNewPaymentCards', response)
            if (response.statusText==='Created'){
            setLoading(false)
            alert('Payment Card Added') 
            window.location.reload()
            closeModal()
            }
        })
        .catch((error)=>{
            console.log('error addNewPaymentCards', error)
            setLoading(false)
            alert('Failed to Add Card') 
        })
    }

    console.log('data card', cardNumber, cardHolderName, expDate, cvv, type, token)


    useEffect(
        ()=>{
            if (parseInt(cardNumber[0]) % 2 === 0){
                setType('Debit Card')
            } else {
                setType('Credit Card')
            }
        }
    ,[cardNumber])

    return(
        <>
            <Modal
                 isOpen={props.togle}
                 //onRequestClose={closeModal}
                 style={customStyles}
            >
                <div className='paymentmodal'>
                    <div className='title'><h3>Add New Card</h3><span onClick={closeModal}>X</span></div>
                    <div>
                        <div className='formpayment-group'>
                            <label>Card Number</label>
                            <input type='number' placeholder='Enter your card number' maxLength='16' onInput={maxLengthCheck} onChange={(e)=>setCardNumber(e.target.value)} value={cardNumber}/>
                        </div>
                        <div className='formpayment-group'>
                            <label>Card Holder Name</label>
                            <input type='text' placeholder='Your name on the card' onChange={(e)=>setCardHolderName(e.target.value)} value={cardHolderName}/>
                        </div>
                        <div className='' style={{display:'flex', flexDirection:'column',marginBottom:'10px'}}>
                            <label>Expiry Date</label>
                            {/* <div style={{display:'flex',padding:'10px', border:'1px solid #BDBDBD', borderRadius:'5px'}}>
                            <input onInput={maxLengthCheck} style={{border:'none',padding:'0',width:'30px',outline:'none'}} maxLength='2' type='number' maxLength='2' placeholder='MM'/>
                            <input style={{border:'none',padding:'0',width:'10px',outline:'none',backgroundColor:'white'}}  type='text' disabled placeholder='/'/>
                            <input onInput={maxLengthCheck}  style={{border:'none',padding:'0',width:'30px',outline:'none'}} maxLength='2' type='text' maxLength='2' placeholder='YY'/> */}
                            <TextField
                            onChange={(e)=>setExpDate(e.target.value)}
                            id="date"
                            type="date"
                            defaultValue={date}
                            InputLabelProps={{
                            shrink: true,
                            }}
                             />
                        </div>
                        <div className='formpayment-group'>
                            <label>CVV/CVC</label>
                            <input type='number' onInput={maxLengthCheck} maxLength='3' placeholder='CVV/CVC' onChange={(e)=>setCvv(e.target.value)} value={cvv}/>
                        </div>
                        <div className='formpayment-group'>
                            <button onClick={handleSubmit} disabled={loading}>
                             {
                                 loading && <span className="spinner-border spinner-border-sm"></span>
                             }
                             Save
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default PaymentModal