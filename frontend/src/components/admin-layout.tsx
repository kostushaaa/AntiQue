import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/auth-context.tsx';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar maxWidth="xl" className="bg-primary-500 text-white">
        <NavbarBrand>
          <Link to="/" className="text-white flex items-center gap-2">
            <Icon icon="lucide:car" width={24} height={24} />
            <p className="logo-text text-xl">AntiQue Admin</p>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="danger" variant="flat" onPress={logout}>
              <Icon icon="lucide:log-out" className="mr-1" />
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex flex-grow">
        <aside className="w-64 bg-content1 shadow-md">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/admin/dashboard">
                  <Button 
                    className="w-full justify-start" 
                    variant={isActive('/admin/dashboard') ? 'solid' : 'flat'} 
                    color={isActive('/admin/dashboard') ? 'primary' : 'default'}
                  >
                    <Icon icon="lucide:layout-dashboard" className="mr-2" />
                    Dashboard
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/admin/rentals">
                  <Button 
                    className="w-full justify-start" 
                    variant={isActive('/admin/rentals') ? 'solid' : 'flat'} 
                    color={isActive('/admin/rentals') ? 'primary' : 'default'}
                  >
                    <Icon icon="lucide:calendar" className="mr-2" />
                    Vermietungen
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/admin/cars">
                  <Button 
                    className="w-full justify-start" 
                    variant={isActive('/admin/cars') ? 'solid' : 'flat'} 
                    color={isActive('/admin/cars') ? 'primary' : 'default'}
                  >
                    <Icon icon="lucide:car" className="mr-2" />
                    Fahrzeuge
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-grow p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;