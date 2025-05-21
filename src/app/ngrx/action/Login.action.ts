import { Action } from "@ngrx/store";
import { LoginModel } from "../model/Login.model";

export const  AddTitle = 'Add';
export const  RemoveTitle = 'Remove'

export class AddDetail implements Action {
    readonly type = AddTitle

    constructor(public payload:LoginModel){}
}

export class RemoveDetail implements Action {
    readonly type = RemoveTitle

   constructor(public payload:LoginModel){}
}

export type Actions = AddDetail | RemoveDetail