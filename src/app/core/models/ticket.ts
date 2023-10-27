export interface Ticket {
    t_hash: string;
    t_price: number;
    t_payment_info: string; //Sostituire ad esempio con informazioni stripe/Paypal, cioè in base al metodo di pagamento che permetti
}