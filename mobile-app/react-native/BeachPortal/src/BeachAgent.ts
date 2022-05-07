import LoginResponse from './LoginResponse';

class BeachAgent {
  static login = (
    username: string,
    password: string,
  ): Promise<LoginResponse> => {
    return Promise.resolve({id: 1, username: 'asdqwe', token: 'qweasd'});
    // return apiService
    //   .post('/api/login', { username, password })
    //   .then((response: { data: LoginResponse }) => response.data)
  };
}

export default BeachAgent;
