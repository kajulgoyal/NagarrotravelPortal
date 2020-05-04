import { ticketDetails } from './ticketDetails.interface';
import { type } from './type.interface';
import { user } from './user.interface';

export interface tickets{
    id:BigInteger;
    type:type;
    created_on:string;
    ticketDetails:ticketDetails[];
    user?:user;
}