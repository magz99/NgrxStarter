import { createActionGroup, emptyProps, props } from "@ngrx/store";
import {  UserUiData, UsersResponse } from "../models/users.model";

export const userDataServiceActions = createActionGroup({
    source: 'User Data Service',
    events: {
        // The effect will dispatch this
        'Update User Data': props<{data: UserUiData}>()
    }
})

export const userDataApiActions = createActionGroup({
    source: 'User Data Service',
    events: {
        // The effect will dispatch this
        'Users Loaded Success': props<{data: UsersResponse}>(),
        // The effect will dispatch this
        'Users Loaded Failure': props<{errorMsg: string}>()
    }
})

export const usersViewComponentActions = createActionGroup({
    source: 'User View Component',
    events: {
        // The component could dispatch this
        'Load User Data': emptyProps(),
    }
})