

const ROOTS = {
    AUTH: '/auth',
    DASHBOARD: '/dashboard',
  };

  
  export const paths = {
    minimalUI: '',
    // AUTH
    auth: {
      jwt: {
        login: `${ROOTS.AUTH}/jwt/login`,
        register: `${ROOTS.AUTH}/jwt/register`,
      },
    },
    // DASHBOARD
    dashboard: {
      root: ROOTS.DASHBOARD,
      user: `${ROOTS.DASHBOARD}/user`,
      group: {
        root: `${ROOTS.DASHBOARD}/group`,
        five: `${ROOTS.DASHBOARD}/group/five`,
        six: `${ROOTS.DASHBOARD}/group/six`,
      },
    },
  };