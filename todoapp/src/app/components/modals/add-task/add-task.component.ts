import { Component, EventEmitter, Input, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { ScreenService } from 'src/app/services/screen.service';
import { v4 as uuid } from 'uuid';
import { DxTemplateModule, DxFormModule, DxPopupModule, DxScrollViewModule, DxFormComponent } from 'devextreme-angular';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() showPopup = false;
  @Output() closePopup = new EventEmitter<boolean>(true);
  @ViewChild('formTask') form: DxFormComponent;
  popupFullScreen = false;
  popUpId = uuid();
  formId = uuid();
  currentTask: Task = new Task();
  toolbarPopupsCofig = {
    toolbar: 'bottom', location: 'center', widget: 'dxButton', visible: true
  };
  toolbarItemsPopup = [
    {
      ...this.toolbarPopupsCofig,
      options: {
        //elementAttr: { class: 'primary-button-color' },
        type: "default",
        text: 'Crear',
        onClick: () => {
          if (!this.form.instance.validate().isValid) {
            return;
          }
          const userSession: User  = JSON.parse(atob(localStorage.getItem("sessionUser")));
          this.taskService.createTask(this.currentTask, userSession.uid).then( d => {
            this.showPopup = false;
            this.closePopup.emit(true);
          })
          .catch( err => console.error(err.message));
        }
      }
    },
    {
      ...this.toolbarPopupsCofig,
      options: {
        // elementAttr: { class: 'primary-button-color' },
        type: "normal",
        text: 'Cancelar',
        onClick: () => {
          this.showPopup = false;
          this.closePopup.emit(false);
        }
      }
    }
  ];

  constructor(private screenService: ScreenService,
              private taskService: TaskService ) { }

  ngOnInit(): void {
    this.popupFullScreen = !this.screenService.sizes['screen-large'] || window.innerHeight < 800;
    this.currentTask.state = 0;
  }

  popupHeight = () => {
    return Math.round(window.innerHeight / 1.5);
  }

}

@NgModule({
  declarations: [AddTaskComponent],
  exports: [AddTaskComponent],
  imports: [CommonModule, DxTemplateModule, DxFormModule, DxPopupModule,  DxScrollViewModule]
})
export class AddTaskModule { }