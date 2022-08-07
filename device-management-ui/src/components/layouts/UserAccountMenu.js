import { useRef, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from '@mui/material';
import { GlobalContext } from './PageLayout';

const UserAccountMenu = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(null);

  const { user, logout } = useAuth0();
  const { name } = user || {};
  const { userRole, userPicture, userEmail: email } = useContext(GlobalContext);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const ArrowStyle = styled('span')(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      top: -7,
      zIndex: 1,
      width: 12,
      right: 20,
      height: 12,
      content: "''",
      position: 'absolute',
      borderRadius: '0 0 4px 0',
      transform: 'rotate(-135deg)',
      background: theme.palette.background.paper,
      borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
      borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    },
  }));

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={userPicture} alt="picture" />
      </IconButton>

      <Popover
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            overflow: 'inherit',
            mt: 1.5,
            ml: 0.75,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
      >
        <ArrowStyle className="arrow" />
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Role: {userRole}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export { UserAccountMenu };
