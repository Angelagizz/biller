const initialState = {
    dataHistory:[],
    historyDetail:[],
    historyLoading:true
}

const historyReducer = (state=initialState, action)=>{
    switch (action.type){
        case 'SET_HISTORY':
            return{
                ...state,
                dataHistory : action.payload,
            }
        case 'SET_HISTORY_DETAIL':
            return{
                ...state,
                historyDetail : [action.payload],
            }
        case 'SET_HISTORY_LOADING':
            return{
                ...state,
                historyLoading : !state.historyLoading,
            }

        default:  
            return state
    }
}

export default historyReducer; 
