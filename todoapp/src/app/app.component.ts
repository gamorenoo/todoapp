import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todoapp';
  constructor( private authService: AuthService,
              private router: Router ){
    
  }

  ngOnInit(): void {
    // this.authService.initAuthListener();
  }

  logout() {
    this.authService.logout()
    .then( () => this.router.navigate(['/login']) );
  }
}
