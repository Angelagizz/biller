export const addPayMethod = (number, name, card_holder) => {
    return {
      type: 'ADD',
      payload: {
        name:name,
        number:number,
        card_holder: card_holder,
      }
    }
  }

export const changePayMethod = (name, number , card_holder)=>{
    return{
        type:'CHANGE',
        payload:{
            name:name,
            number:number,
            card_holder: card_holder,
        }
    }
}