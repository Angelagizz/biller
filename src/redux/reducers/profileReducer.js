import { set } from "react-hook-form";

const initialState = {
  userDetail: [],
  userPayment:[
    {
      card_number:'0000000000000000',
      card_holder_name:'Bank Transfer',
      expire_date :'2100-12-12',
      cvv:'123',
      type:'Bank Transfer'
    },
  ],
  primary:[
    {
      card_number:'',
      card_holder_name:'',
      expire_date :'',
      cvv:'',
      type:'Bank Transfer'
    },
  ],
  reload:true
};

const profileReducer = (state = initialState, action) => {
  // const { type, payload: { email, token } = {} } = action;
  switch (action.type) {
    case "user/detail":
      return {
        ...state,
        userDetail: [action.payload.data]
      };
    case "SET_USER_PAYMENT":
      return {
        ...state,
        userPayment: state.userPayment.concat(action.payload.data)
      };
    case 'CHANGE_USER_PAYMENT':
      return{
          ...state,
          primary : state.primary.concat(action.payload).slice(1)  
      }
    case 'SET_RELOAD':
      return{
          ...state,
          reload : action.payload.data
      }
    default:
      return state;
  }
};

export default profileReducer;