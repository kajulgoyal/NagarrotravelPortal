import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { tickets } from 'src/app/models/tickets.interface';
import { type } from 'src/app/models/type.interface';
import { details } from 'src/app/models/details.interface';
import { NewTicket } from 'src/app/models/newTicket';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ticketconfirm',
  templateUrl: 'ticketconfirm.component.html',
  styleUrls: ['ticketconfirm.component.css']
})
export class TicketconfirmComponent implements OnInit {
  constructor(
    private router: Router,
    private userService : UserService,
    private routeActivate : ActivatedRoute
  ) { }

  details:details;
  ticket:NewTicket;


  ngOnInit() {

    this.routeActivate.params.subscribe(params => {
      this.ticket= JSON.parse(params['details']);
    });
    console.log(this.ticket);
    this.details=this.ticket.details;
    this.userService.getTicketTypeById(this.ticket.type.id).subscribe((response)=>{
      this.ticket.type.name = response.name;
    })
  }
 
  onEdit(){
    
    this.userService.selectedTicket = this.ticket;
    this.router.navigateByUrl('/editTicket')
  }
  print(){
  
    const printContent = document.getElementById("confirmCard");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write('<style>#confirmCard{text:align:center}</style>');
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
