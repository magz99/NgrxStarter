import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User, UserUiData, UsersResponse } from "../models/users.model";

/**
 * The Effect will dispatch these actions.
 */
export const userDataApiActions = createActionGroup({
    source: 'User Data Service',
    events: {
        'Users Loaded Success': props<{data: UsersResponse}>(),
        'Users Loaded Failure': props<{errorMsg: string}>(),

        'User Updated Success': props<{data: User}>(),
        'User Updated Failure': props<{errorMsg: string}>(),

        'Users Updated Success': props<{data: UsersResponse}>(),
        'Users Updated Failure': props<{errorMsg: string}>(),
    }
})

/**
 * The User View component will dispatch these actions.
 */
export const usersViewComponentActions = createActionGroup({
    source: 'User View Component',
    events: {
        'Load User Data': emptyProps(),
        'Save User Data': props<{data: UserUiData}>(),
        'Save Table Data': props<{data: UserUiData[]}>()
    }
})