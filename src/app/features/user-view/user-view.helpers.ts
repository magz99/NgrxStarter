import { FormArray, FormGroup } from "@angular/forms";
import { UserRowData } from "./models/user-table.model";

export function getUserTableRows(tableForm: FormGroup): FormArray<FormGroup<UserRowData>> {
    return tableForm.get('userTableRows') as FormArray
}