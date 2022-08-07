import { useState, createContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { DeviceService } from '../../api/DeviceService';
import { DeviceUsageService } from '../../api/DeviceUsageService';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const GlobalContext = createContext();

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const PageLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { getAccessTokenSilently, user } = useAuth0();

  const [accessToken, setAccessToken] = useState();
  const [userRole, setUserRole] = useState();
  const [userId, setUserId] = useState();
  const [userPicture, setUserPicture] = useState();
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user',
      });

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const {
        user_metadata: { role, userId, picture, email },
      } = await metadataResponse.json();

      setUserRole(role);
      setUserId(userId);
      setUserPicture(picture);
      setUserEmail(email);
    };

    const getAccessTokenForApi = async () => {
      const accesTokenForApi = await getAccessTokenSilently();
      setAccessToken(accesTokenForApi);
      DeviceService.setAccessToken(accesTokenForApi);
      DeviceUsageService.setAccessToken(accesTokenForApi);
    };

    if (user?.sub) {
      getUserMetadata();
    }
    getAccessTokenForApi();
  }, [user?.sub]);

  const globalContext = {
    accessToken,
    userRole,
    userId,
    userPicture,
    userEmail,
    user,
  };

  return (
    <GlobalContext.Provider value={globalContext}>
      <RootStyle>
        <Navbar onOpenSidebar={() => setOpen(true)} />
        <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle>{children}</MainStyle>
      </RootStyle>
    </GlobalContext.Provider>
  );
};

export { PageLayout, GlobalContext };
