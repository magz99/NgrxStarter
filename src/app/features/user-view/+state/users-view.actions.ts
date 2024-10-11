import { createActionGroup, emptyProps, props } from "@ngrx/store";
import {  UserUiData, UsersResponse } from "../models/users.model";

export const userDataServiceActions = createActionGroup({
    source: 'User Data Service',
    events: {
        // The component could dispatch this
        'Load User Data': emptyProps(),
        // The effect will dispatch this
        'Set User Data': props<{data: UsersResponse}>(),
        // The effect will dispatch this
        'Update User Data': props<{data: UserUiData}>()
    }
})

// export const userDataTableActions = createActionGroup({
//     source: 'User Data Table',
//     events: {
//         'Edit Row': props<{ rowIndex: number, value: boolean }>(),
//         'Save Row': props<{ rowIndex: number }>()
//     }
// })