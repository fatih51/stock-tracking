import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

import { User } from "./user.entity";
import { Product } from "./product.entity";


@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user => user.id) @JoinColumn()
    user: User;

    @OneToOne(type => Product, product => product.id) @JoinColumn()
    product: Product;

    @Column()
    stock: number;
}