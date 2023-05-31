import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
