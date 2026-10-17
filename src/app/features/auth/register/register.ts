import { Component, signal, inject, computed } from '@angular/core';
import {
    FormControl,
    FormGroup, ReactiveFormsModule, Validators,
    AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth.service';
import { finalize } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideEyeOff, LucideEye } from '@lucide/angular';

@Component({
    selector: 'app-register',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        LucideEyeOff,
        LucideEye
    ],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    showPassword = false;
    showConfirmPassword = false;
    readonly isSubmitting = signal(false);
    readonly errorMessage = signal('');

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
    toggleConfirmPasswordVisibility(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirm_password');

        // if confirm password is empty, we don't want to show the error yet
        if (!confirmPassword?.value) {
            return null;
        }

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
            return { passwordMismatch: true };
        }

        // if same, then only remove passwordMismatch error
        if (confirmPassword && confirmPassword.hasError('passwordMismatch')) {
            const { passwordMismatch, ...remainingErrors } = confirmPassword.errors || {};
            confirmPassword.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
        }

        return null;
    };

    passwordStrengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const value = control.value || '';
        if (!value) return null;

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumeric = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const isValidLength = value.length >= 8;

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isValidLength;

        return !passwordValid
            ? {
                passwordStrength: {
                    hasUpperCase,
                    hasLowerCase,
                    hasNumeric,
                    hasSpecial,
                    isValidLength,
                },
            }
            : null;
    };

    readonly registrationForm = new FormGroup({
        fullName: new FormControl('', {
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
                Validators.required,
                this.passwordStrengthValidator
            ]
        }),

        confirm_password: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
            ]
        })
    }, { validators: this.passwordMatchValidator });

    // 1. Password input toSignal to track its value changes
    readonly passwordValue = toSignal(
        this.registrationForm.controls.password.valueChanges,
        { initialValue: '' }
    );

    // 2. Each condition is computed based on the password value
    readonly hasMinLength = computed(() => this.passwordValue().length >= 8);
    readonly hasUpper = computed(() => /[A-Z]/.test(this.passwordValue()));
    readonly hasLower = computed(() => /[a-z]/.test(this.passwordValue()));
    readonly hasNumber = computed(() => /[0-9]/.test(this.passwordValue()));
    readonly hasSpecial = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(this.passwordValue()));

    // 3. All conditions met, return true
    readonly isPasswordStrong = computed(() =>
        this.hasMinLength() &&
        this.hasUpper() &&
        this.hasLower() &&
        this.hasNumber() &&
        this.hasSpecial()
    );

    onSubmit(): void {
        this.errorMessage.set('');
        if (this.registrationForm.invalid) {
            this.registrationForm.markAllAsTouched();
            return;
        }

        this.isSubmitting.set(true);
        const { confirm_password, ...credentials } = this.registrationForm.getRawValue();

        this.authService
            .register(credentials)
            .pipe(
                finalize(() =>
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
