import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTicketDetailsComponent } from './adminticketdetails/adminticketdetails.component';
import { TicketlistComponent } from './ticketlist/ticketlist.component';
import { NavbarModule } from '../user/navbar/navbar.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({ 
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavbarModule,
    NgxPaginationModule
  ],
  exports:[
    AdminComponent,
    TicketlistComponent,
    AdminTicketDetailsComponent
 
  ],
  declarations: [
    AdminComponent,
    TicketlistComponent,
    AdminTicketDetailsComponent     
  ],
  providers:[
  ]
})
export class AdminModule { }
