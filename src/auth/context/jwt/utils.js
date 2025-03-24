import axios from "@utils/axios";

import {  message } from 'antd';
import {paths} from "@routes/paths";


export function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const isValidToken = accessToken => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const isRequireRefresh = accessToken => {
  if (isValidToken(accessToken)) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = exp => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    message.warning('用户登录已过期', 5, () => {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('idToken');
      window.location.href = paths.auth.jwt.login;
    });
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = accessToken => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    tokenExpired(exp);
  } else {
    sessionStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
  
};

export const setAccessTokenSession = accessToken => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    // ~3 days by minimals server
    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    sessionStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export const setRefreshTokenSession = refreshToken => {
  if (refreshToken) {
    sessionStorage.setItem('refreshToken', refreshToken);
  } else {
    sessionStorage.removeItem('refreshToken');
  }
};

export const setIdTokenSession = refreshToken => {
  if (refreshToken) {
    sessionStorage.setItem('idToken', refreshToken);

    const { sub } = jwtDecode(refreshToken);
    return {
      username: sub
    }
  } else {
    sessionStorage.removeItem('idToken');
  }
};
