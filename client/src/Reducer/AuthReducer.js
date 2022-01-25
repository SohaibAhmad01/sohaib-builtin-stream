import { SIGN_OUT,SIGN_IN } from "../Actions/typeof";

const initial_State={
    isSignedIn: null,
    userId:null
};

export default(state=initial_State, action)=>{
    switch(action.type){
        case SIGN_IN:
            return {...state, isSignedIn:true, userId:action.payload}
        case SIGN_OUT:
            return {...state, isSignedIn:false, userId:null}
        default:
            return state
    }

}