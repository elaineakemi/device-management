import { useState, createContext, useContext } from 'react';
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
import { NewDeviceUsage } from './NewDeviceUsage';
import { useDeviceUsageData } from '../hooks/useDeviceUsageData';
import { GlobalContext } from '../layouts/PageLayout';
import { Scrollbar } from '../layouts/Scrollbar';

const DeviceUsageContext = createContext();

const DeviceUsage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [devicesUsageList, setDevicesUsageList] = useDeviceUsageData();

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

  const deviceUsageContext = {
    devicesUsageList,
    setDevicesUsageList,
  };

  return (
    <DeviceUsageContext.Provider value={deviceUsageContext}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Empréstimo & Devolução de Equipamentos
          </Typography>

          <NewDeviceUsage />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">
            Por motivos de segurança, não é permitido a alteração ou exclusão de
            registros.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="body2">
            Em caso de preenchimento incorreto, criar um novo registro de
            empréstimo ou devolução.
          </Typography>
        </Stack>
        <Card>
          <Scrollbar>
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
                  {Array.isArray(devicesUsageList) &&
                    devicesUsageList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                            <TableCell align="left">
                              {getUser(userId)}
                            </TableCell>
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
          </Scrollbar>
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
    </DeviceUsageContext.Provider>
  );
};

export { DeviceUsage, DeviceUsageContext };
