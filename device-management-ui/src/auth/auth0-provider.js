import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithConfig = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const redirectUri = window.location.origin;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};

export { Auth0ProviderWithConfig };
