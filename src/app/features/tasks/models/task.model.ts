export interface Task {
    id: number;
    title: string;
    description: string;
    projectId: number;
    projectName: string;
    isCompleted: boolean;
}