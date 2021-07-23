import React, { useState } from 'react'
import Modal from 'react-modal'
import electricityicon from '../../assets/electricitybill.png'
import mobileicon from '../../assets/mobilebill.png'
import interneticon from '../../assets/internetbill.png'
import landlineicon from '../../assets/landlinebill.png'
import bpjsicon from '../../assets/bpjsbill.png'
import pdamicon from '../../assets/pdambill.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Category from '../newbill/Category'
import SubsCategory from './SubsCategory'
import './NewSubsModal.css'


const NewSubsModal = (props) =>{
    const [mod, setMod] = useState(false)
    const [service, setService] = useState()
    const customStyles = {
        overlay:{
            background:'rgba(38, 55, 101, 0.7)',   
        },
    
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          Width : '80vw',
          height : '80vh',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }
    const closeModal = () =>{
        props.togle(!props.togle)
    }
    return(
        <>
            <Modal
                 isOpen={props.togle}
                 onRequestClose={closeModal}
                 style={customStyles} 
            >
              <div>
                <div className='bold'>Select Category</div>
                <div className='line-white'></div>
                <div className='bills-category-modal'>
                    <div className='bill-card' onClick={()=>setService('electricity')}>
                        <div className='content'>
                            <img src={electricityicon} alt='icon'/>
                            <h4>Electricity</h4>
                        </div>
                    </div>
                    <div className='bill-card' onClick={()=>setService('mobile')}>
                        <div className='content'>
                            <img src={mobileicon} alt='icon'/>
                            <h4>Mobile</h4>
                        </div>
                    </div>
                    <div className='bill-card' onClick={()=>setService('internettv')}>
                        <div className='content'>
                            <img src={interneticon} alt='icon'/>
                            <h4>Internet & TV</h4>
                        </div>
                    </div>
                    <div className='bill-card' onClick={()=>setService('landline')}>
                        <div className='content'>
                            <img src={landlineicon} alt='icon'/>
                            <h4>Landline</h4>
                        </div>
                    </div>
                    <div className='bill-card' onClick={()=>setService('bpjs')}>
                        <div className='content'>
                            <img src={bpjsicon} alt='icon'/>
                            <h4>BPJS</h4>
                        </div>
                    </div>
                    <div className='bill-card' onClick={()=>setService('pdam')}>
                        <div className='content'>
                            <img src={pdamicon} alt='icon'/>
                            <h4>PDAM</h4>
                        </div>
                    </div>
                </div>
              </div>
              <SubsCategory  service={service} />
            </Modal>
        </>

    )
}

export default NewSubsModal