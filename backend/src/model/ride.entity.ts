import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Country} from "./country.entity.js";
import {Car} from "./car.entity.js";

@Entity()
export class Ride {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'city_from', nullable: false})
    cityFrom: string;

    @Column({name: 'city_to', nullable: true})
    cityTo: string | null;

    @Column({nullable: true})
    km: number | null;

    @Column({name: 'fuel_price', type: 'numeric', precision: 12, scale: 2, nullable: true})
    fuelPrice: number | null;

    @Column({name: 'ride_date', type: 'date', nullable: true})
    rideDate: Date | null;

    @Column("timestamp without time zone", {name: 'ride_datetime', nullable: true})
    rideDatetime: Date | null;

    @Column({name: 'ride_boolean', nullable: false})
    rideBoolean: boolean;

    @ManyToOne('Car', 'rideList', {nullable: false})
    @JoinColumn({name: "car_id", referencedColumnName: "id"})
    car: Car;

    @ManyToOne(() => Country, {nullable: true})
    @JoinColumn({name: "country_id", referencedColumnName: "id"})
    country: Country | null;
}