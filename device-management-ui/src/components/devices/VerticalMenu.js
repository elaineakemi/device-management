import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Iconify } from '../common/Iconify';
import { EditDevice } from './EditDevice';
import { DeviceService } from '../../api/DeviceService';
import { DeviceContext } from './Device';
import { getDeviceData } from '../hooks/useDeviceData';

const VerticalMenu = ({ item }) => {
  const navigate = useNavigate();
  const { setDevicesList } = useContext(DeviceContext);

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleClickEdit = () => {
    setIsOpen(false);
    setIsEditOpen(true);
  };

  const handleClickHistory = () => {
    const { id } = item;
    setIsOpen(false);
    navigate(`/history/?deviceId=${id}`);
  };

  const handleClickDelete = async () => {
    const { id } = item;
    const response = await DeviceService.deleteDevice(id);
    const { success } = response || {};

    if (success) {
      // update Device List
      const newData = await getDeviceData();
      setDevicesList(newData);
    }
    setIsOpen(false);
  };

  return (
    <>
      <EditDevice item={item} isOpen={isEditOpen} />
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleClickHistory}>
          <ListItemIcon>
            <Iconify icon="eva:clock-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Ver Histórico"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleClickEdit}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Editar"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleClickDelete}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Excluir"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export { VerticalMenu };
