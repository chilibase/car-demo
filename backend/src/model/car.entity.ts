import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, VersionColumn} from 'typeorm';
import {XUser} from "@chilibase/backend/x-user.entity";
import {Brand} from "./brand.entity.js";
import {Ride} from "./ride.entity.js";

@Entity()
export class Car {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    vin: string;

    @Column({name: 'brand_string', nullable: true})
    brandString: string | null;

    @Column({width: 4, nullable: true})
    year: number | null;

    @Column({nullable: true})
    color: string | null;

    @Column({type: 'numeric', precision: 12, scale: 2, nullable: true})
    price: number | null;

    @Column({name: 'car_date', type: 'date', nullable: true})
    carDate: Date | null;

    @Column("timestamp without time zone", {name: 'car_datetime', nullable: true})
    carDatetime: Date | null;

    @Column({name: 'car_boolean', nullable: false})
    carBoolean: boolean;

    @Column({nullable: true})
    comment: string | null;

    @ManyToOne(() => Brand, { nullable: true })
    @JoinColumn({ name: "brand_id", referencedColumnName: "id" })
    brandAssoc: Brand | null;

    @OneToMany('Ride', 'car', {cascade: ["insert", "update", "remove"]})
    rideList: Ride[];

    // technical attributes
    @Column("timestamp without time zone", { name: "modif_date", nullable: true })
    modifDate: Date | null;

    @ManyToOne(() => XUser, { nullable: true })
    @JoinColumn([{ name: "modif_x_user_id", referencedColumnName: "id" }])
    modifXUser: XUser | null;

    @VersionColumn()
    version: number;
}
