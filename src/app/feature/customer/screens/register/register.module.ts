import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { ListAddressComponent } from "src/app/shared/components/list-address/list-address.component";
import { TableEntitiesComponent } from "src/app/shared/components/tables/table-entities/table-entities.component";
import { formAddressComponent } from "../../components/forms/form-address/form-address.component";
import { FormCustomerComponent } from "../../components/forms/form-customer/form-customer.component";
import { RegisterComponent } from "./register.component";



@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        FormCustomerComponent,
        formAddressComponent,
        ListAddressComponent,
        TableEntitiesComponent
    ],
    exports: [
        RegisterComponent
    ]
})
export class RegisterModule {  }