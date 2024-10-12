import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { UserRowData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user-view.constants";
import { UserTableFormService } from "../services/user-table-form.service";
import { Observable, map } from "rxjs";
import { Store } from "@ngrx/store";
import { usersViewComponentActions } from "../+state/users-view.actions";
import { selectUserUiData } from "../+state/users-view.selectors";
import { UserFormData } from "../models/users.model";
import { mapUserFormDataToUserUiData } from "../+state/data-transformers";
import { getUserTableRows } from "../user-view.helpers";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit {
  readonly USER_TABLE_HEADERS = USER_TABLE_HEADERS;
  readonly users$: Observable<UserFormData[]> = this.store.select(selectUserUiData);

  readonly userTableForm$: Observable<FormGroup<{
    userTableRows: FormArray<FormGroup<UserRowData>>;
}>> = this.users$.pipe(
    map(users=>this.userTableFormService.createUserTableForm(users))
  );

  constructor(private readonly userTableFormService: UserTableFormService, private readonly store: Store){

  }

  ngOnInit(): void {
    this.store.dispatch(usersViewComponentActions.loadUserData());
  }
 
  saveRowData(rowId: number, tableForm: FormGroup): void {
    const tableRowGroup = getUserTableRows(tableForm).at(rowId);

    if(tableRowGroup.valid) {
      tableRowGroup.get('isEditing')?.patchValue(false);
      tableRowGroup.disable();
   

      if(tableRowGroup.dirty) {
        // Dispatch action to so that the API service can be called.
        this.store.dispatch(usersViewComponentActions.saveUserData({
          data: mapUserFormDataToUserUiData(tableRowGroup.getRawValue())
        }))
      }
    }
  }

  editRowData(rowId: number, tableForm: FormGroup): void {
    const tableRowGroup = getUserTableRows(tableForm).at(rowId);

    tableRowGroup.enable();
    tableRowGroup.get('isEditing')?.patchValue(true);
  }

  
}
