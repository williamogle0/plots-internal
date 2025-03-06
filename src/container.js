// src/container.js
import { QueryClient } from '@tanstack/react-query';
import { Amplify } from '@aws-amplify/core';
import { config } from './config.js';

export function createContainer() {
  const queryClient = new QueryClient(); 
  Amplify.configure({
    ...config.aws,
    Auth: {
      authenticationFlowType: "CUSTOM_AUTH",
    },
  });

  return {
    queryClient,
    amplify: Amplify,
  };
}
