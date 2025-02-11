import { useAuth0 } from '@auth0/auth0-react';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

// TODO: figure out how to create a proper separation between auth0 and the dev
// login.  How about creating two providers and conditionally wrapping the rest
// of the site in one or the other?
const needsDevLogin = process.env.NEXT_PUBLIC_USE_AUTH0 === 'false';

const useAuth0Session = (): {
  isAuthenticated: boolean;
  createSession: () => Promise<void>;
} => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const createSession = async () => {
    const token = await getAccessTokenSilently();
    await login(token);
  };

  return {
    isAuthenticated,
    createSession,
  };
};

export const useDevSession = (): {
  isAuthenticated: boolean;
  createSession: () => Promise<void>;
} => {
  const createSession = async () => {
    await login('fake-token');
  };

  return {
    isAuthenticated: true,
    createSession,
  };
};

const login = (token: string) =>
  fetch(new URL('/login', serverUrl).href, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

export const useSession: () => {
  isAuthenticated: boolean;
  createSession: () => Promise<void>;
} = needsDevLogin ? useDevSession : useAuth0Session;
