import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
/* import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import * as authActions from '../store/actions'; */
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    userSubscriptions: Subscription;
    private _user: User;

    get user() {
        return this._user;
    }

    constructor(
        public auth: AngularFireAuth,
        private firestore: AngularFirestore,
        /* private store: Store<AppState> */
    ) { }

    // Realiza la creacion de un usuario en FireBase
    createUser(user: User) {
        return this.auth.createUserWithEmailAndPassword(user.username, user.password)
            .then( fbUser  => {
                user.uid = fbUser.user.uid;
                return this.firestore.doc(`${ user.uid }/user`).set({...user})
            });
    }

    // Autenticacion con FireBase (Email y Password)
    login(username: string, password: string) {
        return this.auth.signInWithEmailAndPassword(username, password);
    }

    // Cerrar sesión
    logout() {
        localStorage.removeItem('sessionUser');
        return this.auth.signOut();
    }

    isAuth() {
        return this.auth.authState.pipe(
            map(fbUser => fbUser != null)
        );
    }
}
