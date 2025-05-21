import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

interface PrivateRouteProps extends RouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children || <Route {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;