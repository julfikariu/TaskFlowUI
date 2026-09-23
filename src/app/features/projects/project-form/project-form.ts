import { Component, inject, input, output, signal, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';


@Component({
    selector: 'app-project-form',
    imports: [
        ReactiveFormsModule,
    ],
    templateUrl: './project-form.html',
    styleUrl: './project-form.css',
})
export class ProjectForm implements OnInit {

    private readonly projectService = inject(ProjectService);

    readonly projectSaved = output<void>();
    readonly closed = output<void>();

    readonly isSubmitting = signal(false);
    readonly errorMessage = signal('');

    readonly isEditMode = signal(false);
    readonly project = input<Project | null>();

    readonly projectForm = new FormGroup({
        name: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.maxLength(100),
            ],
        }),

        description: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.maxLength(1000),
            ],
        }),

        startDate: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
            ],
        }),

        endDate: new FormControl<string | null>(null),
    });

    ngOnInit(): void {
        const project = this.project();

        if (!project) {
            return;
        }

        this.isEditMode.set(true);

        this.projectForm.patchValue({
            name: project.name,
            description: project.description,
            startDate: project.startDate.substring(0, 10),
            endDate: project.endDate
                ? project.endDate.substring(0, 10)
                : null,
        });
    }

    onSubmit(): void {

        this.errorMessage.set('');

        if (this.projectForm.invalid) {
            this.projectForm.markAllAsTouched();
            return;
        }

        this.isSubmitting.set(true);

        const value = this.projectForm.getRawValue();

        const project = this.project();

        const request = project
            ? this.projectService.updateProject(project.id, {
                name: value.name,
                description: value.description,
                startDate: value.startDate,
                endDate: value.endDate || null,
            })
            : this.projectService.createProject({
                name: value.name,
                description: value.description,
                startDate: value.startDate,
                endDate: value.endDate || '',
            });


        request
            .pipe(
                finalize(() => {
                    this.isSubmitting.set(false);
                })
            )
            .subscribe({
                next: () => {

                    this.projectForm.reset();

                    this.projectSaved.emit();
                },

                error: (error) => {

                    console.error(
                        'Failed to create project:',
                        error
                    );

                    this.errorMessage.set(
                        error?.error?.message ??
                        'Unable to create project.'
                    );
                },
            });
    }

    close(): void {
        this.closed.emit();
    }
}