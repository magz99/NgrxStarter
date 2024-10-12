import {Component, OnDestroy, OnInit} from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { UserRowData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user.constants";
import { UserTableFormService } from "../services/user-table-form.service";
import { Observable, Subscription, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { usersViewComponentActions } from "../+state/users-view.actions";
import { selectUserUiData } from "../+state/users-view.selectors";
import { UserFormData } from "../models/users.model";
import { mapUserFormDataToUserUiData } from "../+state/data-transformers";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
})
export class UserViewComponent implements OnInit, OnDestroy {
  userTableForm: FormGroup | undefined;

  private subscription?: Subscription;
  readonly USER_TABLE_HEADERS = USER_TABLE_HEADERS;
  readonly users$: Observable<UserFormData[]> = this.store.select(selectUserUiData);

  constructor( private readonly userTableFormService: UserTableFormService, private readonly store: Store){

  }

  getUserTableRows(): FormArray<FormGroup<UserRowData>> {
    return this.userTableForm?.get('userTableRows') as FormArray
  }
 
  saveRowData(rowId: number): void {
    const tableRowGroup = this.getUserTableRows().at(rowId);

    tableRowGroup.get('isEditing')?.patchValue(false);
    tableRowGroup.disable();

    // TODO: only dispatch if the values have changed.
    // Dispatch action to so that the API service can be called.
    this.store.dispatch(usersViewComponentActions.saveUserData({
      data: mapUserFormDataToUserUiData(tableRowGroup.getRawValue())
    }))
  }

  editRowData(rowId: number): void {
    const tableRowGroup = this.getUserTableRows().at(rowId);

    tableRowGroup.enable();
    tableRowGroup.get('isEditing')?.patchValue(true);
  }

  ngOnInit(): void {
    this.store.dispatch(usersViewComponentActions.loadUserData());

    // Listen for Users data to be loaded and update the table formgroup
    this.subscription = this.users$.pipe(
      tap(users=>{
        this.userTableForm = this.userTableFormService.createUserTableForm(users);
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
