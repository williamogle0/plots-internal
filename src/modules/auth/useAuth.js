import { useSecurity } from './UseSecurity';
import { Auth } from '@aws-amplify/auth';
import { message } from 'antd';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';

const authIntentAtom = atom(null);

const useAuth = ({ onSignIn, onSignInError, onAuthenticated } = {}) => {
    const [authIntent, setAuthIntent] = useAtom(authIntentAtom);
    const [isLoading, setLoading] = useState(false);
    const { unlock } = useSecurity();
    const retry = useRef(null); 
  
    const signIn = useCallback(
      async (phoneNumber) => {
        setLoading(true);
        try {
          const result = await Auth.signIn(phoneNumber);
          setAuthIntent(result);
          if (onSignIn) await onSignIn(result);
        } catch (err) {
          if (onSignInError) await onSignInError(err);
          message.error(err.message);
        } finally {
          setLoading(false);
        }
      },
      [onSignIn, onSignInError, setAuthIntent]
    );

  const verifyCode = useCallback(
    async (verifyCode) => {
      setLoading(true);
      try {
        const check = await Auth.sendCustomChallengeAnswer(authIntent, verifyCode);
        if (check.signInUserSession !== null) {
          const { profile, creds } = await unlock();

          onAuthenticated(profile, creds);
        } else {
          message.error('OTP is wrong');
        }
      } catch (err) {
        message.error(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [authIntent, onAuthenticated, unlock, setLoading],
  );

  const sendCode = useCallback(
    async (phoneNumber) => {
      signIn(phoneNumber);
    },
    [signIn],
  );

  useEffect(() => {
    if (retry.current) {
      return;
    }

    retry.current = sendCode;
  }, [sendCode]);

  return { verifyCode, sendCode, isLoading };
};

const AuthMethod = {
  SIGN_IN: 'signin',
}

export { useAuth, AuthMethod };
