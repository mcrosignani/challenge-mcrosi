import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Statistics')
export class StatisticsModel {
    constructor(){
        this.cantDaysCalculated = 0;
        this.cantDrought = 0;
        this.maxRainDay = 0;
        this.maxRainIntensity = 0;
        this.cantNTP = 0;
        this.cantRains = 0;
        this.cantUnknouwn = 0;
    }

    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('int')
    cantDaysCalculated: number;
    @Column('int')
    maxRainDay: number;
    @Column('decimal')
    maxRainIntensity: number;
    @Column('int')
    cantDrought: number;
    @Column('int')
    cantRains: number;
    @Column('int')
    cantNTP: number;
    @Column('int')
    cantUnknouwn: number;
}