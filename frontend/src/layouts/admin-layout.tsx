import React from 'react';
import { Link as RouteLink, useLocation, Redirect } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context.tsx';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const location = useLocation();

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar maxWidth="xl" className="bg-secondary-900 text-white">
        <NavbarBrand>
          <RouteLink to="/admin" className="flex items-center gap-2">
            <div className="bg-primary-500 rounded-full p-2">
              <Icon icon="lucide:car" className="text-white text-xl" />
            </div>
            <p className="logo-text text-xl">AntiQue <span className="text-primary-400">Admin</span></p>
          </RouteLink>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={location.pathname === '/admin'}>
            <Link as={RouteLink} to="/admin" color="foreground">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/admin/rentals'}>
            <Link as={RouteLink} to="/admin/rentals" color="foreground">
              Rentals
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/admin/cars'}>
            <Link as={RouteLink} to="/admin/cars" color="foreground">
              Cars
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user?.username}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.username}</p>
              </DropdownItem>
              <DropdownItem key="website" onPress={() => window.location.href = '/'}>
                Go to Website
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <div className="flex flex-grow">
        <aside className="w-64 bg-secondary-800 text-white hidden md:block">
          <div className="p-4">
            <div className="mb-8">
              <p className="text-xs uppercase text-gray-400 mb-2">Main</p>
              <ul className="space-y-2">
                <li>
                  <Link 
                    as={RouteLink} 
                    to="/admin" 
                    className={`flex items-center gap-2 p-2 rounded-md ${location.pathname === '/admin' ? 'bg-primary-500' : 'hover:bg-secondary-700'}`}
                  >
                    <Icon icon="lucide:layout-dashboard" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    as={RouteLink} 
                    to="/admin/rentals" 
                    className={`flex items-center gap-2 p-2 rounded-md ${location.pathname === '/admin/rentals' ? 'bg-primary-500' : 'hover:bg-secondary-700'}`}
                  >
                    <Icon icon="lucide:calendar" />
                    <span>Rentals</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    as={RouteLink} 
                    to="/admin/cars" 
                    className={`flex items-center gap-2 p-2 rounded-md ${location.pathname === '/admin/cars' ? 'bg-primary-500' : 'hover:bg-secondary-700'}`}
                  >
                    <Icon icon="lucide:car" />
                    <span>Cars</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-400 mb-2">Management</p>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary-700">
                    <Icon icon="lucide:users" />
                    <span>Customers</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary-700">
                    <Icon icon="lucide:settings" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary-700">
                    <Icon icon="lucide:file-text" />
                    <span>Reports</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="flex-grow p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};