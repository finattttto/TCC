import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class GenericEntity {

  @PrimaryGeneratedColumn('increment')
  id?: number;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}