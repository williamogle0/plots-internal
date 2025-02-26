import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createContainer } from "./container";
import { ContainerProvider } from "./modules/core/ContainerProvider.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { PublicRoute } from "./modules/core/PublicRoute.jsx";
import { PrivateRoute } from "./modules/core/PrivateRoute.jsx";
import Layout from "antd/es/layout/layout.js";
import LoadingScreen from "./pages/LoadingScreen";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

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
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
          }> 
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        <Route path="*" element={<Layout><NotFound /></Layout>} />
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
