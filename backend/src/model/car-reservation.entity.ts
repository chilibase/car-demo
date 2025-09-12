import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, VersionColumn} from 'typeorm';
import {XUser} from "@chilibase/backend/x-user.entity";
import {Car} from "./car.entity.js";
import {Client} from "./client.entity.js";

@Entity()
export class CarReservation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'date_from', type: 'date', nullable: false})
    dateFrom: Date | null;

    @Column({name: 'date_to', type: 'date', nullable: true})
    dateTo: Date | null;

    @Column({type: 'numeric', precision: 12, scale: 2, nullable: true})
    price: number | null;

    @Column({nullable: true})
    comment: string | null;

    @ManyToOne(() => Car, {nullable: false})
    @JoinColumn([{name: "car_id", referencedColumnName: "id"}])
    car: Car;

    @ManyToOne(() => Client, {nullable: false})
    @JoinColumn([{name: "client_id", referencedColumnName: "id"}])
    client: Client;

    // technical attributes
    @Column("timestamp without time zone", { name: "modif_date", nullable: true })
    modifDate: Date | null;

    @ManyToOne(() => XUser, { nullable: true })
    @JoinColumn([{ name: "modif_x_user_id", referencedColumnName: "id" }])
    modifXUser: XUser | null;

    @VersionColumn()
    version: number;
}
