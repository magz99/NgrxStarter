import { HttpClient } from "@angular/common/http";
import { UserDataService } from "./user-data.service";
import { MOCK_RESPONSE, USERS_BASE_URL } from "../user-view.constants";
import { of } from "rxjs";
import { User, UserUiData } from "../models/users.model";

describe('User Data Service', ()=>{

    function setup() {

        const mockHttpClient : jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get', 'patch']);

        const service = new UserDataService(mockHttpClient);
        return {
            service,
            mockHttpClient
        }
    }

    it('fetches the users from the endpoint', ()=>{
       const {service, mockHttpClient} = setup();

       mockHttpClient.get.and.returnValue(of(MOCK_RESPONSE));

       service.getUsers();

       expect(mockHttpClient.get.calls.count()).withContext('one call').toBe(1);
       expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
    })

    it('updates the user data via the endpoint', ()=>{
        const {service, mockHttpClient} = setup();
 
         const updatedUser: UserUiData = {
            id: 111,
            name: 'My full name',
            username: 'testusername',
            email: 'test@test.ca'
        }

        mockHttpClient.patch.and.returnValue(of(updatedUser));
 
        service.updateUser(updatedUser);
 
        expect(mockHttpClient.patch.calls.count()).withContext('one call').toBe(1);
        expect(mockHttpClient.patch).toHaveBeenCalledTimes(1);
        expect(mockHttpClient.patch).toHaveBeenCalledWith(`${USERS_BASE_URL}/${updatedUser.id}`, updatedUser)

     })
})