import React from 'react'
import { useSelector } from 'react-redux'
import iconsubs from '../../assets/icon-subs.png'
import infoicon from '../../assets/info-icon.png'
import Bulan from '../electricity/Bulan'
import '../electricity/RecurringBillCreated.css'

const RecurringBillCreated = () =>{
    const tgl = useSelector(state=>state.recurring.date)
    const date = new Date()
    const bulan= date.getMonth()
    console.log('dfdsf',bulan)
    const thn = date.getFullYear()
    const datacusto = useSelector(state=>state.bpjs.datacusto)
    const {branch, total, noVa} = datacusto[0]
    return(
        <div className='billcard'>
            <div className='right'>{`Billed every month at ${tgl}`}</div>
            <div className='row1'>
                <div className='row2'>  
                    <span><img src={iconsubs} alt='icon'/></span>
                    <div className='column3'>
                        <div>{`BPJS - ${branch}`}</div>
                        <div>{noVa}</div>
                    </div>
                </div>
                <div className='bold'>{total}</div>   
            </div>
            <div className='total'>Total <span>{total}</span></div>
            <div className='information'>
                <img src={infoicon} alt='icon'/>
                <div>
                    <p>Next payment will due <span>{`${tgl} `}<Bulan bulan={bulan+2}/>{` ${thn}`}</span></p>
                    <p>Pay before {`${tgl} `}<Bulan bulan={bulan+2}/>{` ${thn}`}, 23:59 to avoid late payment fee</p>
                </div>
            </div>
        </div>

    )
}

export default RecurringBillCreated