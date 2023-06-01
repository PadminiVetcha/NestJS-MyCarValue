import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany, //Association type wrt User to Reports
} from 'typeorm';
import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('New User Inserted with Id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated the User with Id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed the User with Id: ', this.id);
  }
}
