import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
/* import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import * as authActions from '../store/actions'; */
import { Observable, Subscription } from 'rxjs'
import { Task } from '../models/task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    taskSubscriptions: Subscription;
    constructor(
        public auth: AngularFireAuth,
        private firestore: AngularFirestore,
        private autService: AuthService,
        /* private store: Store<AppState> */
    ) { 

    }

    // Obtiene las tareas de un usuario
    taskListener(uid: string) {
        // const userSession: User = JSON.parse(atob(localStorage.getItem("sessionUser")));
        // console.log(atob(localStorage.getItem("sessionUser")));
        return this.firestore.collection(`${ uid }/tasks/items`)
        .snapshotChanges()
        .pipe(
            map( snapShoot => snapShoot.map( doc => ({
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data() as any
                    })
                )
            )
        );
        /* let tasklist: Task[] = [];
        let task = new Task();
        task.description = firestoreTask.description;
        task.state = firestoreTask.state;
        task.title = firestoreTask.title;
        task.userId = firestoreTask.userId;
        tasklist.push(task);
        console.log(tasklist); */
    }

    createTask(task: Task, uid: string){
        return this.firestore.doc(`${ uid }/tasks`)
            .collection('items')
            .add({...task});
            /* .then((ref) => console.log('exitoso!', ref))
            .catch(err => console.warn(err)); */
    }

    updateTask(task: Task, uid: string) {
        return this.firestore.doc(`${ uid }/tasks/items/${ task.id }`).set({
            state : task.state,
            title : task.title,
            description : task.description
        });
    }
}
