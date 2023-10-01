import { Event } from "../models/event";
export const MAX_NUM_SLIDE = 5;
export const eventList: Array<Event> = [
    {
        t_title: "Discoteca tropicale",
        t_image_link: "https://discoteche-riccione-rimini.it/wp-content/uploads/2023/08/byblos-riccione-20-ago-2023.webp",
        t_address: "Via Roma 19",
        t_cap: "84084",
        t_city: "Fisciano",
        t_state: "Italy",
        t_date: new Date("2024-04-15"),
        t_sell_end: new Date("2024-04-14"),
        t_price: {
            standard_ticket_price: 10,
            consumption_ticket_price: 20,
            bottle_ticket_price: {
                ticket_price: 300,
                table_min_num_person: 6,
                table_max_num_person: 10
            }
        },
        b_active: true,
        b_external_event: false,
        n_vendite: 1000
    },
    {
        t_title: "Ladies Night",
        t_image_link: "https://img.freepik.com/free-vector/gradient-girls-night-neon-poster-template_52683-86711.jpg?w=740&t=st=1696171997~exp=1696172597~hmac=ac486126a384bafb1ab62294d5643e6bea2b06338c7633dce9fd352d051c2027",
        t_address: "Viale Antonio Bandiera",
        t_cap: "84131",
        t_city: "Salerno",
        t_state: "Italy",
        t_date: new Date("2023-12-1"),
        t_sell_end: new Date("2023-11-30"),
        t_price: {
            standard_ticket_price: 15,
            consumption_ticket_price: 30,
            bottle_ticket_price: {
                ticket_price: 450,
                table_min_num_person: 10,
                table_max_num_person: 15
            },
            bottle_VIP_ticket_price: {
                ticket_price: 1500,
                table_min_num_person: 10,
                table_max_num_person: 25,
                t_note: "Tavolo DJ"
            },
        },
        b_active: true,
        b_external_event: false,
        n_vendite: 13000
    },
    {
        t_title: "Carnival Party",
        t_image_link: "https://d2fa23zcjd5klo.cloudfront.net/square/event/057bf979-fc07-42ef-9644-99eb7d0ffd84.jpg",
        t_address: "SS7 12",
        t_cap: "81100",
        t_city: "Caserta",
        t_state: "Italy",
        t_date: new Date("2024-02-23"),
        t_sell_end: new Date("2024-02-22"),
        t_price: {
            consumption_ticket_price: 40,
            bottle_ticket_price: {
                ticket_price: 900,
                table_min_num_person: 8,
                table_max_num_person: 15
            },
        },
        b_active: true,
        b_external_event: false,
        n_vendite: 4096
    },
    {
        t_title: "Wine Music",
        t_image_link: "https://www.toteadv.it/wp-content/uploads/2020/08/locandina_eventi_2017_antica_cantina_veneta.jpg",
        t_address: "Via Giordano Bruno 24",
        t_cap: "35124",
        t_city: "Padova",
        t_state: "Italy",
        t_date: new Date("2024-09-29"),
        t_sell_end: new Date("2024-09-28"),
        b_active: true,
        b_external_event: true,
        t_external_link: "",
        n_click: 6499
    },
    {
        t_title: "Memorie di natale",
        t_image_link: "http://www.oasisantantonio.it/eventi/locandina_natale2012.jpg",
        t_address: "Via dei cipressi",
        t_cap: "98122",
        t_city: "Messina",
        t_state: "Italy",
        t_date: new Date("2012-12-25"),
        t_sell_end: new Date("2012-12-24"),
        t_price: {
            standard_ticket_price: 10,
        },
        b_active: true,
        b_external_event: false,
        n_vendite: 13999
    },
    {
        t_title: "Vegvisir Dark Ambient Festival",
        t_image_link: "https://www.goth.it/images/events/d/55317_20220226centrale66_front_379x464x71fa.jpg",
        t_address: "Via Nicolo dell'abate 66",
        t_cap: "41121",
        t_city: "Modena",
        t_state: "Italy",
        t_date: new Date("2023-02-26"),
        t_sell_end: new Date("2023-02-25"),
        t_price: {
            standard_ticket_price: 20,
            consumption_ticket_price: 40,
        },
        b_active: true,
        b_external_event: false,
        n_vendite: 34000 //Modificare si devono registrare le vendite per tipo t_price es. 30 standard ticker, 50 consumption ticket etc.
    }
]

