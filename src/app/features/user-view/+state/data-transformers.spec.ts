import { MOCK_RESPONSE } from "../user-view.constants"
import { mapUserFormDataToUserUiData, mapUserResponseToUserFormDataArray } from "./data-transformers"

describe('User Data Transformers', ()=>{
    describe('mapUserResponseToUserFormDataArray', ()=>{
        it('returns an empty array when the data is empty', ()=>{
            expect(mapUserResponseToUserFormDataArray([])).toEqual([])
        })
        it('converts a response to the UI object containing a subset of the data', ()=>{
            expect(mapUserResponseToUserFormDataArray(MOCK_RESPONSE)).toEqual([
                {
                    id: '1',
                    name: "Leanne Graham",
                    username: "Bret",
                    email: "Sincere@april.biz",
                    isEditing: false
                  },
                  {
                    id: '2',
                    name: "Ervin Howell",
                    username: "Antonette",
                    email: "Shanna@melissa.tv",
                    isEditing: false
                  }
            ])
        })
    })
    describe('mapUserFormDataToUserUiData', ()=>{
        it('converts UserFormData object to a UserUiData to send to the endpoint', ()=>{
            expect(mapUserFormDataToUserUiData(
                {
                    id: '456',
                    name: 'testName',
                    username: 'testUserName',
                    email: 'testEmail',
                    isEditing: false
                }
            )).toEqual({
                
                    id: 456,
                    name: 'testName',
                    username: 'testUserName',
                    email: 'testEmail',
                
            })
        })
    })

})