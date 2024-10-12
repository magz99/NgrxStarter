import { FormArray, FormControl, FormGroup } from "@angular/forms"
import { getUserTableRows } from "./user-view.helpers"
import { UserRowData } from "./models/user-table.model"

describe('User View Helper functions', ()=>{
    describe('getUserTableRows', ()=>{
        it('returns the tableForm rows as a FormArray', ()=>{
            const formArray = new FormArray([
                new FormGroup({
                    id: new FormControl(''),
                    name: new FormControl(''),
                    username:  new FormControl(''),
                    email: new FormControl(''),
                    isEditing: new FormControl(false)
                })
            ]) as FormArray<FormGroup<UserRowData>>;
            
            const mockTableForm = new FormGroup({
                userTableRows: formArray
            });

            expect(getUserTableRows(mockTableForm)).toEqual(formArray)
        })
    })
})