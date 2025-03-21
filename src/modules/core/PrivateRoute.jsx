import { Navigate } from 'react-router-dom';
import { useSecurity } from '../auth/UseSecurity';

const PrivateRoute = ({ children }) => {
  const { user } = useSecurity();

  // if (user) {
    return children;
  // }

  return <Navigate to="/login" />;
};

export { PrivateRoute };
