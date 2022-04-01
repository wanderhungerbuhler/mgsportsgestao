import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

import { SignIn } from '../pages/SignIn';
import { Dashboard } from '../pages/Dashboard';
import { Flex, Heading, Spinner } from '@chakra-ui/react';

const PrivateRoute = ({ children, redirectTo }: any) => {
  const { user } = useAuth();
  return user ? children : <Navigate to={redirectTo} />
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute redirectTo="/"><Dashboard /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}
