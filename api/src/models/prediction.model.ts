import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CoordinateModel } from './coordinate.model';

@Entity('Predictions')
export class PredictionModel {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('decimal')
    xVulc: number;
    @Column('decimal')
    yVulc: number;
    @Column('decimal')
    xBeta: number;
    @Column('decimal')
    yBeta: number;
    @Column('decimal')
    xFeren: number;
    @Column('decimal')
    yFeren: number;
    @Column('int')
    day: number;
    @Column('text')
    weather: string;
    @Column('decimal', {nullable: true})
    rainIntensity: number;
    @Column('decimal', {nullable: true})
    cntTemperature: number;
}