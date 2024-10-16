import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserDataService } from "../services/user-data.service";
import { userDataApiActions, usersViewComponentActions } from "./users-view.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { User } from "../models/users.model";

export const loadUsers = createEffect(
    (actions$ = inject(Actions), userDataService = inject(UserDataService)) => {
      return actions$.pipe(
        ofType(usersViewComponentActions.loadUserData),
        exhaustMap(() =>
        userDataService.getUsers().pipe(
            map((users) => userDataApiActions.usersLoadedSuccess({ data: users})),
            catchError((error: { message: string }) =>
              of(userDataApiActions.usersLoadedFailure({ errorMsg: error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  );


export const updateUser = createEffect(
    (actions$ = inject(Actions), userDataService = inject(UserDataService)) => {
      return actions$.pipe(
        ofType(usersViewComponentActions.saveUserData),
        exhaustMap(({data}) =>
        userDataService.updateUser(data).pipe(
            map((user: User) => userDataApiActions.userUpdatedSuccess({ data: user })),
            catchError((error: { message: string }) =>
              of(userDataApiActions.userUpdatedFailure({ errorMsg: error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  );

  export const updateAllUsers = createEffect(
    (actions$ = inject(Actions), userDataService = inject(UserDataService)) => {
      return actions$.pipe(
        ofType(usersViewComponentActions.saveTableData),
        exhaustMap(({data}) =>
        userDataService.updateAllUsers(data).pipe(
            map((users: User[]) => userDataApiActions.usersUpdatedSuccess({ data: users })),
            catchError((error: { message: string }) =>
              of(userDataApiActions.userUpdatedFailure({ errorMsg: error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  );