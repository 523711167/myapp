




export default function GuestGuard({ children }: GuestGuardProps) {
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