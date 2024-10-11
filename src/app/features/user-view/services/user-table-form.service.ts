import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UserData } from "../models/user-table.model";

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

  initializeUserRow(): FormGroup<UserData> {
    return this.fb.group<UserData>({
      id: this.fb.control<string>({value: '99', disabled: true}, {nonNullable: true, validators: [Validators.required]} ),
      name: this.fb.control<string>({value: 'Magz Bautista-Lee', disabled: true}, {nonNullable: true, validators: [Validators.required]} ),
      username:  this.fb.control<string>({value: 'magz99', disabled: true}, {nonNullable: true, validators: [Validators.required]} ),
      email: this.fb.control<string>({value: 'mbautistalee@gmail.com', disabled: true}, {nonNullable: true, validators: [Validators.required]} ),
      isEditing: this.fb.control<boolean>(false, {nonNullable: true, validators: [Validators.required]} ),
    })
  }

  getUserTableRows(): FormArray<FormGroup<UserData>> {
    return this.userTableForm.get('userTableRows') as FormArray
  }


  saveRowData(rowId: number): void {
    this.getUserTableRows().at(rowId).get('isEditing')?.patchValue(false);
    this.getUserTableRows().at(rowId).disable();
  }

  editRowData(data: { rowId: number; value: boolean; }): void {
    this.getUserTableRows().at(data.rowId).enable();
   this.getUserTableRows().at(data.rowId).get('isEditing')?.patchValue(true);
  }
}