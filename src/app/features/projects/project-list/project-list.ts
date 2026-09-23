import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { DatePipe } from '@angular/common';
import { ProjectForm } from '../project-form/project-form';
import { ProjectDeleteDialog } from '../project-delete-dialog/project-delete-dialog';

@Component({
    selector: 'app-project-list',
    imports: [
        DatePipe,
        ProjectForm,
        ProjectDeleteDialog,
    ],
    templateUrl: './project-list.html',
    styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {

    private readonly projectService = inject(ProjectService);

    readonly projects = signal<Project[]>([]);
    readonly isLoading = signal(false);
    readonly errorMessage = signal('');
    readonly showCreateForm = signal(false);

    readonly selectedProject = signal<Project | null>(null);
    readonly showDeleteDialog = signal(false);

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

    openCreateForm(): void {
        this.selectedProject.set(null);
        this.showCreateForm.set(true);
    }

    closeCreateForm(): void {
        this.showCreateForm.set(false);
        this.selectedProject.set(null);
    }

    onProjectCreated(): void {
        this.showCreateForm.set(false);

        this.loadProjects();
    }

    openEditForm(project: Project): void {
        this.selectedProject.set(project);
        this.showCreateForm.set(true);
    }
    onProjectSaved(): void {
        this.closeProjectForm();
        this.loadProjects();
    }

    closeProjectForm(): void {
        this.showCreateForm.set(false);
        this.selectedProject.set(null);
    }

    openDeleteDialog(project: Project): void {
        this.selectedProject.set(project);
        this.showDeleteDialog.set(true);
    }

    closeDeleteDialog(): void {
        this.showDeleteDialog.set(false);
        this.selectedProject.set(null);
    }
    onProjectDeleted(): void {
        this.closeDeleteDialog();

        this.loadProjects();
    }
}