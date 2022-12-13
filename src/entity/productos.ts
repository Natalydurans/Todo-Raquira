import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"; 

@Entity()
export class Productos extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_producto: number;

    @Column()
    categoria: string;

    @Column()
    nombre_producto: string;

    @Column()
    descripcion: string;

    @Column()
    precio_unitario: number;

    @Column()
    cantidad: number;

    @Column()
    imagen: string;

}