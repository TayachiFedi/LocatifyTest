import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path:'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module')
      .then(m => m.AddUserModule)
  },
  {
    path:'users',
    loadChildren: () => import('./pages/user/user.module')
      .then(m => m.UserModule)
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}