import {
    Component,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { finalize } from 'rxjs';

import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
    selector: 'app-project-delete-dialog',
    imports: [],
    templateUrl: './project-delete-dialog.html',
    styleUrl: './project-delete-dialog.css',
})
export class ProjectDeleteDialog {

    private readonly projectService = inject(ProjectService);

    readonly project = input.required<Project>();

    readonly cancelled = output<void>();
    readonly deleted = output<void>();

    readonly isDeleting = signal(false);
    readonly errorMessage = signal('');

    confirmDelete(): void {
        this.errorMessage.set('');
        this.isDeleting.set(true);

        this.projectService
            .deleteProject(this.project().id)
            .pipe(
                finalize(() => {
                    this.isDeleting.set(false);
                })
            )
            .subscribe({
                next: () => {
                    this.deleted.emit();
                },

                error: (error) => {
                    console.error(
                        'Failed to delete project:',
                        error
                    );

                    this.errorMessage.set(
                        error?.error?.message ??
                        'Unable to delete project. Please try again.'
                    );
                },
            });
    }

    cancel(): void {
        if (this.isDeleting()) {
            return;
        }

        this.cancelled.emit();
    }
}