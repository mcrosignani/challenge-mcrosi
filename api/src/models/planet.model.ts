import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Planets')
export class PlanetModel {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('text')
    name: string;
    @Column('int')
    distance: number;
    @Column('int')
    angularVelocity: number;
    @Column('int')
    a0: number;
    @Column('decimal')
    x0: number;
    @Column('decimal')
    y0: number;
}