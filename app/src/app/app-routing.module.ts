import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from './guards/authenticated-user.guard';

const routes: Routes = [
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  }, {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'topics',
    loadChildren: () => import('./pages/topic-settings/topic-settings.module').then( m => m.TopicSettingsPageModule)
  },
  {
    path: 'main',
    canActivate: [AuthenticatedUserGuard],
    loadChildren: () => import('./pages/multi/multi.module').then( m => m.MultiPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
