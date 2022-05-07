import {AxiosError} from 'axios';
import {action, makeObservable, observable} from 'mobx';
import apiService from './ApiService';

import AppError from './AppError';

import BeachAgent from './BeachAgent';
import Cache from './Cache';
import User from './Login/Models/User';

class BeachStore {
  user: User = User.create();
  cache: Cache = new Cache();
  favo = false;

  constructor() {
    console.log('BeachStore.tsx');
    makeObservable(this, {
      user: observable,
      setUser: action,
    });

    this.cache.user.getEntity().then(user => {
      if (!user) {
        return;
      }
      this.setUser(user);
    });
  }

  setUser(user: User) {
    this.user = user;
  }

  login = (username: string, password: string): Promise<void> =>
    BeachAgent.login(username, password)
      .then((user: User) => {
        this.cache.user.setEntity(user);
        apiService.setAuthenticationToken(user.token);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const {data, status} = error.response;
          throw new AppError(data.error);
        }
        throw new AppError('Something went wrong, please try again');
      });
}

export default BeachStore;
