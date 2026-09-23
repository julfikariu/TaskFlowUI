import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-project-list',
    imports: [
        DatePipe
    ],
    templateUrl: './project-list.html',
    styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {

    private readonly projectService = inject(ProjectService);

    readonly projects = signal<Project[]>([]);
    readonly isLoading = signal(false);
    readonly errorMessage = signal('');

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects(): void {
        this.isLoading.set(true);
        this.errorMessage.set('');

        this.projectService
            .getProjects()
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe({
                next: (projects) => {
                    this.projects.set(projects);
                },

                error: (error) => {
                    console.error(
                        'Failed to load projects:',
                        error
                    );

                    this.errorMessage.set(
                        error?.error?.message ??
                        'Unable to load projects.'
                    );
                },
            });
    }
}