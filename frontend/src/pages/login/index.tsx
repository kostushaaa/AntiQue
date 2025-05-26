import React from 'react';
import { useHistory, Link as RouteLink } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Tabs, Tab, Divider } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context.tsx';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const { login, isAuthenticated } = useAuth();
  const history = useHistory();
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        // Redirect based on role (handled in auth context)
        if (username === 'admin') {
          history.push('/admin');
        } else {
          history.push('/');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <RouteLink to="/" className="inline-flex items-center gap-2">
            <div className="bg-primary-500 rounded-full p-2">
              <Icon icon="lucide:car" className="text-white text-xl" />
            </div>
            <span className="logo-text text-2xl text-secondary-500">AntiQue</span>
          </RouteLink>
        </div>
        
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-col gap-1 text-center">
            <h1 className="text-2xl font-display font-bold">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your account</p>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="Login options">
              <Tab key="login" title="Login">
                <form onSubmit={handleLogin} className="space-y-4 py-4">
                  {error && (
                    <div className="bg-danger-100 text-danger-700 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <Input
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    onValueChange={setUsername}
                    startContent={<Icon icon="lucide:user" className="text-gray-400" />}
                    isRequired
                  />
                  
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onValueChange={setPassword}
                    startContent={<Icon icon="lucide:lock" className="text-gray-400" />}
                    isRequired
                  />
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      color="primary" 
                      fullWidth
                      isLoading={isLoading}
                    >
                      Sign In
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm">
                    <p className="text-gray-500">
                      Demo accounts:
                    </p>
                    <div className="flex justify-center gap-4 mt-2">
                      <div className="bg-gray-50 p-2 rounded text-xs">
                        <div className="font-semibold">Admin</div>
                        <div>Username: admin</div>
                        <div>Password: admin123</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-xs">
                        <div className="font-semibold">Customer</div>
                        <div>Username: customer</div>
                        <div>Password: customer123</div>
                      </div>
                    </div>
                  </div>
                </form>
              </Tab>
              <Tab key="register" title="Register">
                <div className="py-8 text-center">
                  <Icon icon="lucide:user-plus" className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Create an Account</h3>
                  <p className="text-gray-600 mb-4">
                    Registration is currently available only through our customer service.
                  </p>
                  <Button 
                    color="primary" 
                    variant="flat"
                    startContent={<Icon icon="lucide:phone" />}
                  >
                    Contact Us
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
          <CardFooter className="justify-center">
            <Button 
              as={RouteLink} 
              to="/" 
              variant="light" 
              startContent={<Icon icon="lucide:arrow-left" />}
            >
              Back to Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};