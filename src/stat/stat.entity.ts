import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column()
  agent: string;
}