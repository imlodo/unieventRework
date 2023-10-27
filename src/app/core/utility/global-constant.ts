import { EventColor } from "calendar-utils";
import { Event } from "../models/event";

export const MAX_NUM_SLIDE = 5;

export enum USER_TYPE {
    ADMIN,
    CUSTOMER,
    COMPANY
}
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
export interface OBJECT_MAP_TYPE {
    TABLE?: {
        DISCOTECA?: boolean;
    },
    SEAT?: {
        TYPE: {
            NO_CONSUMATION?: boolean;
            WITH_CONSUMATION?: boolean;
        },
        ROW?: {
            NO_ROW?: boolean;
            A?: boolean;
            B?: boolean;
        }
    }
}

export interface EVENT_SERVICE_TYPE {
    DRINK?: {
        PROSECCO?: boolean,
        VINO_ROSSO?: boolean
    },
    FOOD?: {
        PIZZA?: boolean,
        FRITTURA?: boolean
    }
}
export const eventOrderedBySell: Array<Event> = [
    {
        n_id: 1,
        n_group_id: 1,
        n_click: 1899,
        t_title: "Discoteca tropicale",
        t_description: "Migliore discoteca del pianeta",
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        //t_external_link: 'http://www.google.com',
        t_event_date: new Date("2024-04-15"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        t_location: {
            n_id: 1,
            t_address: "Via Roma 19",
            t_cap: "84084",
            t_city: "Fisciano",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Fisciano"
        },
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 2,
        n_group_id: 2,
        n_click: 699,
        t_title: "Ladies Night",
        t_description: "Le migliori donne sono qui!",
        t_image_link: "https://img.freepik.com/free-vector/gradient-girls-night-neon-poster-template_52683-86711.jpg?w=740&t=st=1696171997~exp=1696172597~hmac=ac486126a384bafb1ab62294d5643e6bea2b06338c7633dce9fd352d051c2027",
        t_event_date: new Date("2023-11-30"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        t_location: {
            n_id: 2,
            t_address: "Viale Antonio Bandiera 14",
            t_cap: "84131",
            t_city: "Salerno",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Bandiera"
        },
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 3,
        n_group_id: 3,
        n_click: 179,
        t_title: "Carnival Party",
        t_image_link: "https://d2fa23zcjd5klo.cloudfront.net/square/event/057bf979-fc07-42ef-9644-99eb7d0ffd84.jpg",
        t_event_date: new Date("2024-02-23"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        t_location: {
            n_id: 3,
            t_address: "SS7 12",
            t_cap: "81100",
            t_city: "Caserta",
            t_province: "CE",
            t_state: "Italy",
            t_location_name: "La Suerte"
        },
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: false,
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
        t_event_date: new Date("2024-09-20"),
        t_map: [],
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: true,
        t_external_link: "https://www.google.com",
        n_click: 6499
    },
    {
        n_id: 5,
        n_group_id: 4,
        n_click: 4899,
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
        t_event_date: new Date("2012-12-24"),
        t_type: EVENT_TYPE.PARTY,
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 6,
        n_group_id: 5,
        n_click: 3500,
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
        t_event_date: new Date("2023-02-15"),
        t_type: EVENT_TYPE.PARTY,
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
    }
];

export const allEventList: Array<Event> = [
    {
        n_id: 1,
        n_group_id: 1,
        n_click: 1899,
        t_title: "Discoteca tropicale",
        t_description: "Migliore discoteca del pianeta",
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        //t_external_link: 'http://www.google.com',
        t_event_date: new Date("2024-04-15"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        t_location: {
            n_id: 1,
            t_address: "Via Roma 19",
            t_cap: "84084",
            t_city: "Fisciano",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Fisciano"
        },
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 2,
        n_group_id: 2,
        n_click: 699,
        t_title: "Ladies Night",
        t_description: "Le migliori donne sono qui!",
        t_image_link: "https://img.freepik.com/free-vector/gradient-girls-night-neon-poster-template_52683-86711.jpg?w=740&t=st=1696171997~exp=1696172597~hmac=ac486126a384bafb1ab62294d5643e6bea2b06338c7633dce9fd352d051c2027",
        t_event_date: new Date("2023-11-30"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        t_location: {
            n_id: 2,
            t_address: "Viale Antonio Bandiera 14",
            t_cap: "84131",
            t_city: "Salerno",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Bandiera"
        },
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 3,
        n_group_id: 3,
        n_click: 179,
        t_title: "Carnival Party",
        t_image_link: "https://d2fa23zcjd5klo.cloudfront.net/square/event/057bf979-fc07-42ef-9644-99eb7d0ffd84.jpg",
        t_event_date: new Date("2024-02-23"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        t_location: {
            n_id: 3,
            t_address: "SS7 12",
            t_cap: "81100",
            t_city: "Caserta",
            t_province: "CE",
            t_state: "Italy",
            t_location_name: "La Suerte"
        },
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: false,
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
        t_event_date: new Date("2024-09-20"),
        t_map: [],
        t_type: EVENT_TYPE.PARTY,
        b_active: true,
        b_external_event: true,
        t_external_link: "https://www.google.com",
        n_click: 6499
    },
    {
        n_id: 5,
        n_group_id: 4,
        n_click: 4899,
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
        t_event_date: new Date("2012-12-24"),
        t_type: EVENT_TYPE.PARTY,
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 6,
        n_group_id: 5,
        n_click: 3500,
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
        t_event_date: new Date("2023-02-15"),
        t_type: EVENT_TYPE.PARTY,
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 7,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        n_click:3941,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_event_date:new Date("2024-04-17"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        t_location: {
            n_id: 1,
            t_address: "Via Roma 19",
            t_cap: "84084",
            t_city: "Fisciano",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Fisciano"
        },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 8,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        n_click: 1239,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        t_event_date: new Date("2024-05-15"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        t_location: {
            n_id: 1,
            t_address: "Via Roma 19",
            t_cap: "84084",
            t_city: "Fisciano",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Disco Fisciano"
        },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 9,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        t_image_link: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
        t_type: EVENT_TYPE.PARTY,
        n_click: 1829,
        t_location: {
            n_id: 9,
            t_address: "Via Ferrara 19",
            t_cap: "84013",
            t_city: "Cava De' Tirreni",
            t_province: "SA",
            t_state: "Italy",
            t_location_name: "Vanilla Disque"
        },
        t_event_date: new Date("2024-08-15"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 10,
        t_title: "Discoteca tropicale",
        n_click: 1049,
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
        t_event_date: new Date("2024-09-15"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 11,
        t_title: "Discoteca tropicale",
        n_group_id: 1,
        n_click: 345,
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
        t_event_date: new Date("2024-11-15"),
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
       
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 12,
        n_group_id: 2,
        t_title: "Ladies Night",
        n_click: 1256,
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
        t_event_date: new Date("2023-12-30"),
        
        t_type: EVENT_TYPE.PARTY,
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 13,
        n_group_id: 3,
        t_title: "Carnival Party",
        n_click: 903,
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
        t_event_date: new Date("2024-03-23"),
        t_type: EVENT_TYPE.PARTY,
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 14,
        n_group_id: 4,
        n_click: 983,
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
        t_event_date: new Date("2023-12-24"),
        t_type: EVENT_TYPE.PARTY,
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
    },
    {
        n_id: 15,
        n_group_id: 5,
        n_click: 287,
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
        t_event_date: new Date("2023-02-02"),
        t_type: EVENT_TYPE.PARTY,
        t_service_list: [
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 20,
                t_description: "Calice prosecco di San Vittorio La Mosca",
                t_service_name: "Prosecco calice",
                t_image_link_list: ["http://www.google.com/images/prosecco.jpeg"],
                t_type: {
                    DRINK: {
                        PROSECCO: true
                    }
                }
            },
            {
                n_service_id: 1,
                n_id_event: 1,
                n_price: 10,
                t_description: "Frittura mista, potrebbe contenere allergeni",
                t_service_name: "Fritto misto",
                t_image_link_list: ["http://www.google.com/images/fritto_misto.jpeg"],
                t_type: {
                    FOOD: {
                        FRITTURA: true
                    }
                }
            }
        ],
        t_map: [
            {
                n_id: 1,
                n_id_event: 1,
                n_min_num_person: 8,
                n_max_num_person: 15,
                n_limit_buy_for_person: 1,
                n_object_price: 700,
                t_map_cord_x: 1,
                t_map_cord_y: 2,
                t_map_cord_z: 1,
                t_note: "Tavolo normale, inclusa una consumazione da 500€",
                t_type: {
                    TABLE: {
                        DISCOTECA: true
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 14,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 15,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 16,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 17,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 18,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 19,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 20,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: true
                    },
                    {
                        n_seat_num: 21,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 22,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 23,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 24,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 25,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 26,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                    {
                        n_seat_num: 27,
                        n_object_map_id: 1,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 2,
                n_id_event: 1,
                n_limit_buy_for_person: 5,
                n_object_price: 10,
                t_map_cord_x: 5,
                t_map_cord_y: 25,
                t_map_cord_z: 1,
                t_note: "Non inclusa consumazione",
                t_type: {
                    SEAT: {
                        TYPE: {
                            NO_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 1,
                        n_object_map_id: 2,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
            {
                n_id: 3,
                n_id_event: 1,
                n_limit_buy_for_person: 6,
                n_object_price: 20,
                t_map_cord_x: 6,
                t_map_cord_y: 26,
                t_map_cord_z: 1,
                t_note: "Consumazione di 2 cocktail inclusa",
                t_type: {
                    SEAT: {
                        TYPE: {
                            WITH_CONSUMATION: true
                        }
                    }
                },
                t_seat_list: [
                    {
                        n_seat_num: 2,
                        n_object_map_id: 3,
                        n_id_event: 1,
                        is_sell: false
                    },
                ]
            },
        ],
        t_reviews: [
            {
                n_id: 1,
                event_id: 1,
                n_stars: 5,
                t_object: "Discoteca fantastica!",
                t_body: "Siamo stati alla discoteca 31-12-2022, non vediamo l'ora di tornarci con questo fantastico evento.",
                t_image_link: ["/gbpr?hash=3jsadksdkhh3sadjkbmnsa3%sgdaska"],
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            },
            {
                n_id: 2,
                event_id: 1,
                n_stars: 1,
                t_object: "Discoteca mediocre!",
                t_body: "Personale scortese, e cocktail senza giacchio, non ci torneremo mai più! Da chiudere...",
                t_image_link: ["/gpbr?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by review
                t_user: { t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "alod323453asd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_discussions: [
            {
                n_id: 1,
                t_object: "Organizziamo una festa in questo locale il prossimo Halloween?",
                t_body: "Ragazzi la mia idea è quella di organizzare una super festa di halloween in questo locale,\n come ben sapete da circa 10 anni,\n questo locale ha i drink migliori, la ragazze sono sempre bellissime.",
                t_image_link: ["/gpbd?hash=ffdassdasd3jads325r79hfdzafhk"], //get photo by discussion
                t_user: { t_name: "Pasquale", t_surname: "Schettino", t_alias_generated: "passchet2308abgd", t_type: USER_TYPE.CUSTOMER }
            }
        ],
        t_artist_list: [
            {
                t_alias: "I pazzi scatenati",
                t_desc: "Pasquale Schettino e Vasyl Arseni, nome d'arte \"I pazzi scatenati \" nascono a Milano nel lontano 2010, e subito...",
                t_image_link: "https://images.everyeye.it/img-screenshot/lock-stock-pazzi-scatenati-v1-535042.jpg"
            }
        ],
        t_company: { t_name: "Disco Club S.R.L", t_surname: "", t_alias_generated: "disco-club-srl", t_type: USER_TYPE.COMPANY },
        b_active: true,
        b_external_event: false,
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