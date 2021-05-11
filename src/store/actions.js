import { SET_LOGIN,Loggout as Logout } from "./actionTypes"

export const setLoggedIn = (payload = null)=>{
    return{
        type:SET_LOGIN,
        payload:payload
    }
}

export const Loggout = () =>{
    return{
        type:Logout
    }
}