// src/container.js
import { QueryClient } from '@tanstack/react-query';
import { Amplify } from '@aws-amplify/core';
import { config } from './config.js';

export function createContainer() {
  const queryClient = new QueryClient(); // React Query for data fetching
  Amplify.configure({
    ...config.aws,
  });

  return {
    queryClient, // Makes the API client available
    amplify: Amplify,
  };
}
