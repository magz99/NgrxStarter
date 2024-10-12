import { FormArray, FormBuilder, FormGroup} from "@angular/forms"
import { UserFormData } from "../models/users.model"
import { UserTableFormService } from "./user-table-form.service"

describe('User Table Form Service', ()=>{
    it('returns a UserRowData formGroup for a given UserFormData object', ()=>{
        const formBuilder = new FormBuilder();
        const service = new UserTableFormService(formBuilder);
        const userFormData: UserFormData[] = [{
            id: '99',
            name: 'Test',
            username: 'testingTT',
            email: 'testing@ficotest.com',
            isEditing: false
        }, {
            id: '101',
            name: 'Tester Two',
            username: 'alwaystesting',
            email: 'testingtwo@ficotest.com',
            isEditing: false
        }]
        const resultFormTable = service.createUserTableForm(userFormData);
        const resultFormArray = resultFormTable.get('userTableRows') as FormArray;
        const firstFormGroup = (resultFormArray.at(0) as FormGroup);

        expect(resultFormArray.controls).toHaveSize(2);
        expect(firstFormGroup.controls).toHaveSize(5);
        expect(firstFormGroup.get('email')?.disabled).toBeTrue();
    })
})