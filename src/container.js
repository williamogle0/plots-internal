// src/container.js
import { QueryClient } from '@tanstack/react-query';
import { Amplify } from '@aws-amplify/core';
import { config } from './config';

export function createContainer() {
  const queryClient = new QueryClient(); 
  Amplify.configure({...config.aws});

  return {
    queryClient,
    amplify: Amplify,
  };
}
