import { Component, inject, OnInit, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

    readonly tasks = signal<Task[]>([]);
    readonly isLoading = signal(false);
    readonly errorMessage = signal('');

    readonly taskService = inject(TaskService);

    ngOnInit(): void {
        this.loadTasks();

    }

    loadTasks(): void {
        this.isLoading.set(true);
        this.errorMessage.set('');

        this.taskService.getTasks()
        .subscribe({
            next: (tasks) => {
                this.tasks.set(tasks);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Failed to load tasks:', error);
                this.errorMessage.set(
                    error?.error?.message ??
                    'Unable to load tasks. Please try again.'
                );
                this.isLoading.set(false);
            }
        });
        
    }

    openCreateForm(): void {
        alert('Open create task form');
    }

}
