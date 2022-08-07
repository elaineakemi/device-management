import { useState, useContext, useEffect } from 'react';

import { Container, Grid, Typography } from '@mui/material';
import { Summary } from './Summary';
import { Overview } from './Overview';
import { GlobalContext } from '../layouts/PageLayout';
import { DeviceUsageService } from '../../api/DeviceUsageService';

const Dashboard = () => {
  const { userId, userRole, user } = useContext(GlobalContext);
  const [usageList, setUsageList] = useState([]);
  const { name } = user || {};

  useEffect(() => {
    const getMyUsages = async () => {
      return await DeviceUsageService.getByUserId(userId);
    };

    if (userId) {
      getMyUsages().then((response) => {
        if (response) {
          setUsageList(response.data);
        }
      });
    }
  }, [userId]);

  return (
    <Container>
      <>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bem-vindo {name}!
        </Typography>

        <Grid container spacing={3}>
          {userRole === 'admin' && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <Summary
                  title="Novos Usuários"
                  total={10}
                  icon={'ant-design:user-outlined'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Summary
                  title="Equip. em Manutenção"
                  total={12}
                  color="warning"
                  icon={'ant-design:setting-twotone'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Summary
                  title="Equip. em Uso"
                  total={350}
                  color="info"
                  icon={'ant-design:dashboard-filled'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Summary
                  title="Defeitos Reportados"
                  total={5}
                  color="error"
                  icon={'ant-design:frown-filled'}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} md={12} lg={12}>
            <Overview title="Meus Equipamentos" list={usageList} />
          </Grid>
        </Grid>
      </>
    </Container>
  );
};

export { Dashboard };
