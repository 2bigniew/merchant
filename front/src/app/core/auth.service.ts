import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../../../../contract/Account";
import {retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = 'http://localhost:4000'

  constructor(private httpClient: HttpClient) {}

  getAccountList(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${this.endpoint}/account/list`)
      .pipe(
        retry(2)
      )
  }

  getAccount(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.endpoint}/account/${id}`)
      .pipe(
        retry(2)
      )
  }
}
