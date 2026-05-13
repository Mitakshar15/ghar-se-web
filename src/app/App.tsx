import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { Landing } from '@/features/landing/Landing';
import { Login } from '@/features/auth/Login';
import { Otp } from '@/features/auth/Otp';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { Dashboard } from '@/features/portal/dashboard/Dashboard';
import { Orders } from '@/features/portal/orders/Orders';
import { Menu } from '@/features/portal/menu/Menu';
import { CalendarPage } from '@/features/portal/calendar/Calendar';
import { Earnings } from '@/features/portal/earnings/Earnings';
import { Reviews } from '@/features/portal/reviews/Reviews';
import { Profile } from '@/features/portal/profile/Profile';
import { Settings } from '@/features/portal/settings/Settings';
import { Help } from '@/features/portal/help/Help';
import { ToastContainer } from '@/components/feedback/Toast';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Landing />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.otp} element={<Otp />} />

        <Route
          path={ROUTES.portal}
          element={<Navigate to={ROUTES.dashboard} replace />}
        />
        <Route
          path={ROUTES.dashboard}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.orders}
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.menu}
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.calendar}
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.earnings}
          element={
            <ProtectedRoute>
              <Earnings />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.reviews}
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.settings}
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.help}
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
