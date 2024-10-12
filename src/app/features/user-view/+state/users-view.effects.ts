import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {concatLatestFrom} from '@ngrx/operators';
import { UserDataService } from "../services/user-data.service";
import { userDataApiActions, usersViewComponentActions } from "./users-view.actions";
import { catchError, exhaustMap, map, of, tap, withLatestFrom } from "rxjs";
import { UserTableFormService } from "../services/user-table-form.service";
import { selectUserUiData } from "./users-view.selectors";
import { Store } from "@ngrx/store";
import { UserData } from "../models/users.model";

export const loadUsers = createEffect(
    (actions$ = inject(Actions), userDataService = inject(UserDataService)) => {
      return actions$.pipe(
        ofType(usersViewComponentActions.loadUserData),
        exhaustMap(() =>
        userDataService.getUsers().pipe(
            map((users) => userDataApiActions.usersLoadedSuccess({ data: users })),
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
            map((user: UserData) => userDataApiActions.userUpdatedSuccess({ data: user })),
            catchError((error: { message: string }) =>
              of(userDataApiActions.userUpdatedFailure({ errorMsg: error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  );