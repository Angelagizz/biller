const initialState = {
    option:[],
    tokenPriceList:[],
    billToken:[],
    billTokenLagi:[],
    billTagihan:[],
    billTagihanLagi:[],
    receiptToken:[],
    receiptTagihan:[],
}

const electricityReducer = (state=initialState, action) =>{
    switch (action.type) {
        case 'SET_ELE_OPT':
            return{
                ...state,
                option: action.payload
            }
        case 'SET_TOK_PRI_LIST':
            return{
                ...state,
                tokenPriceList: action.payload
            }
        case 'SET_BILL_TOKEN':
            return{
                ...state,
                billToken : [action.payload]
            }
        case 'SET_BILL_TOKEN_LAGI':
            return{
                ...state,
                billTokenLagi : [action.payload]
            }
        case 'SET_BILL_TAGIHAN':
            return{
                ...state,
                billTagihan : [action.payload]
            }
        case 'SET_BILL_TAGIHAN_LAGI':
            return{
                ...state,
                billTagihanLagi : [action.payload]
            }
        case 'SET_RECEIPT_TOKEN':
            return{
                ...state,
                receiptToken : action.payload
            }
        case 'SET_RECEIPT_TAGIHAN':
            return{
                ...state,
                receiptTagihan : [action.payload]
            }
        default:
            return state
    }

}

export default electricityReducer