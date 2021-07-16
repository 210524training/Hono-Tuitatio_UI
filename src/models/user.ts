import { v4 as uuidv4 } from 'uuid';

export default class User {
  constructor(
    public username: string,
    public password: string,
    public role: Role = 'Employee',
    public email: string = '',
    public supervisor: string = '',
    public id: string = uuidv4(),
    public balance: number = 1000,
  ) {}
}

export type Role = 'Employee' | 'Benco' | 'Supervisor' | 'Manager';
