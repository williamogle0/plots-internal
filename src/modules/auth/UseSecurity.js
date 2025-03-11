import { Auth } from '@aws-amplify/auth';
import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { useContainer } from '../core/ContainerProvider';

const GET_USER_PROFILE_QUERY = gql`
  query GetMyUserProfile {
    getMyUserProfile {
      id
      name
      email
      username
      profilePhotoOriginalS3Url
      gender
      friendCount
    }
  }
`;

const useSecurity = ({ onError } = {}) => {
  const { queryClient, appsyncClient } = useContainer();

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const currentUser = await Auth.getCurrentUser().catch(() => undefined);

      if (!currentUser) {
        return {
          user: null,
          profile: null,
        };
      }

      const currentCreds = await Auth.currentUserCredentials();

      const cognitoUser = currentUser.getSignInUserSession().getIdToken().payload;

      if (!cognitoUser['cognito:groups']?.includes('admin') && !cognitoUser['cognito:groups']?.includes('manager')) {
        message.error('You are not authorized to access this page');
        await Auth.signOut();
        return null;
      }

      const user = {
        phoneNumber: cognitoUser.phone_number,
        sub: cognitoUser.sub,
        isAdmin: cognitoUser['cognito:groups']?.includes('admin'),
        isManager: cognitoUser['cognito:groups']?.includes('manager'),
        identityId: currentCreds.identityId,
      };

      if (!user.sub) {
        return {
          user: null,
          profile: null,
        };
      }

      const userData = await appsyncClient.operation({
        query: GET_USER_PROFILE_QUERY,
      });

      return {
        user,
        profile: userData.data.getMyUserProfile,
      };
    },
    enabled: false,
    staleTime: Infinity,
    onError,
  });

  const signOut = async () => {
    await Auth.signOut();
    queryClient.setQueryData(['user'], { user: null, profile: null });
  };

  const unlock = useCallback(async () => {
    const { data } = await refetch();

    return { creds: data?.user, profile: data?.profile };
  }, [refetch]);

  return {
    credentials: data?.user,
    loadCredentials: refetch,
    isLoading: isLoading,
    loadProfile: refetch,
    unlock,
    user: data?.profile,
    error,
    signOut,
  };
};

export { useSecurity };
