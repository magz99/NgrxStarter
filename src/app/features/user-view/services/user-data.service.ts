import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersResponse } from "../models/users.model";
import { Observable } from "rxjs";
import { USERS_BASE_URL } from "../user.constants";

/**
 * Service handles the requests to the Users endpoint
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private readonly httpClient: HttpClient){}


    getUsers(): Observable<UsersResponse>{
        return this.httpClient.get<UsersResponse>(USERS_BASE_URL);
    }
}