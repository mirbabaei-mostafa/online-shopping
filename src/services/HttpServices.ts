import apiServer from './api-products';

class HttpServices {
  apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiServer.get<T[]>(this.apiEndpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const create = (endpoint: string) => new HttpServices(endpoint);
export default create;
