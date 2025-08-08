import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Loader from './Loader';

export const GuardedRoute = () => {
  const { isLoggedIn, authReady } = useAuthStore();
  const location = useLocation();
  if (!authReady) return <Loader />;
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const UnauthGuard = () => {
  const { isLoggedIn, authReady } = useAuthStore();
  const location = useLocation();
  if (!authReady) return <Loader />;
  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace state={{ from: location }} />
  );
};

export default GuardedRoute;
