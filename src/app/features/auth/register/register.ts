import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  showPassword = false;
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  readonly registrationForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    password_confirm: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    })
  });

  onSubmit(): void {
    this.errorMessage.set('');
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const credentials = this.registrationForm.getRawValue();

    this.authService
    .register(credentials)
    .pipe(
      finalize(()=>
        this.isSubmitting.set(false)
      )
    )
    .subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage.set(
          error?.error?.message 
          ?? 'Registration failed. Please try again.'
        )
      }
    });

  }
}
