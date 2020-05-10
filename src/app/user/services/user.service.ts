import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoronaDetails } from 'src/app/models/coronaDetails';
import { Countries } from 'src/app/models/countries';
import { ticketDetails } from 'src/app/models/ticketDetails.interface';
import { tickets } from 'src/app/models/tickets.interface';
import { orderBy } from 'lodash';

@Injectable()
export class UserService {
  private _selectedTicket: any;
  private Tickets : tickets[]=[];

  constructor(private http: HttpClient) {}

  set selectedTicket(ticket: any) {
    this._selectedTicket = ticket;
  }

  get selectedTicket() {
    return this._selectedTicket;
  }

  getTickets() {
      this.http.get(`http://localhost:8081/nagarroTravelsApi/tickets`).subscribe((tickets: tickets[]) => {
        //this.Tickets = this.sortDetails(tickets.ticketDetails);
        //console.log(this.Tickets);
        for (let ticket of tickets) {
          ticket.ticketDetails=this.sortDetails(ticket.ticketDetails);
        }
        for (let ticket of tickets) {
          if(ticket.ticketDetails[0].details.status !== "done") {
              this.Tickets.push(ticket);
          }
        }
      })
      return this.Tickets;
  }
  
  sortDetails(detail : ticketDetails[]) {
    return orderBy(detail, 'id' , 'desc');
  }
  getTicketById(id: string) {
    return this.http.get(`http://localhost:8081/nagarroTravelsApi/tickets/${id}`);
  }

  getTicketTypes(){
    return this.http.get<{id:BigInteger,name:string}[]>(`http://localhost:8081/nagarroTravelsApi/ticketType`);
  }

  getTicketTypeById(id: number|string) {
    return this.http.get<{id:number,name:string,templateId:number}>(`http://localhost:8081/nagarroTravelsApi/ticketType/${id}`);
  }

  getCoronaUpdates(country:string){
    let date = new Date();
    let to = date.toISOString().substr(0,10);
    let date1 = new Date();
    date1.setDate(date1.getDate() - 30);
    
    let from = date1.toISOString().substr(0,10);
    console.log(from);
    return this.http.get<CoronaDetails[]>(`https://api.covid19api.com/country/${country}/status/confirmed?from=${from}&to=${to}`);
  }

  getCountries(){
    return this.http.get<Countries[]>(`https://api.covid19api.com/countries`);
  }

  saveTicket(ticket){
    return this.http.post(`http://localhost:8081/nagarroTravelsApi/tickets`,ticket,{observe: 'response'});
  }

  saveTicketDetails(ticket){
    return this.http.post(`http://localhost:8081/nagarroTravelsApi/ticketDetails`,ticket,{observe: 'response'});
  }
}