import {useEffect, useCallback, useState} from 'react';
// routes
import {paths} from '@routes/paths';
import {useRouter} from '@routes/hook/use-router';
import {useAuthContext} from "@auth/hooks/use-auth-context";
//


// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
  // auth0: paths.auth.auth0.login,
  // amplify: paths.auth.amplify.login,
  // firebase: paths.auth.firebase.login,
};

// ----------------------------------------------------------------------

/**
 * 用于直接在浏览器访问需要认证的页面
 * 已认证
 *    正常访问
 * 没有认证
 *    回到登录页，携带returnto
 *
 * @param children
 * @returns {JSX.Element|null}
 * @constructor
 */
export default function AuthGuard({ children }) {
  const router = useRouter();

  const { authenticated, method } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({ returnTo: window.location.href }).toString();

      const loginPath = loginPaths[method];

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, method, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //首次渲染直接跳过，需要等待useEffect的执行判断
  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
