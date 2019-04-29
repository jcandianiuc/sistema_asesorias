import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'members', canActivate: [AuthGuardService], loadChildren: './members/member-routing.module#MemberRoutingModule' },
  // { path: 'modal', loadChildren: './components/modal/modal.module#ModalPageModule' },
  // { path: 'popover', loadChildren: './components/popover/popover.module#PopoverPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
