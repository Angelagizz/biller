import React, { useEffect, useState } from 'react'
import '../electricity/TokenConfirmation.css'
import DownIcon from '@material-ui/icons/SystemUpdateAlt';
import { ArrowBack } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import ListLoader from '../loading/listLoader';
import { useParams } from 'react-router';
import { getInternetAccount } from '../../../services/internettvService';
import { setInternetCust } from '../../../redux/action/internetAction';
import Header2 from '../../pages/Header/Header2';
import notif from '../../assets/pay_success.png'
import { Link } from 'react-router-dom';




const ReceiptInternetTv = () =>{
    const dataCust = useSelector(state=>state.internet.datacust)
    const token = useSelector(state=>state.user.currentUser.token)
    const [name, setName] = useState('w3-animate-top')
    const dispatch = useDispatch()
    // const {id} = useParams()
    // useEffect(
    //     ()=>{
    //         dataCust.length === 0 &&
    //         getInternetAccount(id, token)
    //         .then((response) => {
    //           dispatch(setInternetCust(response.data))
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         })
    //     }
    // ,[])
       //setTimeout(setName('out'),40000)
    return(
        <>
        <Header2 />
        <div className={name} onClick={()=>setName('out')}>
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
        <div className='bold1'>Internet & TV</div>
        <div className='dashboard-background'></div>
        <div className='tengah'>
            <div className='bill-detail'>
                <div className='detail-list'><span >Receipt</span><div className='detail-list gray'><DownIcon fontSize='small'/>Download</div></div>
                <div className='detail'>
                {
                            dataCust.length === 0 ?
                            <ListLoader />
                            :
                            dataCust.map((data, index) =>(
                                <>
                                <div className='detail-list'>
                                    No Customer<span>{data.customer_number}</span>
                                </div>
                                <div className='detail-list'>
                                    Name<span>{data.name}</span>
                                </div>
                                <div className='detail-list'>
                                    Address<span>{data.address}</span>
                                </div>
                                <div className='detail-list space'>
                                    Provider<span>{data.provider}</span>
                                </div>
                                <div className='detail-list'>
                                    Late Payment Fee<span>{data.late_payment}</span>
                                </div>
                                <div className='detail-list'>
                                    Admin<span>{data.admin_fee}</span>
                                </div>
                                <div className='detail-list'>
                                    <span>Total</span><span>{data.total}</span>
                                </div>
                                </>
                            ))
                        }
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default ReceiptInternetTv