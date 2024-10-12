import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {concatLatestFrom} from '@ngrx/operators';
import { UserDataService } from "../services/user-data.service";
import { userDataApiActions, usersViewComponentActions } from "./users-view.actions";
import { catchError, exhaustMap, map, of, tap, withLatestFrom } from "rxjs";
import { UserTableFormService } from "../services/user-table-form.service";
import { selectUserUiData } from "./users-view.selectors";
import { Store } from "@ngrx/store";

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
