
import { AuthContext } from '@auth/context/jwt/auth-context';

export function AuthConsumer({ children }) {
    return (
      <AuthContext.Consumer>
        { auth => (auth.loading ? <SplashScreen /> : children)}
      </AuthContext.Consumer>
    );
}