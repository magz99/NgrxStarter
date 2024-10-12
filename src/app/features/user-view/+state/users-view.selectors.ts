import { State, createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_VIEW_FEATURE_KEY, UserState } from "./users-view.reducer";
import { mapUserResponseToUserUiData } from "./data-transformers";

const selectUserViewState = createFeatureSelector<UserState>(USER_VIEW_FEATURE_KEY);

const selectUserResponse = createSelector(selectUserViewState, (state: UserState)=>state.response);
 
/**
 * Transform the response into what will be used by the UI (table)
 */
export const selectUserUiData = createSelector(selectUserResponse, (userResponse)=>{
    return mapUserResponseToUserUiData(userResponse)
});

export const selectErrorMessage = createSelector(selectUserViewState, (state: UserState)=>state.errorMsg)