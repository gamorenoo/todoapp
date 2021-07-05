import { Injectable } from '@angular/core';
import { TaskPr } from '../models/task';

let doingTasks: TaskPr[] = [
    { id: 1, task: "Task A 1", text: "Prepare 2019 Financial" },
    { id: 2, task: "Task A 2", text: "Prepare 2019 Marketing Plan" },
    { id: 3, task: "Task A 3", text: "Update Personnel Files" },
    { id: 4, task: "Task A 4", text: "Review Health Insurance Options Under the Affordable Care Act" }
];

let otherTasks: TaskPr[] = [
    { id: 11, task: "Task C 1", text: "Prepare 2021 Financial" },
    { id: 12, task: "Task C 2", text: "Prepare 2021 Marketing Plan" },
    { id: 13, task: "Task C 3", text: "Update Personnel Files" },
    { id: 14, task: "Task C 4", text: "Review Health Insurance Options Under the Affordable Care Act" }
];

let plannedTasks: TaskPr[] = [
    { id: 5, task: "Task B 1", text: "New Brochures" },
    { id: 6, task: "Task B 2", text: "2019 Brochure Designs" },
    { id: 7, task: "Task B 3", text: "Brochure Design Review" },
    { id: 8, task: "Task B 4", text: "Website Re-Design Plan" },
    { id: 9, task: "Task B 5", text: "Rollout of New Website and Marketing Brochures" },
    { id: 10, task: "Task B 6", text: "Create 2018 Sales Report" }
];


@Injectable({
    providedIn: 'root'
})
export class AppService {
    getDoingTasks(): TaskPr[] {
        return doingTasks;
    }
    getPlannedTasks(): TaskPr[] {
        return plannedTasks;
    }
	getOtherTasks(): TaskPr[] {
        return otherTasks;
    }
}
