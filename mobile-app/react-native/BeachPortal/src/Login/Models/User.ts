import {Person} from './Person';

export class User extends Person {
  constructor(
    public id: number,
    public username: string,
    public token: string,
  ) {
    super(id, username);
  }

  static create = () => new User(0, '', '');
}

export default User;
