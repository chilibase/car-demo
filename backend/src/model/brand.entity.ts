import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    brand: string;
}