import { createReducer, on } from "@ngrx/store";
import { UserUiData, UsersResponse } from "../models/users.model";
import { userDataApiActions, userDataServiceActions } from "./users-view.actions";

export const USER_VIEW_FEATURE_KEY = 'userView';

export interface UserState {
    response: UsersResponse;
    //userUiData: UserUiData[];
}

// TODO: If we anticipate that our User list will grow, we can leverage NgRx Entity State

export const initialState: UserState = {
   response: [],
   //userUiData: []
};

export const usersViewReducer = createReducer(initialState,
    on(userDataApiActions.usersLoadedSuccess, (state, {data})=>{
        return {
            ...state,
            response: data,
        }
    }),
)