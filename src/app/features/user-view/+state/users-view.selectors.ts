import { State, createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_VIEW_FEATURE_KEY, UserState } from "./users-view.reducer";
import { UserUiData, UsersResponse } from "../models/users.model";

const selectUserViewState = createFeatureSelector<UserState>(USER_VIEW_FEATURE_KEY);

const selectUserResponse = createSelector(selectUserViewState, (state: UserState)=>state.response);
 
/**
 * Transform the response into what will be used by the UI (table)
 */
export const selectUserUiData = createSelector(selectUserResponse, (userResponse)=>{
    return mapUserResponseToUserUiData(userResponse)
});


/**
 * 
 * Helper function that does the transformation. This can be used to set defaults in case 
 * the data may not be what we expect.
 */
function mapUserResponseToUserUiData(response: UsersResponse): UserUiData[] {
    return response.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        isEditing: false
    }))
}