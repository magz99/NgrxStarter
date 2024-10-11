import { createReducer, on } from "@ngrx/store";
import { UserUiData, UsersResponse } from "../models/users.model";
import { userDataServiceActions } from "./users-view.actions";

export interface UserState {
    response: UsersResponse;
    //userUiData: UserUiData[];
}

export const initialState: UserState = {
   response: [],
   //userUiData: []
};

export const usersViewReducer = createReducer(initialState,
    on(userDataServiceActions.setUserData, (state, {data})=>{
        return {
            ...state,
            response: data,
        }
    }),
)