/* eslint-disable */
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import useAuth from "../api/hooks/useAuth";

/**
 * Used to wrap protected endpoints.
 */

const RequireAuth = ({allowedRoles}) => {
  const {auth} = useAuth();
  const location = useLocation();

  return(
    auth?.user?.roles?.some(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.user
        ? <Navigate to={'/unauthorized'} state={{from: location}} replace /> // Used logged but not priviledged
        : <Navigate to={'/userAccess'} state={{from: location}} replace /> // User not logged
  );
}

export default RequireAuth;