import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('../app/components/auth/auth.component').then(m => m.AuthModule) },
  { path: 'register', loadChildren: () => import('../app/components/register/register.component').then(m => m.RegisterModule) },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('../app/components/dashboard/dashboard.component').then(m => m.DashboardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
