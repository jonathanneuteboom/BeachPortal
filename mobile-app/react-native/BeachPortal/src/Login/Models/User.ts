import { LoginResponse } from '../../Responses'
import { Speler } from './Person'

export class User extends Speler {
  constructor(
    public id: number,
    public username: string,
    public token: string,
  ) {
    super(id, username)
  }
}

export default User
