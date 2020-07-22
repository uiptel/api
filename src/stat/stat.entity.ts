import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { IsString, MaxLength } from 'class-validator';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn({ unsigned: true })
  id?: number;

  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: "char", length: 255})
  userAgent: string;

  @IsString({ always: true })
  @MaxLength(128, { always: true })
  @Column({ type: "char", length: 128})
  referer: string;

  @IsString({ always: true })
  @MaxLength(32, { always: true })
  @Column({ type: "char", length: 32})
  ip: string;
  
  @IsString({ always: true })
  @MaxLength(16, { always: true })
  @Column({ type: "char", length: 16})
  language: string;

  @IsString({ always: true })
  @MaxLength(16, { always: true })
  @Column({ type: "char", length: 16})
  timezone: string;

  @IsString({ always: true })
  @MaxLength(16, { always: true })
  @Column({ type: "char", length: 16})
  version: string;

  @IsString({ always: true })
  @MaxLength(128, { always: true })
  @Column({ type: "char", length: 128})
  digestImage: string;

  @CreateDateColumn()
  @Index()
  createdAt?: Date;
}
