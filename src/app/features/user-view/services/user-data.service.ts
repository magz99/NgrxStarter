import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserData, UserUiData, UsersResponse } from "../models/users.model";
import { Observable } from "rxjs";
import { USERS_BASE_URL } from "../user.constants";


/**
 * Service handles the requests to the Users endpoint
 */
@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    constructor(private readonly httpClient: HttpClient){}

    getUsers(): Observable<UsersResponse>{
        return this.httpClient.get<UsersResponse>(USERS_BASE_URL);
    }

    updateUser(userData: UserUiData ): Observable<UserData> {
        return this.httpClient.patch<UserData>(`${USERS_BASE_URL}/${userData.id}`, userData);
    }
}