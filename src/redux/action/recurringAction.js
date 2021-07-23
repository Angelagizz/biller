export const setRecurringDate = (data) => {
    return {
      type: 'SET_DATE',
      payload: data
    }
  }

export const setRecurringMonth = (data) => {
  return {
    type: 'SET_MONTH',
    payload: data
  }
}

export const setRecurringYear = (data) =>{
  return{
    type: 'SET_YEAR',
    payload: data
  }
}

export const setRecurringPeriod = (data) =>{
    return{
      type: 'SET_PERIOD',
      payload: data
    }
}

export const setRecurringDay = (data) =>{
    return{
      type: 'SET_DAY',
      payload: data
    }
}

export const setRecurringStatus = (data) =>{
  return{
    type: 'SET_RECURRING_STATUS',
    payload: data
  }
}