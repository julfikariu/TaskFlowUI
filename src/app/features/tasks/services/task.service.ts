import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private readonly http = inject(HttpClient);

    private readonly apiUrl = '/api/task';

    getTasks(): Observable<any[]> {
        return this.http.get<any[]>(
            this.apiUrl
        );
    }
}