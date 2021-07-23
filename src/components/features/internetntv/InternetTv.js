import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { setInternetOptions, setInternetCust } from '../../../redux/action/internetAction'
import { setRecurringStatus } from '../../../redux/action/recurringAction'
import { getInternetAccount, getInternetOptions } from '../../../services/internettvService'
import '../electricity/Electricity.css'
import '../electricity/TokenPln.css'
import ThreeDots from '../loading/threeDots'
import mnc from '../../assets/mnc.png'
import indihome from '../../assets/indihome.png'
import biznet from '../../assets/biznet.png'


const InternetTv = () =>{
    const [tipe, setTipe] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState()
    const internetOptions = useSelector(state=>state.internet.option)
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(true)
    const [noCust, setNoCust]=useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const token = useSelector(state=>state.user.currentUser.token)
    console.log('token', token)

    const handleChange =(e)=>{
        setMessage('')
        setStatus()
        setTipe('')
        setNoCust(e.target.value)    
    }

    const handleClick = ()=>{
        dispatch(setRecurringStatus(false))
        setStatus()
        setLoading(!loading)
        getInternetAccount(noCust, token)
        .then((response) => {
          console.log('data cust', response);
          setStatus(response.statusCode)
          setMessage(response.message)
          dispatch(setInternetCust(response.data))
        })
        .catch((error) => {
          console.log('errornya :',error);
          setStatus(500)
          setMessage(`Can't Find Data`)
        });
    }

    // const coba =() =>{
    //     if (noCust.length === 10) {
    //         getInternetAccount(noCust, token)
    //         .then((response) => {
    //           console.log('data cust', response);
    //           setTipe(response.data.provider)
    //         })
    //         .catch((error) => {
    //           console.log('errornya :',error);
    //         });
    //     }

    // }

    const  maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }

    useEffect(() => {
        if (status === 200) {
       history.push(`/internettv/confirmation/${noCust}`);
        } else if (status == 500){
        setLoading(!loading)
        }
    }, [status]);

    useEffect(
        () =>{
        getInternetOptions(token)
        .then((response) => {
          console.log('data internet opt', response);
          dispatch(setInternetOptions(response.data))
        })
        .catch((error) => {
          console.log('errornya :',error);
        })
       }
    ,[])

    useEffect(()=>{
        if (noCust.length === 10) {
            setLoad(true)
            getInternetAccount(noCust, token)
            .then((response) => {
              console.log('data cust', response);
              setTipe(response.data.provider)
            })
            .catch((error) => {
              console.log('errornya :',error);
              setLoad(false)
            });
        }
    },[noCust])
    // console.log('no cust', noCust)
    // console.log('loading',loading)
    // console.log('status',status)
    return(
        <div className='containerku'>
            <div className='electricity-option'>
            <h3>Service Type</h3>
                    <div className='rowku'>
                        { internetOptions.length === 0 ? <ThreeDots />:
                            internetOptions.map((data, index)=>(
                                <div className='opsi' key={index}>{data.option}</div>

                            ))
                        }
                    </div>
            </div>
            <div className='wrapper'>
                <div className='frame'>
                    <div className='input-token'>
                        <form>
                            <label>No. Customer</label>
                            <div style={{display:'flex', alignItems:'center', border:'1px solid #BDBDBD',justifyContent:'space-between',paddingRight:'10px',borderRadius:'6px'}}>
                            <input style={{border:'none', outline:'none',marginLeft:'2px'}} type='number'   maxLength='10' onInput={maxLengthCheck} placeholder='E.g 141234567890' onChange={handleChange} value={noCust}/>
                            <div>{tipe===''&&noCust.length===10?<>{load && <span className="spinner-border spinner-border-sm"></span>}</>:<img style={{height:'15px'}} src={tipe==='MNC Play'?mnc:tipe==='Indihome'?indihome:tipe==='Biznet'?biznet:''}/>}</div>
                            </div>
                            {
                                status == 500 ?
                                <div className='space center' style={{backgroundColor:'pink', color:'red', padding:'10px'}}>{message}</div>
                                :
                                <div className='gray space center'>Please input your number to continue</div>
                            }
                        </form>



                    </div>

                    
                </div>
            </div>
            <div className='btn-wrapper'>
            {
                    (noCust.length >= 10 ) ? 
                    <button className='confirm-buttn' onClick={handleClick} disabled={loading} >
                    {loading && (
                         <span className="spinner-border spinner-border-sm"></span>
                     )}
                        Confirm
                    </button>: <div className='disable-buttn'>Confirm</div>
                    }  
                
            </div>
        </div>

    )
}

export default InternetTv