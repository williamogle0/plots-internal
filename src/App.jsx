import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { createContainer } from "./container";
import { ContainerProvider } from "./modules/core/ContainerProvider.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import Amplify from 'aws-amplify';
import config from './config.js';
import { PublicRoute } from "./modules/core/PublicRoute.jsx";
import { PrivateRoute } from "./modules/core/PrivateRoute.jsx";
import Layout from "./modules/core/Layout.jsx";
import LoadingScreen from "./modules/pages/LoadingScreen.jsx";
import Login from "./modules/pages/Login.jsx";
import Home from "./modules/pages/Home.jsx";
import Dashboard from "./modules/pages/Dashboard.jsx";
import NotFound from "./modules/pages/NotFound.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure({
  ...config.aws,
});

const AppRoutes = () => {
  // State to track loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading process (e.g., fetching auth state)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Layout><LoadingScreen /></Layout>;
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout><Outlet /></Layout>}> 

          <Route path="/" element = {
            <PublicRoute>
              <Home />
            </PublicRoute>
          } />

          <Route path="/login" element={
              <PublicRoute>
                <Login />
            </PublicRoute>
            }>
          </Route>

          <Route path = "/home" element={
            <PublicRoute>
              <Home />
            </PublicRoute>
            }>
          </Route>

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound/>}></Route>

        </Route>
        
        
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  const container = createContainer(); // Initialize container

  return (
    <ContainerProvider container={container}>
      <QueryClientProvider client={container.queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </ContainerProvider>
  );
}

export default App;
