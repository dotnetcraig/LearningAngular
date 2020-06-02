import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    success: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) return;

        const email = form.value.email;
        const password = form.value.password;
        
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;        
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;

            if (this.error) {
                this.error = null;
            }

            this.success = 'You have successfully ';
            this.success += this.isLoginMode ? 'logged in.' : 'signed up.';

            this.router.navigate(['/recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.success = null;
            this.isLoading = false;
        });

        form.reset();
    }
}