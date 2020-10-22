import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { Page404Component } from './page404/page404.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from './admin.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'demo',
        component: DemoComponent,
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
