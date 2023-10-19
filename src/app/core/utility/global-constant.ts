import { EventColor } from "calendar-utils";
import { Event } from "../models/event";
export const MAX_NUM_SLIDE = 5;
export enum EVENT_TYPE {
    PARTY,
    CINEMA,
    STADIO
}
export enum EVENT_TICKET_TYPE {
    STANDARD_TICKET_PRICE,
    CONSUPTION_TICKET_PRICE,
    BOTTLE_TICKET_PRICE,
    BOTTLE_VIP_TICKET_PRICE
}

export const eventList: Array<Event> = [
    {
        n_id: 1,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_location: {
            n_id: 1,
            t_address: "Via Roma 19",
            t_cap: "84084",
            t_city: "Fisciano",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Fisciano"
        },
        t_event_dates: [
            new Date("2024-04-15"),
            new Date("2024-04-15")
        ],
        t_price: [
            {
                n_id: 1,
                ticket_price: 10,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 2,
                ticket_price: 20,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 3,
                ticket_price: 300,
                table_min_num_person: 6,
                table_max_num_person: 10,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            }

        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 1000
    },
    {
        n_id: 2,
        n_group_id: 2,
        t_title: "Ladies Night",
        t_image_link: "https://img.freepik.com/free-vector/gradient-girls-night-neon-poster-template_52683-86711.jpg?w=740&t=st=1696171997~exp=1696172597~hmac=ac486126a384bafb1ab62294d5643e6bea2b06338c7633dce9fd352d051c2027",
        t_location: {
            n_id: 2,
            t_address: "Viale Antonio Bandiera 14",
            t_cap: "84131",
            t_city: "Salerno",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Bandiera"
        },
        t_event_dates: [
            new Date("2023-11-30"),
            new Date("2023-11-30")
        ],
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 4,
                ticket_price: 15,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 5,
                ticket_price: 30,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 6,
                ticket_price: 450,
                table_min_num_person: 10,
                table_max_num_person: 15,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            },
            {
                n_id: 7,
                ticket_price: 1500,
                table_min_num_person: 10,
                table_max_num_person: 25,
                t_note: "Tavolo DJ",
                t_type: EVENT_TICKET_TYPE.BOTTLE_VIP_TICKET_PRICE
            },
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 13000
    },
    {
        n_id: 3,
        n_group_id: 3,
        t_title: "Carnival Party",
        t_image_link: "https://d2fa23zcjd5klo.cloudfront.net/square/event/057bf979-fc07-42ef-9644-99eb7d0ffd84.jpg",
        t_location: {
            n_id: 3,
            t_address: "SS7 12",
            t_cap: "81100",
            t_city: "Caserta",
            t_province: "CE",
            t_state: "Italy",
            t_location_name: "La Suerte"
        },
        t_event_dates: [
            new Date("2024-02-23"),
            new Date("2024-02-23"),
        ],
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 8,
                ticket_price: 40,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 9,
                ticket_price: 900,
                table_min_num_person: 8,
                table_max_num_person: 15,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            },
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 4096
    },
    {
        n_id: 4,
        t_title: "Wine Music",
        t_image_link: "https://www.toteadv.it/wp-content/uploads/2020/08/locandina_eventi_2017_antica_cantina_veneta.jpg",
        t_location: {
            n_id: 4,
            t_address: "Via Giordano Bruno 24",
            t_cap: "35124",
            t_city: "Padova",
            t_province: "PD",
            t_state: "Italy",
            t_location_name: "I padovani pazzi"
        },
        t_event_dates: [
            new Date("2024-09-20"),
            new Date("2024-09-29"),
        ],
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: true,
        t_external_link: "https://www.google.com",
        n_click: 6499
    },
    {
        n_id: 5,
        n_group_id: 4,
        t_title: "Memorie di natale",
        t_image_link: "http://www.oasisantantonio.it/eventi/locandina_natale2012.jpg",
        t_location: {
            n_id: 5,
            t_address: "Via dei cipressi",
            t_cap: "98122",
            t_city: "Messina",
            t_province: "ME",
            t_state: "Italy",
            t_location_name: "I Cudittu"
        },
        t_event_dates: [
            new Date("2012-12-24"),
            new Date("2012-12-25"),
        ],
        t_day_sell_max: 500,
        t_total_sell_max: 1000,
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 1,
                ticket_price: 10,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 13999
    },
    {
        n_id: 6,
        n_group_id: 5,
        t_title: "Vegvisir Dark Ambient Festival",
        t_image_link: "https://www.goth.it/images/events/d/55317_20220226centrale66_front_379x464x71fa.jpg",
        t_location: {
            n_id: 6,
            t_address: "Via Nicolo dell'abate 66",
            t_cap: "41121",
            t_city: "Modena",
            t_province: "MO",
            t_state: "Italy",
            t_location_name: "I Modenesi Incalliti"
        },
        t_event_dates: [
            new Date("2023-02-15"),
            new Date("2023-02-25"),
        ],
        t_day_sell_max: 1000,
        t_total_sell_max: 12000,
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 10,
                ticket_price: 20,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 11,
                ticket_price: 40,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 34000 //Modificare si devono registrare le vendite per tipo t_price es. 30 standard ticker, 50 consumption ticket etc.
    }
];

export const allEventList: Array<Event> = [
    {
        n_id: 1,
        t_title: "Discoteca tropicale",
        t_description: "Scopri gli appuntamenti della discoteca tropicale. A breve l'annuncio di nuove date nelle stesse città.",
        n_group_id: 1,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_location: {
            n_id: 1,
            t_address: "Via Roma 19",
            t_cap: "84084",
            t_city: "Fisciano",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Fisciano"
        },
        t_event_dates: [
            new Date("2024-04-15"),
            new Date("2024-04-15"),
        ],
        t_price: [
            {
                n_id: 1,
                ticket_price: 10,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 2,
                ticket_price: 20,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 3,
                ticket_price: 300,
                table_min_num_person: 6,
                table_max_num_person: 10,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            }

        ],
        t_reviews: [
            {
                t_user: {
                    n_user_id: 1,
                    t_name: "Lodo"
                },
                t_review: "Discoteca nella media biglietto costoso",
                n_stars: 4
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 1000
    },
    {
        n_id: 2,
        n_group_id: 2,
        t_title: "Ladies Night",
        t_image_link: "https://img.freepik.com/free-vector/gradient-girls-night-neon-poster-template_52683-86711.jpg?w=740&t=st=1696171997~exp=1696172597~hmac=ac486126a384bafb1ab62294d5643e6bea2b06338c7633dce9fd352d051c2027",
        t_location: {
            n_id: 2,
            t_address: "Viale Antonio Bandiera 14",
            t_cap: "84131",
            t_city: "Salerno",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Bandiera"
        },
        t_event_dates: [
            new Date("2023-11-30"),
            new Date("2023-11-30"),
        ],
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 4,
                ticket_price: 15,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 5,
                ticket_price: 30,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 6,
                ticket_price: 450,
                table_min_num_person: 10,
                table_max_num_person: 15,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            },
            {
                n_id: 7,
                ticket_price: 1500,
                table_min_num_person: 10,
                table_max_num_person: 25,
                t_note: "Tavolo DJ",
                t_type: EVENT_TICKET_TYPE.BOTTLE_VIP_TICKET_PRICE
            },
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 13000
    },
    {
        n_id: 3,
        n_group_id: 3,
        t_title: "Carnival Party",
        t_image_link: "https://d2fa23zcjd5klo.cloudfront.net/square/event/057bf979-fc07-42ef-9644-99eb7d0ffd84.jpg",
        t_location: {
            n_id: 3,
            t_address: "SS7 12",
            t_cap: "81100",
            t_city: "Caserta",
            t_province: "CE",
            t_state: "Italy",
            t_location_name: "La Suerte"
        },
        t_event_dates: [
            new Date("2024-02-23"),
            new Date("2024-02-23"),
        ],
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 8,
                ticket_price: 40,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 9,
                ticket_price: 900,
                table_min_num_person: 8,
                table_max_num_person: 15,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            },
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 4096
    },
    {
        n_id: 4,
        t_title: "Wine Music",
        t_image_link: "https://www.toteadv.it/wp-content/uploads/2020/08/locandina_eventi_2017_antica_cantina_veneta.jpg",
        t_location: {
            n_id: 4,
            t_address: "Via Giordano Bruno 24",
            t_cap: "35124",
            t_city: "Padova",
            t_province: "PD",
            t_state: "Italy",
            t_location_name: "I padovani pazzi"
        },
        t_event_dates: [
            new Date("2024-09-20"),
            new Date("2024-09-29"),
        ],
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: true,
        t_external_link: "https://www.google.com",
        n_click: 6499
    },
    {
        n_id: 5,
        n_group_id: 4,
        t_title: "Memorie di natale",
        t_image_link: "http://www.oasisantantonio.it/eventi/locandina_natale2012.jpg",
        t_location: {
            n_id: 5,
            t_address: "Via dei cipressi",
            t_cap: "98122",
            t_city: "Messina",
            t_province: "ME",
            t_state: "Italy",
            t_location_name: "I Cudittu"
        },
        t_event_dates: [
            new Date("2012-12-24"),
            new Date("2012-12-25"),
        ],
        t_day_sell_max: 500,
        t_total_sell_max: 1000,
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 1,
                ticket_price: 10,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 13999
    },
    {
        n_id: 6,
        n_group_id: 5,
        t_title: "Vegvisir Dark Ambient Festival",
        t_image_link: "https://www.goth.it/images/events/d/55317_20220226centrale66_front_379x464x71fa.jpg",
        t_location: {
            n_id: 6,
            t_address: "Via Nicolo dell'abate 66",
            t_cap: "41121",
            t_city: "Modena",
            t_province: "MO",
            t_state: "Italy",
            t_location_name: "I Modenesi Incalliti"
        },
        t_event_dates: [
            new Date("2023-02-15"),
            new Date("2023-02-26"),
        ],
        t_day_sell_max: 1000,
        t_total_sell_max: 12000,
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 10,
                ticket_price: 20,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 11,
                ticket_price: 40,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 34000 //Modificare si devono registrare le vendite per tipo t_price es. 30 standard ticker, 50 consumption ticket etc.
    },
    {
        n_id: 7,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_location: {
            n_id: 7,
            t_address: "Via Bel ragazzo 18",
            t_cap: "33581",
            t_city: "Roma",
            t_province: "RM",
            t_state: "Italy",
            t_location_name: "I Pazzi Belli"
        },
        t_event_dates: [
            new Date("2024-04-17"),
            new Date("2024-04-17"),
        ],
        t_price: [
            {
                n_id: 12,
                ticket_price: 25,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 13,
                ticket_price: 50,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 14,
                ticket_price: 1000,
                table_min_num_person: 6,
                table_max_num_person: 10,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 333
    },
    {
        n_id: 8,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_location: {
            n_id: 8,
            t_address: "Via Marco 11",
            t_cap: "31250",
            t_city: "Lucca",
            t_province: "LU",
            t_state: "Italy",
            t_location_name: "Villa Armani"
        },
        t_event_dates: [
            new Date("2024-05-15"),
            new Date("2024-05-15"),
        ],
        t_price: [
            {
                n_id: 15,
                ticket_price: 35,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 16,
                ticket_price: 70,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 690
    },
    {
        n_id: 9,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_location: {
            n_id: 9,
            t_address: "Via Ferrara 19",
            t_cap: "84013",
            t_city: "Cava De' Tirreni",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Vanilla Disque"
        },
        t_event_dates: [
            new Date("2024-08-15"),
            new Date("2024-08-15"),
        ],
        t_price: [
            {
                n_id: 4,
                ticket_price: 15,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 17,
                ticket_price: 25,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            }
        ],
        t_reviews: [
            {
                t_user: {
                    n_user_id: 2,
                    t_name: "Lucy"
                },
                t_review: "Discoteca perfetta. Abbiamo preso il tavolo",
                n_stars: 5
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 100
    },
    {
        n_id: 10,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_location: {
            n_id: 1,
            t_address: "Via Roma 19",
            t_cap: "84084",
            t_city: "Fisciano",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Fisciano"
        },
        t_event_dates: [
            new Date("2024-09-15"),
            new Date("2024-09-15"),
        ],
        t_price: [
            {
                n_id: 1,
                ticket_price: 10,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 2,
                ticket_price: 20,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 18,
                ticket_price: 500,
                table_min_num_person: 6,
                table_max_num_person: 10,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 450
    },
    {
        n_id: 11,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_location: {
            n_id: 10,
            t_address: "Via Spugna Contrada 11",
            t_cap: "84015",
            t_city: "Nocera Superiore",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Villa Nuceria"
        },
        t_event_dates: [
            new Date("2024-11-15"),
            new Date("2024-11-15"),
        ],
        t_price: [
            {
                n_id: 19,
                ticket_price: 30,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 20,
                ticket_price: 60,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 21,
                ticket_price: 600,
                table_min_num_person: 6,
                table_max_num_person: 10,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            }
        ],
        t_company: {
            n_company_id: 1,
            t_company_name: "Black Noise",
            t_company_description: ""
        },
        b_active: true,
        b_external_event: false,
        n_vendite: 150
    },
    {
        n_id: 12,
        n_group_id: 2,
        t_title: "Ladies Night",
        t_image_link: "https://img.freepik.com/free-vector/gradient-girls-night-neon-poster-template_52683-86711.jpg?w=740&t=st=1696171997~exp=1696172597~hmac=ac486126a384bafb1ab62294d5643e6bea2b06338c7633dce9fd352d051c2027",
        t_location: {
            n_id: 11,
            t_address: "Viale Antonio Amato 14",
            t_cap: "84010",
            t_city: "Salerno",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "La Gazzella"
        },
        t_event_dates: [
            new Date("2023-12-30"),
            new Date("2023-12-30"),
        ],
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 12,
                ticket_price: 25,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 22,
                ticket_price: 35,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 23,
                ticket_price: 750,
                table_min_num_person: 10,
                table_max_num_person: 15,
                t_type: EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE
            },
            {
                n_id: 24,
                ticket_price: 2500,
                table_min_num_person: 10,
                table_max_num_person: 25,
                t_note: "Tavolo DJ",
                t_type: EVENT_TICKET_TYPE.BOTTLE_VIP_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 7000
    },
    {
        n_id: 13,
        n_group_id: 3,
        t_title: "Carnival Party",
        t_image_link: "https://d2fa23zcjd5klo.cloudfront.net/square/event/057bf979-fc07-42ef-9644-99eb7d0ffd84.jpg",
        t_location: {
            n_id: 12,
            t_address: "Roccococchia 12",
            t_cap: "83100",
            t_city: "Salerno",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Teatro Verdi"
        },
        t_event_dates: [
            new Date("2024-03-23"),
            new Date("2024-03-23"),
        ],
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 25,
                ticket_price: 100,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            },
            {
                n_id: 26,
                ticket_price: 1900,
                table_min_num_person: 8,
                table_max_num_person: 15,
                t_type: EVENT_TICKET_TYPE.BOTTLE_VIP_TICKET_PRICE
            },
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 1590
    },
    {
        n_id: 14,
        n_group_id: 4,
        t_title: "Memorie di natale",
        t_image_link: "http://www.oasisantantonio.it/eventi/locandina_natale2012.jpg",
        t_location: {
            n_id: 13,
            t_address: "Via Mario Baldi",
            t_cap: "83011",
            t_city: "Napoli",
            t_province: "NA",
            t_state: "Italy",
            t_location_name: "Teatro della disgrazia"
        },
        t_event_dates: [
            new Date("2023-12-24"),
            new Date("2023-12-25"),
        ],
        t_day_sell_max: 500,
        t_total_sell_max: 1000,
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 27,
                ticket_price: 100,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 1999
    },
    {
        n_id: 15,
        n_group_id: 5,
        t_title: "Vegvisir Dark Ambient Festival",
        t_image_link: "https://www.goth.it/images/events/d/55317_20220226centrale66_front_379x464x71fa.jpg",
        t_location: {
            n_id: 14,
            t_address: "Via Nicolo Abate 36",
            t_cap: "83849",
            t_city: "Scampia",
            t_province: "NA",
            t_state: "Italy",
            t_location_name: "Teatro della disgrazia"
        },
        t_event_dates: [
            new Date("2023-02-02"),
            new Date("2023-02-26"),
        ],
        t_day_sell_max: 1000,
        t_total_sell_max: 24000,
        t_type: EVENT_TYPE.PARTY,
        t_price: [
            {
                n_id: 10,
                ticket_price: 20,
                t_type: EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE
            },
            {
                n_id: 11,
                ticket_price: 40,
                t_type: EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE
            }
        ],
        b_active: true,
        b_external_event: false,
        n_vendite: 24000
    }
];

export const ROUTE_LIST =
{
    homepage: {
        login: "/login",
        signup: "/signUp",
    },
    event: {
        detail: "/event/detail",
        ticket: {
            list: "/event/ticket/list"
        }
    },
    payment: {
        checkout: "/payment/checkout"
    }
};

export const COLORS: Record<string, EventColor> = {
    red: { primary: '#ad2121', secondary: '#FAE3E3' },
    green: { primary: '#016272', secondary: '#016272' },
    blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
    yellow: { primary: '#e3bc08', secondary: '#FDF1BA' }
};