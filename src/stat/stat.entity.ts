import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column()
  userAgent: string;

  @Column()
  referer: string;

  @Column()
  ip: string;

  @Column()
  language: string;

  @Column()
  timezone: string;

  @CreateDateColumn()
  createdAt: Date;
}