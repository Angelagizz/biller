import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { setBillTagihan } from '../../../redux/action/electricityAction'
import { setRecurringStatus } from '../../../redux/action/recurringAction'
import { getTagihanAccInfo } from '../../../services/electricityService'
import '../electricity/TokenPln.css'

const TagihanPln = () =>{
    const token = useSelector(state=>state.user.currentUser.token)
    const [statusText, setStatusText] = useState('')
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    const [idpel, setIdpel] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (e) =>{
        setMessage()
        setIdpel(e.target.value)
    }

    const handleConfirm = () =>{
        setStatusText('')
        setLoading(!loading)
        getTagihanAccInfo(token, idpel)
            .then((response)=>{
                console.log('Tagihan acc info', response)
                setMessage(response.message)
                setStatusText(response.statusText)
                dispatch(setBillTagihan(response.data))
            })
            .catch((error)=>{
                console.log('error', error)
            })
    }

    const  maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
    }

    useEffect(
        ()=>{
            dispatch(setRecurringStatus(false))
            if (statusText === 'OK') {
                history.push(`electricity/tagihanconfirmation/${idpel}`);
                } else if (statusText === 'Internal Server Error'){
                setLoading(!loading) 
            } else if (statusText==='Accepted'){
                setLoading(!loading)
            }
        }
    ,[statusText])

    // console.log(idpel)

    return(
        <div className='wrapper'>
            <div className='frame'>
                <div className='input-token'>
                    <form>
                        <label>Nomor meter</label>
                        <input onInput={maxLengthCheck} maxLength='13' type='number' onChange={handleChange} placeholder='E.g 141234567890'/>
                        {
                            message!==undefined &&
                            <div className='space center' style={{backgroundColor:'pink', color:'red', padding:'10px'}}>{message}</div>
                            }
                    </form>
                </div>
            </div>
            <div className='btn-wrapper'>
                {
                    idpel.length >= 12 
                    ?
                    <div className='confirm-buttn' onClick={handleConfirm}>
                        {
                            loading && <span className="spinner-border spinner-border-sm"></span>
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

export default TagihanPln