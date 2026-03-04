import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PosComponent } from './components/pos/pos.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { InventoryComponent } from './components/admin/inventory/inventory.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { TicketsComponent } from './components/admin/tickets/tickets.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pos', component: PosComponent, canActivate: [AuthGuard] },
  { 
    path: 'admin', 
    component: AdminLayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'users', component: UsersComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
