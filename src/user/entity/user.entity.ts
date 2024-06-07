import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserCreateDTO } from '../dto/user-create.dto';

@Entity()
export class User {
  constructor(data: UserCreateDTO){
    if(data){
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.username = data.username;
      this.password = data.password;
    }
    this.role = 'user';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstname: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

  makeAdmin(){
    this.role = 'admin';
  }
}
