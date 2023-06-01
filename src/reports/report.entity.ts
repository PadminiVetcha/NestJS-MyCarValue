import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string; // company name that made the vehocle

  @Column()
  model: string; // model of the vehicle

  @Column()
  year: number; // year of manufacture of the vehicle

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number; // no of kms that evhicle is driven when it was actually sold

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
