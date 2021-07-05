import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DxListModule, DxFormModule } from 'devextreme-angular';
import { Task, TaskPr } from 'src/app/models/task';
import { AppService } from 'src/app/services/app.service';
import { AddTaskModule } from 'src/app/components/modals/add-task/add-task.component'
import { TaskService } from 'src/app/services/task.service';
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newTasks: Task[];
  inProcessTasks: Task[];
	completedTasks: Task[];
  showPopup: boolean = false;
  tasklist: Task[] = [];
  taskSubscriptions: Subscription;
  userSession: User;
  userName: string;
  constructor(
    private service: AppService,
    private taskService: TaskService,
    private authService: AuthService ) {
    /* this.doingTasks = service.getDoingTasks();
    this.plannedTasks = service.getPlannedTasks();
    this.otherTasks = service.getOtherTasks(); */
    this.onAdd = this.onAdd.bind(this);
   }

  ngOnInit(): void {
    // this.authService. initAuthListener();
    this.userSession  = JSON.parse(atob(localStorage.getItem("sessionUser")));
    this.userName = this.userSession.firstName + ' ' + this.userSession.lastName; 
    this.taskSubscriptions = this.taskService.taskListener(this.userSession.uid)
    .subscribe( tasks => {
      this.tasklist = tasks;
      this.newTasks =       this.tasklist.filter( t => t.state == 0);
      this.inProcessTasks = this.tasklist.filter( t => t.state == 1);
      this.completedTasks = this.tasklist.filter( t => t.state == 2);
    });

    // location.reload();
  }

  ngOnDestroy(): void {
    this.taskSubscriptions.unsubscribe();
  }

  onDragStart(e) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onAdd(e) {
    e.toData.splice(e.toIndex, 0, e.itemData);
    this.getUpdateTask(e.itemData.id);
  }

  onRemove(e) {
    e.fromData.splice(e.fromIndex, 1);
  }

  addTask() {
    this.showPopup = true;
  }

  public getUpdateTask(taskId: string) {
    // Buscar el estado en que quedó la tarea
    setTimeout(() => {
      let t: Task;
      t = this.newTasks.find( t => t.id === taskId);
      if(t) {
        t.state = 0;
        this.updateTask(t);
      }

      t = this.inProcessTasks.find( t => t.id === taskId);
      if(t) {
        t.state = 1;
        this.updateTask(t);
      }

      t = this.completedTasks.find( t => t.id === taskId);
      if(t) {
        t.state = 2;
        this.updateTask(t);
      }
    }, 500);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task, this.userSession.uid)
      .then( res => console.log(res))
      .catch( err => console.error(err));
  }

  closePopup(result: boolean) {
    this.showPopup = false;
  }

}


const routes: Routes = [
  { path: '', component: DashboardComponent },
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DxListModule,
    DxFormModule,
    AddTaskModule
  ]
})

export class DashboardModule {}
