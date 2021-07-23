import Bulan from "./Bulan"

const Tahun = (props) =>{
    const date = new Date
    const thn = date.getUTCFullYear()
    const d = props.data

    let tgl = null
    let bln = null
    
    if (d!==undefined){
         tgl = d.slice(8)
         bln = d.slice(5, 7)
    }
    
    return(
        <>
        {tgl} <Bulan bulan={parseInt(bln)}/> {parseInt(thn)+1}
        </>

    )
    }

export default Tahun
  
