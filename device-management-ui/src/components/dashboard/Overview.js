import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
} from '@mui/material';

import { Iconify } from '../common/Iconify';

const Overview = ({ title, list }) => {
  return (
    <Card>
      <CardHeader title={title} subheader="" />

      <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {Array.isArray(list) &&
          list.map((item) => {
            const {
              id,
              identification,
              deviceLocation,
              usageType,
              createdDate,
            } = item;
            return (
              <Stack key={id} direction="row" alignItems="center" spacing={2}>
                <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                  <Link
                    color="inherit"
                    variant="subtitle2"
                    underline="hover"
                    noWrap
                  >
                    {identification}
                  </Link>

                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                    noWrap
                  >
                    {deviceLocation}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
                >
                  {usageType === 0 ? 'Empréstimo' : 'Devolução'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
                >
                  {createdDate && createdDate.split('T')[0]}
                </Typography>
              </Stack>
            );
          })}
      </Stack>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          component={RouterLink}
          to="/usage"
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          Ver mais
        </Button>
      </Box>
    </Card>
  );
};

export { Overview };
