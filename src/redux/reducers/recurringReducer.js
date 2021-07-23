const initialState = {
    date:'',
    year:'',
    month:'',
    period:'',
    day:'',
    status:false,
}

const recurringReducer = (state=initialState, action) =>{
    switch (action.type) {
        case 'SET_DATE':
            return{
                ...state,
                date: action.payload
            }
        case 'SET_MONTH':
            return{
                ...state,
                month : action.payload
            }
        case 'SET_YEAR':
            return{
                ...state,
                year : action.payload
            }
        case 'SET_PERIOD':
            return{
                ...state,
                period : action.payload
            }
        case 'SET_DAY':
            return{
                ...state,
                day : action.payload
            }
        case 'SET_RECURRING_STATUS':
            return{
                ...state,
                status : action.payload
            }
        default:
            return state
    }

}

export default recurringReducer