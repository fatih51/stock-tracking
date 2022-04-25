import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Category } from "./category.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Category, category => category.id)
    category: Category;

    @Column()
    description: string;
}