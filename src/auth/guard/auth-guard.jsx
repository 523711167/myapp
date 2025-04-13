import {useEffect, useCallback, useState} from 'react';
// routes
import {paths} from '@routes/paths';
import {useRouter} from '@routes/hook/use-router';
import {useAuthContext} from "@auth/hooks/use-auth-context";
import useUserInactive from "@hooks/use-user-inactive";
import {Modal} from "antd";
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

  const { authenticated, method, logout } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const inactive = useUserInactive(undefined, logout);

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

  return (
      <>
        <Modal title="系统提示" mask={true} open={!inactive} >
          <p>由于您长时间不活跃，已自动退出</p>
        </Modal>
        {children}
      </>
  )
}
