import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserRowData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user.constants";
import { UserTableFormService } from "../services/user-table-form.service";
import { Observable, map, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { usersViewComponentActions } from "../+state/users-view.actions";
import { selectUserUiData } from "../+state/users-view.selectors";
import { UserUiData } from "../models/users.model";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: [``],
})
export class UserViewComponent implements OnInit {
  readonly USER_TABLE_HEADERS = USER_TABLE_HEADERS;
   userTableForm: FormGroup | undefined;
  

    users$: Observable<UserUiData[]> = this.store.select(selectUserUiData);

  constructor( private readonly userTableFormService: UserTableFormService, private readonly store: Store){

  }

  getUserTableRows(): FormArray<FormGroup<UserRowData>> {
    return this.userTableForm?.get('userTableRows') as FormArray
  }


  saveRowData(rowId: number): void {
    console.log('magz row data: ',  this.getUserTableRows().at(rowId).value);
    this.getUserTableRows().at(rowId).get('isEditing')?.patchValue(false);
    this.getUserTableRows().at(rowId).disable();

    // Dispatch action to so that the API service can be called.
  }

  editRowData(data: { rowId: number; value: boolean; }): void {
    this.getUserTableRows().at(data.rowId).enable();
    this.getUserTableRows().at(data.rowId).get('isEditing')?.patchValue(true);
  }

  ngOnInit(): void {
    this.store.dispatch(usersViewComponentActions.loadUserData());

    this.users$.pipe(
      tap(users=>{
        this.userTableForm = this.userTableFormService.createUserTableForm(users);
      })
    ).subscribe()
  }

}
