import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    const { username, password } = this.form.value;

    try {
      this.authService.login(username, password)
      .then(credentials => {
        this.firestore.doc(`${ credentials.user.uid }/user`).valueChanges()
          .subscribe( (firestoreUser: any) => {
              const user = new User();
              user.firstName = firestoreUser.firstName;
              user.lastName = firestoreUser.lastName;
              user.username = firestoreUser.username;
              user.uid = firestoreUser.uid;
              localStorage.setItem('sessionUser',  btoa(JSON.stringify(user)));
              this.router.navigate(['../dashboard']);
              /*  this.store.dispatch( authActions.setUser({user})) */
          });
      });        
    } catch (error) {
      console.error(error);  
    }

    this.loading = true;
}

}

const routes: Routes = [
  { path: '', component: AuthComponent },
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ]
})

export class AuthModule {}
