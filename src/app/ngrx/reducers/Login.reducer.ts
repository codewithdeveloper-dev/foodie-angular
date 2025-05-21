import { LoginModel } from "../model/Login.model";
import * as LoginAction from "../action/Login.action"

export function loginreducer(state:LoginModel[],action:LoginAction.Actions){
    if(action.type == 'Add'){
      return [...state,action.payload]
    }else 
    // if (action.type == 'Remove'){
    //     state.splice(action.,1)
    //     return state;
    // }
    {
        return state;
    }
}