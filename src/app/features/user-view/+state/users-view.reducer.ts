import { createReducer, on } from "@ngrx/store";
import { UsersResponse } from "../models/users.model";
import { userDataApiActions, usersViewComponentActions } from "./users-view.actions";

export const USER_VIEW_FEATURE_KEY = 'userView';

export interface UserState {
    response: UsersResponse;
    loading: boolean;
    errorMsg: string | undefined;
}

/**
 * Note: If we anticipate that our User list will grow, or that we will 
 * be doing more complicated manipulation of data, we can leverage NgRx 
 * Entity State.
 */
export const initialState: UserState = {
   response: [],
   loading: false,
   errorMsg: undefined
};

export const usersViewReducer = createReducer(initialState,
    on(usersViewComponentActions.loadUserData, (state)=>{
        return {
            ...state,
            loading: true
        }
    }),
    on(userDataApiActions.usersLoadedSuccess, (state, {data})=>{
        return {
            ...state,
            response: data,
            loading: false,
            errorMsg: undefined
        }
    }),
    on(userDataApiActions.usersLoadedFailure, (state, {errorMsg})=>{
        return {
            ...state,
            errorMsg,
            loading: false
        }
    }),
    on(userDataApiActions.userUpdatedSuccess, (state, {data})=>{
        const updatedUsers = state.response.map(
            user=>data.id === user.id ? data : user
        );
        
        return {
            ...state,
            response: updatedUsers,
        }
    }),
)