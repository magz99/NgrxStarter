import {createSelector } from "@ngrx/store";
import { usersFeature } from "./users-view.reducer";
import { mapUserResponseToUserFormDataArray } from "./data-transformers";

export const selectUserUiData = createSelector(usersFeature.selectAll, (users)=>{
    return mapUserResponseToUserFormDataArray(users)
});