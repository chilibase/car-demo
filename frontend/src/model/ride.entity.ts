import type {Country} from "./country.entity";
import type {Car} from "./car.entity";

export interface Ride {
    id: number;
    cityFrom: string;
    cityTo: string | null;
    km: number | null;
    fuelPrice: number | null;
    rideDate: Date | null;
    rideDatetime: Date | null;
    rideBoolean: boolean;
    car: Car;
    country: Country | null;
}