import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    CreateProjectRequest,
    Project,
    UpdateProjectRequest,
} from '../models/project.model';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = '/api/projects';

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(
            this.apiUrl
        );
    }

    getProject(id: number): Observable<Project> {
        return this.http.get<Project>(
            `${this.apiUrl}/${id}`
        );
    }

    createProject(
        data: CreateProjectRequest
    ): Observable<Project> {
        return this.http.post<Project>(
            this.apiUrl,
            data
        );
    }

    updateProject(
        id: number,
        data: UpdateProjectRequest
    ): Observable<Project> {
        return this.http.put<Project>(
            `${this.apiUrl}/${id}`,
            data
        );
    }

    deleteProject(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${id}`
        );
    }
}