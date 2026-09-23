export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    taskCount: number;
}

export interface CreateProjectRequest {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface UpdateProjectRequest {
    name: string;
    description: string;
    startDate: string;
    endDate: string | null;
}
