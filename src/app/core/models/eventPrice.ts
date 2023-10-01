import { EventBottleTicketPrice } from "./eventBottleTicketPrice";

export interface EventPrice {
    standard_ticket_price?: number;
    consumption_ticket_price?: number;
    bottle_ticket_price?: EventBottleTicketPrice;
    bottle_VIP_ticket_price?: EventBottleTicketPrice;
}