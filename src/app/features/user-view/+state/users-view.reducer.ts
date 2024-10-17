import { createFeature, createReducer, on } from "@ngrx/store";
import { User, UsersResponse } from "../models/users.model";
import { userDataApiActions, usersViewComponentActions } from "./users-view.actions";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export const USER_VIEW_FEATURE_KEY = 'users';


export interface State extends EntityState<User> {
    loading: boolean;
    errorMsg: string | undefined;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
    loading: false,
    errorMsg: undefined
});


/**
 * Note: If we anticipate that our User list will grow, or that we will 
 * be doing more complicated manipulation of data, we can leverage NgRx 
 * Entity State.
 */
// export const initialState: UserState = {
//    response: [],
//    loading: false,
//    errorMsg: undefined
// };

export const usersViewReducer = createReducer(initialState,
    on(usersViewComponentActions.loadUserData, (state)=>{
        return {
            ...state,
            loading: true
        }
    }),
    on(userDataApiActions.usersLoadedSuccess, (state, {data})=>{
        return adapter.setAll(data, {
            ...state,
            loading: false,
            errorMsg: undefined
        });
    }),
    on(userDataApiActions.usersLoadedFailure, (state, {errorMsg})=>{
        return  adapter.setAll([], {
            ...state,
            loading: false,
            errorMsg
        });
    }),
    on(userDataApiActions.userUpdatedSuccess, (state, {data})=>{
        return adapter.updateOne({ id: data.id, changes: data }, state)
    }),
    on(userDataApiActions.usersUpdatedSuccess, (state, {data})=>{
        return adapter.setAll([...data], state)
    })
)


export const usersFeature = createFeature({
    name: USER_VIEW_FEATURE_KEY,
    reducer: usersViewReducer,
    extraSelectors: ({ selectUsersState}) => ({
      ...adapter.getSelectors(selectUsersState),
    }),
  });
