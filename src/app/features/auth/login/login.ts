import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    loginForm = new FormGroup({
        email: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.email,
            ],
        }),

        password: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(6),
            ],
        }),
    });

    onSubmit(): void {
        console.log(this.loginForm.value);
    }
}
