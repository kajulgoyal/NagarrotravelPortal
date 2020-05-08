import { ticketDetails } from './ticketDetails.interface';
import { details } from './details.interface';

export interface NewTicket {
        id: BigInteger | number,
        type:{
          id:number,
          name:string
        }
        details:details      
}
