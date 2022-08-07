import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
import { NavSection } from './NavSection';
import { useResponsive } from '../hooks/useResponsive';
import { Iconify } from '../common/Iconify';
import { GlobalContext } from './PageLayout';
import { Scrollbar } from './Scrollbar';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const Sidebar = ({ isOpenSidebar, onCloseSidebar }) => {
  const { userRole } = useContext(GlobalContext);

  const { pathname } = useLocation();
  const isDesktop = useResponsive({ query: 'up', key: 'lg' });

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const navConfig = [
    {
      title: 'dashboard',
      path: '/dashboard',
      icon: <Iconify icon={'eva:pie-chart-2-fill'} width={22} height={22} />,
    },

    {
      title: 'usuários',
      path: '/users',
      icon: <Iconify icon={'eva:people-fill'} width={22} height={22} />,
      visible: userRole === 'admin',
    },
    {
      title: 'Equipamentos',
      path: '/devices',
      icon: <Iconify icon={'eva:thermometer-fill'} width={22} height={22} />,
      visible: userRole === 'admin',
    },
    {
      title: 'Empréstimo & Devolução',
      path: '/usage',
      icon: <Iconify icon={'eva:pin-fill'} width={22} height={22} />,
    },
  ];

  const renderContent = (
    <>
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{ px: 2.5, py: 3, display: 'inline-flex' }}
          component="img"
          src="./static/Logo.png"
        />

        <NavSection navConfig={navConfig} />
      </Scrollbar>
    </>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};

export { Sidebar };
