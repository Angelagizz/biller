import React, {useState} from 'react'

const SubsElectricity = () =>{
    const [tipePln, setTipePln] = useState('')
    const [noMeter, setNoMeter] = useState('')
    const [harga, setHarga] = useState('')

    const handleClick = (e) =>{
        setHarga(e.target.value)
    }

    const handleChange = (e) =>{
        setNoMeter(e.target.value)
    }

    const handleClickr = (e) =>{
        setTipePln(e.target.value); 
    }

    return(
        <div>
                <div className='electricity-option'>
                    <h3>Service Type</h3>
                    <div className='rowku'>
                        <div className='opsi'><input type='radio' name='electricity' onClick={handleClickr} value='token'/>PLN Token</div>
                        <div className='opsi'><input type='radio' name='electricity' onClick={handleClickr} value='tagihan'/>PLN Tagihan</div>
                    </div>
                </div>
                {
                    (tipePln === 'token') ? 

                <div className='wrapper'>
                    <div className='frame'>
                        <div className='input-token'>
                            <form>
                                <label>Nomor meter</label>
                                <input value={noMeter} onChange={handleChange} type='number' placeholder='E.g 141234567890'/>
                            </form>
                        </div>
                        <div className='token-harga'>
                            <div value='20.000' onClick={handleClick} className='harga'><p>Rp.20.000</p></div>
                            <div value='50.000' onClick={handleClick}  className='harga'><p>Rp.50.000</p></div>
                            <div value='100.000'onClick={handleClick}  className='harga'><p>Rp.100.000</p></div>
                            <div value='200.000' onClick={handleClick}  className='harga'><p>Rp.200.000</p></div>
                            <div value='500.000' onClick={handleClick}  className='harga'><p>Rp.500.000</p></div>
                            <div value='1.000.000' onClick={handleClick}  className='harga'><p>Rp.1.000.000</p></div>
                            <div value='5.000.000' onClick={handleClick}  className='harga'><p>Rp.5.000.000</p></div>
                            <div value='10.000.000' onClick={handleClick}  className='harga'><p>Rp.10.000.000</p></div>
                            <div value='50.000.000' onClick={handleClick}  className='harga'><p>Rp.50.000.000</p></div>
                        </div>
                    </div>
                    <div className='btn-wrapper'>
                        {
                        (noMeter!=='' && harga!=='' ) ? 
                                <div className='confirm-btn'>Confirm</div>
                            : <div className='disable-btn'>Confirm</div>
                        }    
                    </div>
                </div>
                    
                    : (tipePln === 'tagihan') ? 
                    <>
                    <div className='frame'>
                        <div className='input-token'>
                            <form>
                                <label>Nomor meter</label>
                                <input type='number' placeholder='E.g 141234567890'/>
                            </form>
                        </div>
                    </div>
                    <div className='btn-wrapper'>
                            <div className='confirm-btn'>Confirm</div>
                    </div>
                    </>
                    : <></>
                }
        </div>


    )
}

export default SubsElectricity