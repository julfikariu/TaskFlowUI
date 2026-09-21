import { Component, ElementRef, signal, HostListener, inject, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
    private readonly router = inject(Router);
    private readonly elementRef = inject(ElementRef);
    private readonly authService = inject(AuthService);

    readonly dropdownRef = viewChild<ElementRef>('dropdownRef');

    // Dropdown state signal
    readonly isDropdownOpen = signal(false);

    toggleDropdown(): void {
        this.isDropdownOpen.update((state) => !state);
    }

    closeDropdown(): void {
        this.isDropdownOpen.set(false);
    }

    onLogout(): void {
        alert('Logout clicked! Implement logout functionality here.');

        this.authService.logout();
        this.router.navigate(['/login']);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const container = this.dropdownRef()?.nativeElement;

        // if click outside (#dropdownRef), then close the dropdown
        if (this.isDropdownOpen() && container && !container.contains(target)) {
            this.closeDropdown();
        }
    }
}
