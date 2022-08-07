import { apiRequest } from './apiRequest';

const devicesUsage = {
  getAll: ({ token }) => apiRequest.get('deviceusages', {}, token),
  getByUserId: ({ token, id }) =>
    apiRequest.get(`deviceusagesByUserId/${id}`, {}, token),
  getByDeviceId: ({ token, id }) =>
    apiRequest.get(`deviceusagesByDeviceId/${id}`, {}, token),
  createUsage: ({ token, request }) =>
    apiRequest.post('deviceusages', request, token),
};

class DeviceUsageService {
  accessToken = '';

  static setAccessToken(token) {
    this.accessToken = token;
  }

  static getAll = () => {
    const token = this.accessToken;
    return devicesUsage
      .getAll({ token })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return { ...response, ...{ success: true } };
        } else {
          return { ...response, ...{ success: false } };
        }
      })
      .catch(() => {
        console.log('error');
      });
  };

  static createUsage = (request) => {
    const token = this.accessToken;
    console.log('token: ', token);
    return devicesUsage
      .createUsage({ request, token })
      .then((response) => {
        const { status } = response;
        if (status === 201) {
          return { ...response, ...{ success: true } };
        } else {
          return { ...response, ...{ success: false } };
        }
      })
      .catch(() => {
        console.log('error');
      });
  };

  static getByUserId = (id) => {
    const token = this.accessToken;
    return devicesUsage
      .getByUserId({ token, id })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return { ...response, ...{ success: true } };
        } else {
          return { ...response, ...{ success: false } };
        }
      })
      .catch(() => {
        console.log('error');
      });
  };

  static getByDeviceId = (id) => {
    const token = this.accessToken;
    return devicesUsage
      .getByDeviceId({ token, id })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return { ...response, ...{ success: true } };
        } else {
          return { ...response, ...{ success: false } };
        }
      })
      .catch(() => {
        console.log('error');
      });
  };
}

export { DeviceUsageService };
