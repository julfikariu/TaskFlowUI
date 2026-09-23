import { Component, inject } from '@angular/core';
import {
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
} from '@angular/router';
import { AuthService } from '@src/app/core/services/auth.service';

@Component({
    selector: 'app-authenticated-layout',
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
    ],
    templateUrl: './authenticated-layout.html',
    styleUrl: './authenticated-layout.css',
})
export class AuthenticatedLayout {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    logout(): void {
        this.authService.logout();

        this.router.navigate(['/login']);
    }
}