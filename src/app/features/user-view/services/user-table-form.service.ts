import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UserRowData } from "../models/user-table.model";
import { USER_TABLE_HEADERS } from "../user-view.constants";
import { UserFormData } from "../models/users.model";

/**
 * Separate out the table creation logic into this service.
 */
@Injectable({providedIn: 'root'})
export class UserTableFormService {
  
  constructor(private readonly fb: FormBuilder){
  }

  createUserTableForm(users: UserFormData[]): FormGroup<{userTableRows: FormArray<FormGroup<UserRowData>>}> {
     return  this.fb.group<{userTableRows: FormArray<FormGroup<UserRowData>>}>({ userTableRows: this.fb.array(users.map(user=>this.initializeUserRow(user))) })
    
  }

  /**
   * Uses the keys that make up the table header in order to create the equivalent form 
   * controls for the data.
   */
  initializeUserRow(userData: UserFormData): FormGroup<UserRowData> {

    const dynamicGroup = Object.keys(USER_TABLE_HEADERS).reduce((prev, headerKey) => {
      return {
        ...prev,
        [headerKey] : this.fb.control({value: userData[headerKey as keyof UserFormData], disabled: true}, {nonNullable: true, validators: [Validators.required]} )
        }
    }, {} as UserRowData);

    return this.fb.group<UserRowData>(dynamicGroup);
  }

}