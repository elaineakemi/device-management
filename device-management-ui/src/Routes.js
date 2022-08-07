import { Routes, Route } from 'react-router-dom';
import { Auth0ProviderWithConfig } from './auth/auth0-provider';
import { ProtectedRoute } from './auth/protected-route';
import { Logout } from './auth/logout';
import { PageLayout } from './components/layouts/PageLayout';
import { User } from './components/users/User';
import { Device } from './components/devices/Device';
import { DeviceUsage } from './components/usage/DeviceUsage';
import { Dashboard } from './components/dashboard/Dashboard';
import { History } from './components/history/History';

const AppRoutes = () => {
  return (
    <Auth0ProviderWithConfig>
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout>
              <ProtectedRoute component={Dashboard} />
            </PageLayout>
          }
        />
        <Route
          path="dashboard"
          element={
            <PageLayout>
              <ProtectedRoute component={Dashboard} />
            </PageLayout>
          }
        />
        <Route
          path="users/*"
          element={
            <PageLayout>
              <ProtectedRoute component={User} />
            </PageLayout>
          }
        />

        <Route
          path="devices/*"
          element={
            <PageLayout>
              <ProtectedRoute component={Device} />
            </PageLayout>
          }
        />

        <Route
          path="history/*"
          element={
            <PageLayout>
              <ProtectedRoute component={History} />
            </PageLayout>
          }
        />

        <Route
          path="usage"
          element={
            <PageLayout>
              <ProtectedRoute component={DeviceUsage} />
            </PageLayout>
          }
        />

        <Route path="logout" element={<ProtectedRoute component={Logout} />} />
      </Routes>
    </Auth0ProviderWithConfig>
  );
};

export { AppRoutes };
