import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"; 

@Entity()
export class Sesiones extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_conexion: number;

    @Column()
    email: string;

    @Column()
    fecha_hora: Date;

    @Column()
    ip: string;

    @Column()
    fecha_fin: Date;

    @Column()
    estado: string;
}