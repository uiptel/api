import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column({ type: "char", length: 255})
  userAgent: string;

  @Column({ type: "char", length: 128})
  referer: string;

  @Column({ type: "char", length: 32})
  ip: string;

  @Column({ type: "char", length: 16})
  language: string;

  @Column({ type: "char", length: 16})
  timezone: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;
}
