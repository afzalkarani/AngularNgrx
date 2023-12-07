import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { PostDetailsComponent } from './posts/post-details/post-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'counter',
    loadChildren: () =>
    import('./counter/counter.modules').then((m) => m.CounterModule)
  },

  {
    path: 'posts',
    loadChildren: () =>
    import ('./posts/posts.module').then((m)=> m.PostsModule),
    canActivate:[AuthGuard]
  },
  {
    path:  'posts/details/:id', component:PostDetailsComponent, canActivate:[AuthGuard]
  },
  {
    path:'auth',
    loadChildren: () =>
    import('./auth/auth.module').then((m)=> m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
