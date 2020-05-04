import { Pipe, PipeTransform } from '@angular/core';
import { ticketDetails } from 'src/app/models/ticketDetails.interface';
import { tickets } from '../models/tickets.interface';
import { keyword } from './ticketlist/ticketlist.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  Tickets: tickets[];
  ticketDetails: ticketDetails[];
  t: tickets[] = [];
  flag: boolean = true;
  filterBy: string;
  transform(Tickets: tickets[], searchText: string): tickets[] {
    if (!Tickets) return [];
    for (let ticket of Tickets) {
      this.flag = true;
      for (let detail of ticket.ticketDetails) {
        if ((detail.details.status === "Done")) {
          this.flag = false;
          break;
        }
      }
      if (this.flag === true) {
        this.t.push(ticket);
        console.log(ticket);
      }
    }

    if (!searchText)
      return this.t;
    searchText = searchText.toLowerCase();
    if (keyword === 'priority') {
      return this.t.filter(it => {
        return it.ticketDetails[0].details.priority.toLowerCase().match(searchText);
      });
    }
    else if (keyword === 'project') {
      return this.t.filter(it => {
        return it.ticketDetails[0].details.projectname.toLowerCase().match(searchText);
      });
    }
    else if (keyword === 'approver') {
      return this.t.filter(it => {
        return it.ticketDetails[0].details.approver.toLowerCase().match(searchText);
      });
    } else if (keyword === 'tolocation') {
      return this.t.filter(it => {
        return it.ticketDetails[0].details.tolocation.toLowerCase().match(searchText);
      });
    }
  }
}



