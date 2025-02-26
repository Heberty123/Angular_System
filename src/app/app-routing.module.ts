import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductComponent } from './feature/product/product.component';
import { OrderComponent } from './feature/order/order.component';
import { HomeComponent } from './feature/home/home.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { InventoryControlComponent } from './feature/inventory-control/inventory-control.component';
import { LoginFormComponent } from './feature/login/login-form/login-form.component';
import { AdminComponent } from './feature/admin/admin.component';
import { AuthorizationGuard } from './services/authorization-guard';

export const routes: Routes = [
    { path: 'login', component: LoginFormComponent, },
    { path: 'home', component: HomeComponent, },
    { path: 'customer', loadChildren: () => import('./feature/customer/customer.module').then(c => c.CustomerModule) },
    { path: 'product', component: ProductComponent },         
    { path: 'order', component: OrderComponent },
    { path: 'inventory-control', component: InventoryControlComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthorizationGuard], data: { roles: ['ADMIN'] } },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
    
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(
        routes,
        {
            paramsInheritanceStrategy: 'always'
        }
    )],
    exports: [RouterModule],
})
export class AppRoutingModule {}