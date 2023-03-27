import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function requireAuth(WrappedComponent) {
  function Authenticated(props) {
    const router = useRouter();

    useEffect(() => {
      // check if there is a token in local storage
      const token = localStorage.getItem('token');

      // if there is no token, redirect to the login page
      if (!token || token === undefined && router.pathname !== '/pages/login') {
        router.push('/pages/login');
      }
    }, [router.pathname]);

    // if the user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  }

  // set the display name for the HOC
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  Authenticated.displayName = `requireAuth(${displayName})`;

  return Authenticated;
}