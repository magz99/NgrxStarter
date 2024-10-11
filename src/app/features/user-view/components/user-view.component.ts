import {Component} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserRowData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user.constants";
import { UserTableFormService } from "../services/user-table-form.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: [``]
})
export class UserViewComponent {
  readonly USER_TABLE_HEADERS = USER_TABLE_HEADERS;
  readonly userTableForm: FormGroup;
  

  constructor(private readonly userTableFormService: UserTableFormService){
    this.userTableForm = this.userTableFormService.getUserTableForm();
  }

  get userTableRows(): FormArray<FormGroup<UserRowData>> {
    return this.userTableForm.get('userTableRows') as FormArray
  }

  saveRowData(rowId: number): void {
    this.userTableFormService.saveRowData(rowId)
  }

  editRowData(data: { rowId: number; value: boolean; }): void {
    this.userTableFormService.editRowData(data)
  }

}
