import React from 'react'
import '../electricity/Electricity.css'
import '../electricity/TokenPln.css'

const SubsInternetTv = () =>{
    return(
        <div className='containerku'>
            <div className='electricity-option'>
            <h3>Service Type</h3>
                    <div className='rowku'>
                        <div className='opsi'><input type='radio' name='internettv' value='indihome'/>IndiHome</div>
                        <div className='opsi'><input type='radio' name='internettv' value='mncplay'/>MNC Play</div>
                        <div className='opsi'x  ><input type='radio' name='internettv' value='biznethome'/>Biznet Home</div>
                    </div>
            </div>
            <div className='wrapper'>
                <div className='frame'>
                    <div className='input-token'>
                        <form>
                            <label>No. Customer</label>
                            <input type='number' placeholder='E.g 141234567890'/>
                        </form>
                    </div>
                    <div className='gray space center'>Please input your number to continue</div>
                </div>
            </div>
            <div className='btn-wrapper'>
                <div className='confirm-btn'>Confirm</div>
            </div>
        </div>

    )
}

export default SubsInternetTv