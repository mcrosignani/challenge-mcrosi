import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Process')
export class ProcessModel {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('int')
    totalDays: number;
    @Column('date')
    date: Date;
    @Column('text')
    status: string;
}