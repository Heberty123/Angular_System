import { NgModule } from "@angular/core";
import { ListComponent } from "./screens/list/list.component";
import { RegisterComponent } from "./screens/register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";

const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children: [
          { path: 'new', component: RegisterComponent, data: { animationState: 'New' }},
          { path: 'list', component: ListComponent, data: { animationState: 'List' }},
          { path: ':id', loadChildren: () => import('./screens/details/details.module').then(c => c.DetailsModule) },
          { path: '', redirectTo: 'new', pathMatch: 'full' }  // Corrigido para 'new'
        ]
      }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerRoutingModule {}