import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { UserRowData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user.constants";
import { Store } from "@ngrx/store";
import { UserState } from "../+state/users-view.reducer";
import { selectUserUiData } from "../+state/users-view.selectors";
import { Observable, map } from "rxjs";
import { UserUiData } from "../models/users.model";

/**
 * Separate out the table creation logic into this service.
 * Not providing in root since this should be tied to a table instance.
 */
@Injectable({providedIn: 'root'})
export class UserTableFormService {
  
  constructor(private readonly fb: FormBuilder){
  }


  createUserTableForm(users: UserUiData[]): FormGroup<{userTableRows: FormArray<FormGroup<UserRowData>>}> {
   return  this.fb.group<{userTableRows: FormArray<FormGroup<UserRowData>>}>({ userTableRows: this.fb.array(users.map(user=>this.initializeUserRow(user))) })
    
  }

  /**
   * Uses the keys that make up the table header in order to create the equivalent form 
   * controls for the data.
   */
  initializeUserRow(userData: UserUiData): FormGroup<UserRowData> {

    const dynamicGroup = Object.keys(USER_TABLE_HEADERS).reduce((prev, headerKey) => {
      return {
        ...prev,
        [headerKey] : this.fb.control({value: userData[headerKey as keyof UserUiData], disabled: true}, {nonNullable: true, validators: [Validators.required]} )
        }
    }, {} as UserRowData);

    return this.fb.group<UserRowData>(dynamicGroup);
  }

  // getUserTableRows(): FormArray<FormGroup<UserRowData>> {
  //   return this.userTableForm?.get('userTableRows') as FormArray
  // }


  // saveRowData(rowId: number): void {
  //   console.log('magz row data: ',  this.getUserTableRows().at(rowId).value);
  //   this.getUserTableRows().at(rowId).get('isEditing')?.patchValue(false);
  //   this.getUserTableRows().at(rowId).disable();

  //   // Dispatch action to so that the API service can be called.
  // }

  // editRowData(data: { rowId: number; value: boolean; }): void {
  //   this.getUserTableRows().at(data.rowId).enable();
  //   this.getUserTableRows().at(data.rowId).get('isEditing')?.patchValue(true);
  // }
}