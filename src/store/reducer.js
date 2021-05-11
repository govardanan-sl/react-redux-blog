import { Loggout, SET_LOGIN } from "./actionTypes";

const initialState = {
    isLoggedIn : false,
    profile_id : null,
    accessToken: null
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case Loggout: return{
            ...state,
            isLoggedIn:false,
            profile_id:null,
            accessToken:null
        }
        case SET_LOGIN: return{
            ...state,
            isLoggedIn:true,
            profile_id:action.payload.profile_id,
            accessToken:action.payload.accessToken
        }
        default: return state
    }
}

export default reducer;
