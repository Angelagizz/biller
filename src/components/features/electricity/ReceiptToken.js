import React, { useState } from 'react'
import './TokenConfirmation.css'
import DownIcon from '@material-ui/icons/SystemUpdateAlt';
import { ArrowBack } from '@material-ui/icons'
import Header2 from '../../pages/Header/Header2'
import { useSelector } from 'react-redux';
import notif from '../../assets/pay_success.png'
import { Link } from 'react-router-dom';


const ReceiptToken = () =>{
    const [nameCss, setNameCss] = useState('w3-animate-top')
    const receipt = useSelector(state=>state.electricity.receiptToken)
    const formatRupiah = (data) =>{
        let reverse = data.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return ribuan;
    }
    
    const { id, bill_id, meter_number, customer_number, name, rates, power, ref, stroom_per_token,token,ppj,admin_fee,total, stroom_code } = receipt
    
    console.log('data receipt', receipt)

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

    return(
    <>
        <Header2 />
        <div className={nameCss} onClick={()=>setNameCss('out')}>
            <img style={{width:'250px',height:'70px', position:'absolute', left:'42%'}} src={notif} alt='notif' />
        </div>
        <div className='containerku'>
            <div className='space-between'>
                <Link className='link' to='/newbill'>
                    <div><ArrowBack/></div>
                </Link>
                <Link className='link' to='/dashboard'>
                    <div>Back to home</div>
                </Link>
            </div>
            <div className='gray'>Receipt</div>
            <div className='bold1'>Electricity - PLN Token</div>
            <div className='dashboard-background'></div>
            <div className='tengah'>
                <div className='bill-detail'>
                    <div className='detail-list'><span >Receipt</span><div className='detail-list gray'><DownIcon fontSize='small'/>Download</div></div>
                    <div className='detail'>
                        <div className='detail-list'>No Meter<span>{meter_number}</span></div>
                        <div className='detail-list'>IDPEL<span>{customer_number}</span></div>
                        <div className='detail-list'>Name<span>{name}</span></div>
                        <div className='detail-list'>Tarif/Daya<span>{power}</span></div>
                        <div className='detail-list'>Rp Stroom/Token<span>Rp. {token!==undefined ? formatRupiah(token):'....'}</span></div>
                        <div className='detail-list'>PPJ<span>Rp. { ppj !== undefined ? formatRupiah(ppj):'....'}</span></div>
                        <div className='detail-list'>Admin<span>Rp. { admin_fee !== undefined ? formatRupiah(admin_fee):'....'}</span></div>
                        <div className='detail-list bold'>Total<span>Rp. { total !== undefined ? formatRupiah(total):'....'}</span></div>
                        <div className='gray space'>Stroom/Token</div>
                        <div className='purple bold'>{stroom_code !== undefined ? cc_format(stroom_code):'....'}</div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ReceiptToken