import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: 'Employee' | 'Manager' | 'Admin';

  @Column({ nullable: true })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  otp!: string | null;


  @Column({ default: false })
  isVerified!: boolean;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  place!: string;
}
