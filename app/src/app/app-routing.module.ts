import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from './guards/authenticated-user.guard';

const routes: Routes = [
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    canActivate: [AuthenticatedUserGuard]
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
    path: 'call',
    loadChildren: () => import('./pages/call/call.module').then( m => m.CallPageModule)
  },
  {
    path: 'lobby',
    loadChildren: () => import('./pages/lobby/lobby.module').then( m => m.LobbyPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
