const initialState = {
    datacusto:[],
    bpjsBillNoPin: [],
    databill:[],
    receipt: []
}

const BpjsReducer = (state=initialState, action) =>{
    switch (action.type) {
        case 'SETDATA':
            return{
                ...state,
                datacusto: [action.payload]
            }
        case 'SETBILLNOPIN':
            return{
                ...state,
                bpjsBillNoPin: action.payload
            }

        case 'SETBPJSBILL':
            return{
                ...state,
                databill: [action.payload]
            }

        case 'SETBPJSRECEIPT':
            return{
                ...state,
                receipt : [action.payload]
            }

        default:
            return state
    }

}

export default BpjsReducer;