import { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
} from '@mui/material';
import { GlobalContext } from '../layouts/PageLayout';
import { DeviceService } from '../../api/DeviceService';
import { DeviceUsageService } from '../../api/DeviceUsageService';

const History = () => {
  const [searchParams] = useSearchParams();
  const deviceId = searchParams.get('deviceId');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [devicesUsageList, setDevicesUsageList] = useState([]);
  const [device, setDevice] = useState();

  useEffect(() => {
    const getUsage = async () => {
      return await DeviceUsageService.getByDeviceId(deviceId);
    };
    const getDevice = async () => {
      return await DeviceService.getDeviceById(deviceId);
    };

    if (deviceId) {
      getUsage().then(({ data }) => {
        setDevicesUsageList(data);
      });
      getDevice().then(({ data }) => {
        setDevice(data);
      });
    }
  }, [deviceId]);

  const { userId, userEmail } = useContext(GlobalContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUser = (id) => {
    const users = ['admin@hospital.com', 'medico@hospital.com'];

    if (id === userId) {
      return userEmail;
    } else {
      return users.filter((x) => x !== userEmail);
    }
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - devicesUsageList.length)
      : 0;

  const { name } = device || {};

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          {name}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="body2">
          Histórico de Empréstimos e Devoluções do equipamento <b>{name}</b>
        </Typography>
      </Stack>
      <Card>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell key="identification" align="left">
                  Código de Idenfificação
                </TableCell>
                <TableCell key="device" align="left">
                  Equipamento
                </TableCell>
                <TableCell key="user" align="left">
                  Usuário
                </TableCell>
                <TableCell key="deviceLocation" align="left">
                  Localização
                </TableCell>
                <TableCell key="usageType" align="left">
                  Tipo
                </TableCell>
                <TableCell key="notes" align="left">
                  Observações
                </TableCell>
                <TableCell key="cratedDate" align="left">
                  Data
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {devicesUsageList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const {
                    identification,
                    deviceId,
                    userId,
                    deviceLocation,
                    usageType,
                    notes,
                    createdDate,
                  } = row;

                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell align="left">{identification}</TableCell>
                      <TableCell align="left">{deviceId}</TableCell>
                      <TableCell align="left">{getUser(userId)}</TableCell>
                      <TableCell align="left">{deviceLocation}</TableCell>
                      <TableCell align="left">
                        {usageType === 0 ? 'Empréstimo' : 'Devolução'}
                      </TableCell>
                      <TableCell align="left">{notes}</TableCell>
                      <TableCell align="left">
                        {createdDate.split('T')[0]}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={devicesUsageList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export { History };
