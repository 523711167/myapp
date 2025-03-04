
import { useCallback, useEffect } from 'react';
// routes
import { paths } from '@routes/paths';
import { useRouter } from '@routes/hook/use-router';
//
import { useAuthContext } from '@auth/hooks/use-auth-context';



export default function GuestGuard({ children }) {
    const router = useRouter();
  
    const { authenticated } = useAuthContext();
  
    const check = useCallback(() => {
      if (authenticated) {
        router.replace(paths.dashboard.root);
      }
    }, [authenticated, router]);
  
    useEffect(() => {
      check();
    }, [check]);
  
    return <>{children}</>;
  }