import type {Car} from "./car.entity";
import type {Client} from "./client.entity";
import type {User} from "@chilibase/frontend/administration";

export interface CarReservation {
    id: number;
    dateFrom: Date | null;
    dateTo: Date | null;
    price: number | null;
    comment: string | null;
    car: Car;
    client: Client;

    // technical attributes
    modifDate: Date | null;
    modifUser: User | null;
    version: number;
}
