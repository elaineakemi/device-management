import { useState, useEffect } from 'react';
import { DeviceUsageService } from '../../api/DeviceUsageService';

const useDeviceUsageData = () => {
  const [devicesUsageList, setDevicesUsageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      return await DeviceUsageService.getAll();
    };

    fetchData().then(({ data }) => {
      setDevicesUsageList(data);
    });
  }, []);
  return [devicesUsageList, setDevicesUsageList];
};

const getDeviceUsageData = async () => {
  const response = await DeviceUsageService.getAll();
  const { data } = response || {};
  return data;
};

export { useDeviceUsageData, getDeviceUsageData };
