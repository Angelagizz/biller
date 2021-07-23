import React, { useState } from 'react'
import './TokenConfirmation.css'
import DownIcon from '@material-ui/icons/SystemUpdateAlt';
import { ArrowBack } from '@material-ui/icons'
import Header2 from '../../pages/Header/Header2'
import { useSelector } from 'react-redux';


const ReceiptTagihan = () =>{
    const [nameCss, setNameCss] = useState('w3-animate-top')
    const receipt = useSelector(state=>state.electricity.receiptTagihan[0])
    const { id, bill_id, customer_number, last_month_stand_meter, this_month_stand_meter,name, power,tagihan_date, bill_fee, admin_fee, late_payment_fee, total} = receipt


    const formatRupiah = (data) =>{
        let reverse = data.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return ribuan;
    }
      //2021-07-10T00:00:00.000Z => Jul
    const convert_bulan = (data) =>{
            let x = data.slice(5,7)
            switch (x) {
                case '01' :
                    return 'Jan'
                case '02 ':
                    return 'Feb'
                case '03' :
                    return 'Mar'
                case '04' :
                    return 'Apr'
                case '05' :
                    return 'May'
                case '06' :
                    return 'Jun'
                case '07' :
                    return 'Jul'
                case '08' :
                    return 'Aug'
                case '09' :
                    return 'Sep'
                case '10' :
                    return 'Oct'
                case '11' :
                    return 'Nov'
                case '12' :
                    return 'Dec'  
                default:
                    return 'Jan'
            }

    }
    //2021-07-10T00:00:00.000Z => 2021
    const tahun = (data) =>{
        return data.slice(0,4)
    }
    return(
        <>
        <Header2 />
        <div className='dashboard-background'></div>
        <div className='containerku'>
            <div className='space-between'>
                <div><ArrowBack/></div>
                <div>Back to home</div>
            </div>
            <div className='gray'>Receipt</div>
            <div className='bold1'>Electricity - PLN Tagihan</div>
            <div className='dashboard-background'></div>
            <div className='tengah'>
                <div className='bill-detail'>
                    <div className='detail-list'><span >Receipt</span><div className='detail-list gray'><DownIcon fontSize='small'/>Download</div></div>
                    <div className='detail'>
                        <div className='detail-list'>IDPEL<span>{customer_number}</span></div>
                        <div className='detail-list'>Name<span>{name}</span></div>
                        <div className='detail-list'>Tarif/Daya<span>{power}</span></div>
                        <div className='detail-list'>Bulan/Tahun<span>{convert_bulan(tagihan_date)} {tahun(tagihan_date)}</span></div>
                        <div className='detail-list'>Stand Meter<span>{last_month_stand_meter}-{this_month_stand_meter}</span></div>
                        <div className='detail-list space'>Bill<span>Rp. {formatRupiah(bill_fee)}</span></div>
                        <div className='detail-list'>Admin<span>Rp. {formatRupiah(admin_fee)}</span></div>
                        <div className='detail-list bold'>Total<span>Rp. {formatRupiah(total)}</span></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ReceiptTagihan