export interface Task {
    id: string;
    title: string;
    status: 'to-do' | 'done';
    description?: string;
}
