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
import { DeviceService } from '../../api/DeviceService';
import { DeviceContext } from './Device';
import { getDeviceData } from '../hooks/useDeviceData';

const EditDevice = ({ item, isOpen }) => {
  const { setDevicesList } = useContext(DeviceContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const [name, setName] = useState(item.name);
  const [identification, setIdentification] = useState(item.identification);
  const [serialNumber, setSerialNumber] = useState(item.serialNumber);
  const [manufacturer, setManufacturer] = useState(item.manufacturer);
  const [supplier, setSupplier] = useState(item.supplier);
  const [purchaseDate, setPurchaseDate] = useState(item.purchaseDate);
  const [category, setCategory] = useState(item.category);
  const [status, setStatus] = useState(item.status);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const requestObject = {
      id: item.id,
      name: name,
      identification: identification,
      serialNumber: serialNumber,
      manufacturer: manufacturer,
      supplier: supplier,
      purchaseDate: purchaseDate,
      category: parseInt(category),
      status: parseInt(status),
    };
    const response = await DeviceService.updateDevice(requestObject);
    const { success } = response || {};

    if (success) {
      // update Device List
      const newData = await getDeviceData();
      setDevicesList(newData);

      //reset();
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Equipamento</DialogTitle>
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
            label="Nome"
            variant="standard"
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Codigo de Identificação"
            variant="standard"
            margin="dense"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
          />
          <TextField
            label="Serial"
            variant="standard"
            margin="dense"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
          <TextField
            label="Fabricante"
            variant="standard"
            margin="dense"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <TextField
            label="Fornecedor"
            variant="standard"
            margin="dense"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
          <TextField
            label="Data de Compra"
            variant="standard"
            margin="dense"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
          <TextField
            label="Categoria"
            select
            variant="standard"
            margin="dense"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem key="0" value="0">
              Equipamento Médico Durável
            </MenuItem>
            <MenuItem key="1" value="1">
              Equipamento de Diagonóstico
            </MenuItem>
            <MenuItem key="2" value="2">
              Equipamento de Tratamento
            </MenuItem>
            <MenuItem key="3" value="3">
              Equipamento de Suporte à Vida
            </MenuItem>
          </TextField>
          <TextField
            label="Status"
            select
            variant="standard"
            margin="dense"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem key="0" value="0">
              Ativo
            </MenuItem>
            <MenuItem key="1" value="1">
              Inativo
            </MenuItem>
            <MenuItem key="2" value="2">
              Em Manutenção
            </MenuItem>
            <MenuItem key="3" value="3">
              Descartado
            </MenuItem>
            <MenuItem key="4" value="4">
              Desconhecido/Perdido
            </MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export { EditDevice };
