import { Navigate } from 'react-router-dom';
import { useSecurity } from '../auth/UseSecurity';

const PublicRoute = ({ children }) => {
  const { user } = useSecurity();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export { PublicRoute };