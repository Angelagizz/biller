import React from 'react'
import { useSelector } from 'react-redux'
import iconsubs from '../../assets/icon-subs.png'
import infoicon from '../../assets/info-icon.png'
import '../electricity/RecurringBillCreated.css'
import Bulan from './Bulan'

const RecurringBillCreatedTagihan = (props) =>{
    const tgl = useSelector(state=>state.recurring.date)
    const date = new Date()
    const bulan = date.getMonth()+1
    const thn = date.getFullYear()
    const dataBill = useSelector(state=>state.electricity.billTagihan)
    const {IDPEL, Total} = dataBill[0]
    const formatRupiah = (data) =>{
        let reverse = data.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return ribuan;
    }

    return(
        <div className='billcard'>
            <div className='right'>{`Billed every month at ${tgl}`}</div>
            <div className='row1'>
                <div className='row2'>  
                    <span><img src={iconsubs} alt='icon'/></span>
                    <div className='column3'>
                        <div>{props.tipe}</div>
                        <div>{IDPEL}</div>
                    </div>
                </div>
                <div className='bold'>Rp. {formatRupiah(Total)}</div>   
            </div>
            <div className='total'>Total <span>Rp. {formatRupiah(Total)}</span></div>
            <div className='information'>
                <img src={infoicon} alt='icon'/>
                <div>
                    <p>Next payment will due <span>{`${tgl} `}<Bulan bulan={bulan+1}/>{` ${thn}`}</span></p>
                    <p>Pay before {`${tgl} `}<Bulan bulan={bulan+1}/>{` ${thn}`}, 23:59 to avoid late payment fee</p>
                </div>
            </div>
        </div>

    )
}

export default RecurringBillCreatedTagihan
