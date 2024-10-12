import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UserRowData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user-view.constants";
import { UserFormData } from "../models/users.model";

/**
 * Separate out the table creation logic into this helper service.
 */
@Injectable({providedIn: 'root'})
export class UserTableFormService {
  
  constructor(private readonly fb: FormBuilder){
  }

  /**
   * Dynamically create the formGroup based on loaded User data.
   */
  createUserTableForm(users: UserFormData[]): FormGroup<{userTableRows: FormArray<FormGroup<UserRowData>>}> {
     return this.fb.group<{userTableRows: FormArray<FormGroup<UserRowData>>}>({ userTableRows: this.fb.array(users.map(user=>this.initializeUserRow(user))) })
  }

  /**
   * Uses the keys that make up the table header in order to create the equivalent form 
   * controls for the data. Initializes the controls as disabled (read-only).
   */
  initializeUserRow(userData: UserFormData): FormGroup<UserRowData> {
    const defaultValidators = [Validators.required];
    const emailValidators = [...defaultValidators,Validators.email];

    const dynamicGroup = Object.keys(USER_TABLE_HEADERS).reduce((prev, headerKey) => {
      return {
        ...prev,
        [headerKey] : this.fb.control<string | boolean>({value: userData[headerKey as keyof UserFormData], disabled: true}, {nonNullable: true, validators: headerKey === 'email' ? emailValidators : defaultValidators} )
        }
    }, {} as UserRowData);

    return this.fb.group<UserRowData>(dynamicGroup);
  }

}