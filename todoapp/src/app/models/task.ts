export class Task {
    title: string;
    description: string;
    id: string
    state: TaskState;
}

export class TaskPr {
    id: number;
    task: string;
    text: string
}

enum TaskState {
    new, inProgress, completed
}