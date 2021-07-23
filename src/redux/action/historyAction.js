export const setDataHistory = (data) =>{
    return{
        type : 'SET_HISTORY',
        payload : data,
    }
}

export const setHistoryDetail = (data) =>{
    return{
        type : 'SET_HISTORY_DETAIL',
        payload : data,
    }
}

export const setHistoryLoading = () =>{
    return{
        type : 'SET_HISTORY_LOADING'
    }
}
