import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class UserService {
  usersUrl = 'http://localhost:8080/api/users';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UsersService');
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<User[]>(this.usersUrl, options)
      .pipe(
        catchError(this.handleError<User[]>('searchUsers', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new user to the database */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<unknown> {
    const url = `${this.usersUrl}/${id}`; // DELETE api/users/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser'))
      );
  }

  /** PUT: update the user on the server. Returns the updated user upon success. */
  updateUser(user: User): Observable<User> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<User>(this.usersUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }
}
