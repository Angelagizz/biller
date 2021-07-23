const initialState = {
    option:[],
    datacust:[],
    dataBill:[],
    receipt :[],
}

const internetReducer = (state=initialState, action) =>{
    switch (action.type) {
        case 'SET':
            return{
                ...state,
                option: action.payload
            }
        case 'SETCUST':
            return{
                ...state,
                datacust: [action.payload]
            }
        case 'SETDATABILL':
            return{
                ...state,
                dataBill: [action.payload]
            }
        case 'SETINTERNETRECEIPT':
            return{
                ...state,
                receipt : [action.payload]
            }
        default:
            return state
    }

}

export default internetReducer;