// src/container.js
import { QueryClient } from '@tanstack/react-query';
import { Amplify } from '@aws-amplify/core';

export function createContainer() {
  const queryClient = new QueryClient(); // React Query for data fetching
  Amplify.configure({ /* AWS Config */ });

  return {
    queryClient, // Makes the API client available
    amplify: Amplify,
  };
}
