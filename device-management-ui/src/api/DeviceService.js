import { apiRequest } from './apiRequest';

const devices = {
  getDevices: ({ token }) => apiRequest.get('devices', {}, token),
  getDeviceById: ({ id, token }) => apiRequest.get(`devices/${id}`, {}, token),
  createDevice: ({ token, request }) =>
    apiRequest.post('devices', request, token),
  updateDevice: ({ token, request, id }) =>
    apiRequest.put(`devices/${id}`, request, token),
  deleteDevice: ({ token, id }) =>
    apiRequest.delete(`devices/${id}`, {}, token),
};

class DeviceService {
  accessToken = '';

  static setAccessToken(token) {
    this.accessToken = token;
  }

  static getDevices = () => {
    const token = this.accessToken;
    return devices
      .getDevices({ token })
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

  static createDevice = (request) => {
    const token = this.accessToken;

    return devices
      .createDevice({ request, token })
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

  static updateDevice = (request) => {
    const token = this.accessToken;

    const { id } = request;
    return devices
      .updateDevice({ token, request, id })
      .then((response) => {
        const { status } = response;
        if (status === 204) {
          return { ...response, ...{ success: true } };
        } else {
          return { ...response, ...{ success: false } };
        }
      })
      .catch(() => {
        console.log('error');
      });
  };

  static deleteDevice = (id) => {
    const token = this.accessToken;
    return devices
      .deleteDevice({ token, id })
      .then((response) => {
        const { status } = response;
        if (status === 204) {
          return { ...response, ...{ success: true } };
        } else {
          return { ...response, ...{ success: false } };
        }
      })
      .catch(() => {
        console.log('error');
      });
  };

  static getDeviceById = (id) => {
    const token = this.accessToken;
    return devices
      .getDeviceById({ token, id })
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

export { DeviceService };
