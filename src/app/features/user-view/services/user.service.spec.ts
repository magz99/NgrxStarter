import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";

describe('User Service', ()=>{

    function setup() {

        const mockHttpClient : jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);

        const service = new UserService(mockHttpClient);
        return {
            service,
            mockHttpClient
        }
    }

    it('fetches the users from the endpoint', ()=>{
       const {service, mockHttpClient} = setup();

       service.getUsers();

       expect(mockHttpClient.get.calls.count()).withContext('one call').toBe(1);
       //expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
    })
})