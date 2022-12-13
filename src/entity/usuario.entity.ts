import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"; 

@Entity()
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    user_name: string;

    @Column()
    user_type: string;

    @Column()
    state: string;

    @Column()
    email: string;

    @Column()
    password: string;



}