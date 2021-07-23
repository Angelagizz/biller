import React, { useEffect, useState } from 'react'
import '../electricity/TokenConfirmation.css'
import RecurringBill from './RecurringBill'
import { Checkbox } from '@material-ui/core'
import RecurringBillCreated from './RecurringBillCreated'
import { useDispatch, useSelector } from 'react-redux'
import { setRecurringStatus } from '../../../redux/action/recurringAction'




const Recurring = (props) =>{
    const dispatch = useDispatch()
    const statusRecurring = useSelector(state=>state.recurring.status)
    const [recurringTogle, setRecurringTogle] = useState(false)
    const [billCreated, setBillCreated] = useState(false)
    const handleChange =()=>{
        dispatch(setRecurringStatus(!statusRecurring))
        setRecurringTogle(!recurringTogle)
        props.statusRecur(!recurringTogle)

    }

    useEffect(
        ()=>{
        setBillCreated(statusRecurring)     
    },[])

    return(
        <div className='bill-recurring'>
            <div className='rowku'>
                <div>{
                    billCreated ? <></> : 
                    <Checkbox color='primary' size='medium' onChange={handleChange} checked={statusRecurring} />
                    }
                </div>
                <div className='text'>
                    <div><span>Recurring Billing</span></div>
                    <div>
                        <p>Create automatic billing for your next purchase.<br/>
                        Available in weekly, montly and yearly basis</p>
                    </div>
                </div>
            </div>
            { recurringTogle && <RecurringBill tipe={props.tipe}/>}
            { billCreated && <RecurringBillCreated />}
        </div>
    )
}

export default Recurring