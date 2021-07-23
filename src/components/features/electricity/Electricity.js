import React, { useEffect, useState } from 'react'
import reactDom from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setElectricityOptions } from '../../../redux/action/electricityAction'
import { getElectricityOption } from '../../../services/electricityService'
import '../electricity/Electricity.css'
import ThreeDots from '../loading/threeDots'
import TagihanPln from './TagihanPln'
import TokenPln from './TokenPln'

const Electricity = () =>{
    const [tipePln, setTipePln] = useState('')
    const token = useSelector(state=>state.user.currentUser.token)
    const electricityOptions = useSelector(state=>state.electricity.option)
    const dispatch = useDispatch()


    const handleClick = (e) =>{
        setTipePln(e.target.value); 
    }

    useEffect(
        () =>{
        getElectricityOption(token)
        .then((response) => {
          console.log('data elect opt', response);
          dispatch(setElectricityOptions(response.data))
        })
        .catch((error) => {
          console.log(error);
        })
       }
    ,[])

    return(
        <div className='containerku'> 
            <div>
                <div className='electricity-option'>
                    <h3>Service Type</h3>
                    <div className='rowku'>
                        {
                            electricityOptions.length === 0 ? <ThreeDots /> :
                            electricityOptions.map((data, index )=>(
                                <div className='opsi' key={index}><input type='radio' name='electricity' onClick={handleClick} value={data.name}/>{data.name}</div>
                            ))
                        }
                    </div>
                </div>
                {
                    (tipePln === 'PLN - Token') ? <TokenPln /> : (tipePln === 'PLN - Tagihan') ? <TagihanPln /> : <></>
                }
            </div>
        </div>

    )
}

export default Electricity