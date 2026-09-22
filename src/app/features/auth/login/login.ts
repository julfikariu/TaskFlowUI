import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth.service';
import { finalize } from 'rxjs/operators';

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

    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);

    // UI state
    readonly isSubmitting = signal(false);
    readonly errorMessage = signal('');

    readonly loginForm = new FormGroup({
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

        // Reset error message
        this.errorMessage.set('');

        // If the form is invalid, mark all fields as touched to trigger validation messages
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        // Set the submitting state to true to disable the form and show a loading indicator
        this.isSubmitting.set(true);

        const credentials = this.loginForm.getRawValue();

        this.authService
        .login(credentials)
        .pipe(
            finalize(() => {
                this.isSubmitting.set(false);
            })
        )
        .subscribe({
            next: (response) => {
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.isSubmitting.set(false);

                this.errorMessage.set(
                    error?.error?.message ??
                    'Unable to login. Please try again.'
                );
            }
        });
    }
}
