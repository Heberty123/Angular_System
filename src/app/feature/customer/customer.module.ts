import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomerRoutingModule } from "./customer.routing.module";
import { MaterialBasicModule } from "src/app/shared/modules/material-basic.module";
import { RegisterModule } from "./screens/register/register.module";
import { ListModule } from "./screens/list/list.module";
import { CustomerComponent } from "./customer.component";
import { DetailsModule } from "./screens/details/details.module";
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    declarations: [ 
        CustomerComponent,
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        MaterialBasicModule,
        RegisterModule,
        ListModule,
        DetailsModule,
        MatTabsModule
    ],
    exports: [
        CustomerComponent,
    ]
})
export class CustomerModule {}