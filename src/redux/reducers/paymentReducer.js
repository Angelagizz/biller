const initialState = {
    paymentMethod:[
                    {
                    name:'Bank transfer',
                    number:'',
                    card_holder:'',
                    },
                    {
                    name:'master-card',
                    number:'1111222233339898',
                    card_holder:'Justin Junaedi',
                    },
                    {
                    name:'visa',
                    number:'1111222233338787',
                    card_holder:'Justin Junaedi',
                    },
                   ],
    primary:[ {
        name:'Bank transfer',
        number:'',
        card_holder:'',
        },
]
          
    
}

const paymentMethodReducer = (state=initialState, action) =>{
    switch (action.type) {
        case 'ADD':
            return{
                ...state,
                paymentMethod : state.paymentMethod.concat(action.payload)
            }
        case 'CHANGE':
            return{
                ...state,
                primary : state.primary.concat(action.payload).slice(1)
                
            }
        default:
            return state
    }

}

export default paymentMethodReducer