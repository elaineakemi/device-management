import { useState, useContext, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  MenuItem,
} from '@mui/material';
import { Iconify } from '../common/Iconify';
import { DeviceUsageService } from '../../api/DeviceUsageService';
import { DeviceUsageContext } from './DeviceUsage';
import { getDeviceUsageData } from '../hooks/useDeviceUsageData';
import { getDeviceData } from '../hooks/useDeviceData';
import { GlobalContext } from '../layouts/PageLayout';

const NewDeviceUsage = () => {
  const { setDevicesUsageList } = useContext(DeviceUsageContext);
  const { userId } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);

  const [type, setType] = useState(0);
  const [identification, setIdentification] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [deviceId, setDeviceId] = useState(1);
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    const getDevices = async () => {
      return await getDeviceData();
    };

    getDevices().then((data) => {
      setDeviceList(data);
    });
  }, []);

  const reset = () => {
    setType(0);
    setIdentification('');
    setLocation('');
    setNotes('');
    setDeviceId(1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const requestObject = {
      usageType: parseInt(type),
      identification: identification,
      deviceLocation: location,
      notes: notes,
      deviceId: parseInt(deviceId),
      userId: parseInt(userId),
    };
    const response = await DeviceUsageService.createUsage(requestObject);
    const { success } = response || {};

    if (success) {
      // update Device List
      const newData = await getDeviceUsageData();
      setDevicesUsageList(newData);

      reset();
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Novo Registro
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Empréstimo & Devolução de Equipamento</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Tipo"
              select
              variant="standard"
              margin="dense"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem key="0" value="0">
                Empréstimo
              </MenuItem>
              <MenuItem key="1" value="1">
                Devolução
              </MenuItem>
            </TextField>
            <TextField
              label="Equipamento"
              select
              variant="standard"
              margin="dense"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
            >
              {Array.isArray(deviceList) &&
                deviceList.map((row, index) => {
                  const { id, name, identification } = row;
                  return (
                    <MenuItem key={id} value={id}>
                      {name} - {identification}
                    </MenuItem>
                  );
                })}
            </TextField>
            <TextField
              label="Codigo de Identificação"
              variant="standard"
              margin="dense"
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
            />
            <TextField
              label="Localização"
              variant="standard"
              margin="dense"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              label="Observações"
              variant="standard"
              margin="dense"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export { NewDeviceUsage };
