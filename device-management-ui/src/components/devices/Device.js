import { useState, createContext } from 'react';
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
import { NewDevice } from './NewDevice';
import { VerticalMenu } from './VerticalMenu';
import { useDeviceData } from '../hooks/useDeviceData';
import { Scrollbar } from '../layouts/Scrollbar';

const DeviceContext = createContext();

const Device = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [devicesList, setDevicesList] = useDeviceData();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - devicesList.length) : 0;

  const deviceContext = {
    devicesList,
    setDevicesList,
  };

  const getCategoryString = (category) => {
    switch (category) {
      case 0:
        return 'Equipamento Médico Durável';
      case 1:
        return 'Equipamento de Diagonóstico';
      case 2:
        return 'Equipamento de Tratamento';
      case 3:
        return 'Equipamento de Suporte à Vida';
      default:
        return '';
    }
  };

  const getStatusString = (status) => {
    switch (status) {
      case 0:
        return 'Ativo';
      case 1:
        return 'Inativo';
      case 2:
        return 'Em Manutenção';
      case 3:
        return 'Descartado';
      case 4:
        return 'Desconhecido/Perdido';
      default:
        return '';
    }
  };

  return (
    <DeviceContext.Provider value={deviceContext}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Equipamentos
          </Typography>
          <NewDevice />
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell key="name" align="left">
                      Nome
                    </TableCell>
                    <TableCell key="identification" align="left">
                      Código de Idenfificação
                    </TableCell>
                    <TableCell key="category" align="left">
                      Categoria
                    </TableCell>
                    <TableCell key="status" align="left">
                      Status
                    </TableCell>
                    <TableCell key="createdDate" align="left">
                      Data de Cadastro
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Array.isArray(devicesList) &&
                    devicesList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const {
                          name,
                          identification,
                          category,
                          status,
                          createdDate,
                        } = row;

                        return (
                          <TableRow hover tabIndex={-1} key={index}>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{identification}</TableCell>
                            <TableCell align="left">
                              {getCategoryString(category)}
                            </TableCell>
                            <TableCell align="left">
                              {getStatusString(status)}
                            </TableCell>
                            <TableCell align="left">
                              {createdDate.split('T')[0]}
                            </TableCell>
                            <TableCell align="right">
                              <VerticalMenu item={row} />
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
            count={devicesList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </DeviceContext.Provider>
  );
};

export { Device, DeviceContext };
