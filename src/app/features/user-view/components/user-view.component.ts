import {Component} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user.constants";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: [``]
})
export class UserViewComponent {
  readonly USER_TABLE_HEADERS = USER_TABLE_HEADERS;
  readonly userTableForm: FormGroup = this.fb.group({ userTableRows: this.fb.array([this.initializeUserRow(), this.initializeUserRow()]) })
  

  constructor(private readonly fb: FormBuilder){}

  initializeUserRow(): FormGroup<UserData> {
    return this.fb.group<UserData>({
      id: this.fb.control<string>({value: '99', disabled: true}, {nonNullable: true, validators: [Validators.required]} ),
      name: this.fb.control<string>({value: 'Magz Bautista-Lee', disabled: true}, {nonNullable: true, validators: [Validators.required]} ),
      username:  this.fb.control<string>({value: 'magz99', disabled: true}, {nonNullable: true, validators: [Validators.required]} ),
      email: this.fb.control<string>({value: 'mbautistalee@gmail.com', disabled: true}, {nonNullable: true, validators: [Validators.required]} ),
      isEditing: this.fb.control<boolean>(false, {nonNullable: true, validators: [Validators.required]} ),
    })
  }

  get userTableRows(): FormArray<FormGroup<UserData>> {
    return this.userTableForm.get('userTableRows') as FormArray
  }

  saveRowData(rowId: number): void {
    this.userTableRows.at(rowId).get('isEditing')?.patchValue(false);
    this.userTableRows.at(rowId).disable();
  }

  editRowData(data: { rowId: number; value: boolean; }): void {
    this.userTableRows.at(data.rowId).enable();
   this.userTableRows.at(data.rowId).get('isEditing')?.patchValue(true);
  }

}
