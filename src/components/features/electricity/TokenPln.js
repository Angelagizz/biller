import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../electricity/TokenPln.css'
import $ from 'jquery'
import { getTokenAccInfo, getTokenPriceList } from '../../../services/electricityService'
import { useDispatch, useSelector } from 'react-redux'
import ThreeDots from '../loading/threeDots'
import { setBillToken, setTokenPriceList } from '../../../redux/action/electricityAction'
import { setRecurringStatus } from '../../../redux/action/recurringAction'

const TokenPln = () =>{
    const [noMeter, setNoMeter] = useState('') 
    const [message, setMessage] = useState()
    const [status, setStatus] = useState()
    const [harga, setHarga] = useState()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const token = useSelector(state=>state.user.currentUser.token)
    const tokenPriceList = useSelector(state=>state.electricity.tokenPriceList)

    const handleChange = (e) =>{
        setMessage()
        setNoMeter(e.target.value)
    }

    //  jquery
    $( document ).ready( function(){
        $('.token-harga').on('click','.harga-token',function () {
            $('.harga-token').removeClass('harga-token-selected');
            $(this).addClass('harga-token-selected')
        });
    });

    useEffect(
        ()=>{
        getTokenPriceList(token)
        .then((response)=>{
            console.log('price list token', response)
            dispatch(setTokenPriceList(response.data))
        })
        .catch((error)=>{
            console.log('Errornya adalah ',error)
        })
        }
    ,[])

    const formatRupiah = (data) =>{
        let reverse = data.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return ribuan;
    }

    const handleConfirmClick = () =>{
        setStatus('')
        setLoading(!loading)
        getTokenAccInfo(token,noMeter,harga)
        .then((response)=>{
            console.log('token acc info', response)
            dispatch(setBillToken(response.data))
            setStatus(response.statusText)
            setMessage(response.message)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const  maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }

    useEffect(()=>{
        dispatch(setRecurringStatus(false))
        if (status === 'OK') {
            history.push(`elctricity/token_confirmation/${noMeter}/${harga}`);
            } else if (status === 'Internal Server Error'){
            setLoading(!loading)
        } else if (status === 'Accepted') {setLoading(false)}
    }
    ,[status]);

    // console.log('harga', harga)
    // console.log('status', status)
    return(
            <div className='wrapper' style={{marginBottom:'100px'}}>
                <div className='frame'>
                    <div className='input-token'>
                        <form>
                            <label>Nomor meter</label>
                            <input value={noMeter} onChange={handleChange} type="number" maxLength='13' onInput={maxLengthCheck} placeholder='E.g 141234567890'/>
                            {
                                 message!==undefined &&
                            <div className='space center' style={{backgroundColor:'pink', color:'red', padding:'10px'}}>{message}</div>
                            }
                        </form>
                    </div>
                    <div className='token-harga'>
                        {
                            tokenPriceList.length === 0 
                            ? 
                            <div style={{padding:'40px', width:'100%',backgroundColor:'white', display:'flex',justifyContent:'center', borderRadius:'8px'}}> <ThreeDots /></div> 
                            : 
                            tokenPriceList.map((data, index)=>(
                                <div onClick={()=>setHarga(data.price)} className='harga-token' key={index}><p>Rp.{formatRupiah(data.price)}</p></div>
                            ))
                        }

                    </div>
                </div>
                <div className='btn-wrapper'>
                    {
                    (noMeter.length >= 10 && harga!==undefined ) 
                    ? 
                        <div className='confirm-buttn' onClick={handleConfirmClick}>
                        {
                            loading && (<span className="spinner-border spinner-border-sm"></span>)
                        }
                            Confirm
                        </div>
                    : 
                        <div className='disable-buttn'>Confirm</div>
                    }    
                </div>
            </div>
    )
}

export default TokenPln