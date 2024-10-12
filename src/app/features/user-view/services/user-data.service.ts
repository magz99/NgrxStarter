import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserData, UsersResponse } from "../models/users.model";
import { Observable, of } from "rxjs";
import { MOCK_RESPONSE, USERS_BASE_URL } from "../user.constants";


/**
 * Service handles the requests to the Users endpoint
 */
@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    constructor(private readonly httpClient: HttpClient){}

    getUsers(): Observable<UsersResponse>{
        return of(MOCK_RESPONSE);//this.httpClient.get<UsersResponse>(USERS_BASE_URL);
    }

    updateUser(userData: Partial<UserData>, userId: string ): Observable<UserData> {
        return this.httpClient.patch<UserData>(`${USERS_BASE_URL}/${userId}`, userData);
    }
}