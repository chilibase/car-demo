import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    code: string;

    @Column({nullable: false})
    name: string;
}