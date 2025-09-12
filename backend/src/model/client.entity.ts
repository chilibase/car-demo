import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, VersionColumn} from 'typeorm';
import {XUser} from "@chilibase/backend/x-user.entity";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string | null;

    @Column({name: 'birth_date', type: 'date', nullable: true})
    birthDate: Date | null;

    @Column({nullable: true})
    contact: string | null;

    @Column({nullable: true})
    address: string | null;

    // technical attributes
    @Column("timestamp without time zone", { name: "modif_date", nullable: true })
    modifDate: Date | null;

    @ManyToOne(() => XUser, { nullable: true })
    @JoinColumn([{ name: "modif_x_user_id", referencedColumnName: "id" }])
    modifXUser: XUser | null;

    @VersionColumn()
    version: number;
}
