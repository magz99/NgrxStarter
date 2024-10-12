import { createReducer, on } from "@ngrx/store";
import { UsersResponse } from "../models/users.model";
import { userDataApiActions } from "./users-view.actions";

export const USER_VIEW_FEATURE_KEY = 'userView';

export interface UserState {
    response: UsersResponse;
}

/**
 * Note: If we anticipate that our User list will grow, or that we will 
 * be doing more complicated manipulation of data, we can leverage NgRx 
 * Entity State.
 */
export const initialState: UserState = {
   response: [],
};

export const usersViewReducer = createReducer(initialState,
    on(userDataApiActions.usersLoadedSuccess, (state, {data})=>{
        return {
            ...state,
            response: data,
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