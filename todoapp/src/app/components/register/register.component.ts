import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // acceso a los campos del formulario
  get f() { return this.form.controls; }

  onSubmit() {
    let user: User = new User();
    this.submitted = true;

      if (this.form.invalid) {
          return;
      }

      user = this.form.value;

      try {
        this.authService.createUser(user)
        .then(credentials => {
          console.log(credentials);
          this.router.navigate(['/dashboard'])
        });        
      } catch (error) {
        console.error(error);  
      }

      this.loading = true;
  }
}

const routes: Routes = [
  { path: '', component: RegisterComponent },
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ]
})

export class RegisterModule {}
