import React from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context.tsx';

export const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const history = useHistory();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar maxWidth="xl" className="bg-secondary-500 text-white">
        <NavbarBrand>
          <RouteLink to="/" className="flex items-center gap-2">
            <div className="bg-primary-500 rounded-full p-2">
              <Icon icon="lucide:car" className="text-white text-xl" />
            </div>
            <p className="logo-text text-xl">AntiQue</p>
          </RouteLink>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link as={RouteLink} to="/" color="foreground">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link as={RouteLink} to="/cars" color="foreground">
              Our Cars
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {isAuthenticated ? (
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
         {user?.role === 'admin' ? (
                  <DropdownItem key="admin" onPress={() => history.push('/admin')}>
                    Admin Dashboard
                  </DropdownItem>
                ) : null}
                <DropdownItem key="logout" color="danger" onPress={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Button as={RouteLink} to="/login" color="primary" variant="solid">
                Login
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-secondary-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-display mb-4">AntiQue Car Rental</h3>
              <p className="text-sm">
                Hier ist jedes Fahrzeug älter als Ihr Führerschein
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Link href="#" aria-label="Facebook">
                  <Icon icon="logos:facebook" className="text-xl" />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Icon icon="logos:instagram-icon" className="text-xl" />
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Icon icon="logos:twitter" className="text-xl" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display mb-4">Contact</h3>
              <p className="flex items-center gap-2 mb-2">
                <Icon icon="lucide:phone" />
                <span>0132-47110815</span>
              </p>
              <p className="flex items-center gap-2 mb-2">
                <Icon icon="lucide:mail" />
                <span>cheffe@antique.car</span>
              </p>
              <p className="flex items-center gap-2">
                <Icon icon="lucide:globe" />
                <span>www.antique.car</span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-display mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  Vermietung
                </li>
                <li>
                  Fahrdienst
                </li>
                <li>
                  Ankauf
                </li>
                <li>
                  Verkauf
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} AntiQue Fahrzeugvermietung. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};