import axios, {AxiosInstance} from 'axios';

class ApiService {
  private static instance: ApiService;
  session: AxiosInstance;

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private constructor() {
    const baseURL = 'http://127.0.0.1:8000/';

    this.session = axios.create({baseURL});
  }

  setAuthenticationToken = (token: string | null) => {
    if (token) {
      this.session.defaults.headers.common.Authorization = `Token ${token}`;
    } else {
      delete this.session.defaults.headers.common.Authorization;
    }
  };

  get = (url: string) => this.session.get(url);
  post = (url: string, data: any) => this.session.post(url, data);
}

const apiService = ApiService.getInstance();

export default apiService;
