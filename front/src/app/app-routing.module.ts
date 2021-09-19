import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {
    useHash: true,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
