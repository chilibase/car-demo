import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, VersionColumn} from 'typeorm';
import {User} from "@chilibase/backend/administration";

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

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn([{ name: "modif_x_user_id", referencedColumnName: "id" }])
    modifUser: User | null;

    @VersionColumn()
    version: number;
}
