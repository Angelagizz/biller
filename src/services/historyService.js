export const getDataHistory = async (token) =>{
    const url = 'https://biller-app-api.herokuapp.com/api/biller/history/all'
    try{
        const response = await fetch(url, {
            method : 'GET',
            headers :{
                'content-Type' : 'appplication/json',
                Authorization : `Bearer ${token}`,
            },
        })
        return response.json();
    } 
    catch (error){
        throw error
    }
}

export const filterDataHistoryToday = async (token) =>{
    const url = 'https://biller-app-api.herokuapp.com/api/biller/history/filter/today'
    try{
        const response = await fetch(url, {
            method : 'GET',
            headers :{
                'content-Type' : 'appplication/json',
                Authorization : `Bearer ${token}`,
            },
        })
        return response.json();
    } 
    catch (error){
        throw error
    }
}

export const filterDataHistoryLastWeek = async (token) =>{
    const url = 'https://biller-app-api.herokuapp.com/api/biller/history/filter/lastWeek'
    try{
        const response = await fetch(url, {
            method : 'GET',
            headers :{
                'content-Type' : 'appplication/json',
                Authorization : `Bearer ${token}`,
            },
        })
        return response.json();
    } 
    catch (error){
        throw error
    }
}

export const filterDataHistoryLastMonth = async (token) =>{
    const url = 'https://biller-app-api.herokuapp.com/api/biller/history/filter/lastWeek'
    try{
        const response = await fetch(url, {
            method : 'GET',
            headers :{
                'content-Type' : 'appplication/json',
                Authorization : `Bearer ${token}`,
            },
        })
        return response.json();
    } 
    catch (error){
        throw error
    }
}

export const filterDataHistoryLast3Month = async (token) =>{
    const url = 'https://biller-app-api.herokuapp.com/api/biller/history/filter/last3Month'
    try{
        const response = await fetch(url, {
            method : 'GET',
            headers :{
                'content-Type' : 'appplication/json',
                Authorization : `Bearer ${token}`,
            },
        })
        return response.json();
    } 
    catch (error){
        throw error
    }
}

export const getHistoryDetail = async (token, billId) =>{
    const url = `https://biller-app-api.herokuapp.com/api/biller/receipt/${billId}`
    try{
        const response = await fetch(url, {
            method : 'GET',
            headers :{
                'content-Type' : 'appplication/json',
                Authorization : `Bearer ${token}`,
            },
        })
        return response.json();
    } 
    catch (error){
        throw error
    }
}
