import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CustomerLayout } from './layouts/customer-layout';
import { AdminLayout } from './layouts/admin-layout';
import { HomePage } from './pages/home';
import { CarsPage } from './pages/cars';
import { CarDetailPage } from './pages/car-detail';
import { LoginPage } from './pages/login';
import { AdminDashboard } from './pages/admin/dashboard';
import { AdminRentals } from './pages/admin/rentals';
import { AdminCars } from './pages/admin/cars';
import { AuthProvider } from './contexts/auth-context';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Switch>
        {/* Customer Routes */}
        <Route exact path="/">
          <CustomerLayout>
            <HomePage />
          </CustomerLayout>
        </Route>
        <Route exact path="/cars">
          <CustomerLayout>
            <CarsPage />
          </CustomerLayout>
        </Route>
        <Route path="/cars/:id">
          <CustomerLayout>
            <CarDetailPage />
          </CustomerLayout>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>

        {/* Admin Routes */}
        <Route exact path="/admin">
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </Route>
        <Route path="/admin/rentals">
          <AdminLayout>
            <AdminRentals />
          </AdminLayout>
        </Route>
        <Route path="/admin/cars">
          <AdminLayout>
            <AdminCars />
          </AdminLayout>
        </Route>

        {/* Fallback */}
        <Redirect to="/" />
      </Switch>
    </AuthProvider>
  );
};

export default App;