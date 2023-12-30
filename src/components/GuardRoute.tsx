import { Navigate, Outlet } from 'react-router-dom';
// import { getAuth } from 'firebase/auth';
// import { useAuthStore } from '../store/authStore';

const GuardedRoute = () => {
  const uuid = localStorage.getItem('uuid') || null;
  console.log('in gaurded route', uuid);
  return  uuid ? <Outlet /> : <Navigate to="/login" />;
};

export default GuardedRoute;
