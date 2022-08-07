import { useState, useEffect } from 'react';
import { DeviceService } from '../../api/DeviceService';

const useDeviceData = () => {
  const [devicesList, setDevicesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      return await DeviceService.getDevices();
    };

    fetchData().then(({ data }) => {
      setDevicesList(data);
    });
  }, []);
  return [devicesList, setDevicesList];
};

const getDeviceData = async () => {
  const response = await DeviceService.getDevices();
  const { data } = response || {};
  return data;
};

export { useDeviceData, getDeviceData };
