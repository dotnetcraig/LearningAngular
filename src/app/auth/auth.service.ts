import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    baseIdentityUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    API_KEY: string = 'AIzaSyC_8zpKeGiwiQGSgg6Mpu0XEfe2TxRxNDY';
    user = new BehaviorSubject<User>(null);    

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.baseIdentityUrl + 'signUp', {
            email: email,
            password: password,
            returnSecureToken: true
        }, {
            params: new HttpParams().set('key', this.API_KEY)
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.baseIdentityUrl + 'signInWithPassword', {
            email: email,
            password: password,
            returnSecureToken: true
        }, {
            params: new HttpParams().set('key', this.API_KEY)
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
        );

        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email cannot be found';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The account matching these credentials has been disabled.';
                break;
        }

        return throwError(errorMessage);
    }
}