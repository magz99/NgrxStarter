import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { UserRowData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user.constants";

/**
 * Separate out the table creation logic into this service.
 */
@Injectable({providedIn: 'root'})
export class UserTableFormService {
    userTableForm: FormGroup;

  constructor(private readonly fb: FormBuilder){
    this.userTableForm = this.createUserTableForm();
  }


  private createUserTableForm(): FormGroup {
    return this.fb.group({ userTableRows: this.fb.array([this.initializeUserRow(), this.initializeUserRow()]) })
  }

  getUserTableForm() {
    return this.userTableForm;
  }


  /**
   * Uses the keys that make up the table header in order to create the equivalent form 
   * controls for the data.
   */
  initializeUserRow(): FormGroup<UserRowData> {

    const dynamicGroup = Object.keys(USER_TABLE_HEADERS).reduce((prev, headerKey) => {
      return {
        ...prev,
        [headerKey] : this.fb.control<string>({value: 'Test value', disabled: true}, {nonNullable: true, validators: [Validators.required]} )
        }
    }, {} as UserRowData);

    const userDataGroup: UserRowData = {
        ...dynamicGroup,
        isEditing: this.fb.control<boolean>(false, {nonNullable: true, validators: [Validators.required]} ),
    };

    return this.fb.group<UserRowData>(userDataGroup);
  }

  getUserTableRows(): FormArray<FormGroup<UserRowData>> {
    return this.userTableForm.get('userTableRows') as FormArray
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
}