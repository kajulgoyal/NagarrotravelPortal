import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';
import { tickets } from 'src/app/models/tickets.interface';
import { ticketDetails } from 'src/app/models/ticketDetails.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminticketdetails',
  templateUrl: 'adminticketdetails.component.html',
  styleUrls: ['adminticketdetails.component.css']
})
export class AdminTicketDetailsComponent {
  Ticket: tickets;
  ticketDetails: ticketDetails[];
  id: string;
  regForm: FormGroup;
  commentsControl: FormControl;
  attachmentControl: FormControl;
  statusControl : FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userservice: UserService
  ) { }

  ngOnInit() {
    
    this.commentsControl = new FormControl('');
    this.attachmentControl = new FormControl('');
    this.statusControl = new FormControl('',[Validators.required]);

    this.regForm = new FormGroup({
      comments: this.commentsControl,
      attachment: this.attachmentControl,
      status: this.statusControl
    })
    this.route.params.subscribe(params => {
      this.id = JSON.parse(params['id']);
    });
    this.userservice.getTicketById(this.id)
      .subscribe((ticket: tickets) => {
        this.Ticket = ticket;
        this.ticketDetails = ticket.ticketDetails;
        console.log(this.Ticket);
      })
  }
  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

  onFormSubmit() {
    if (this.regForm.valid && this.regForm.get('status').valid) {
      alert('successfully added');
    } else {
      alert('server error occured');
    }
  }
  backToHome() {
    this.router.navigateByUrl('/ticketlist')
  }
}