
import { AuthContext } from '@auth/context/jwt/auth-context';
import SplashScreen from '@components/loading-screen/splash-screen';

export function AuthConsumer({ children }) {
    return (
      <AuthContext.Consumer>
        { auth => (auth.loading ? <SplashScreen /> : children)}
      </AuthContext.Consumer>
    );
}