import React from 'react';

import { Flex, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import { useResponsive } from '@/hooks/use-responsive';
import Logo from '@/components/logo/logo';

import illustrationDashboard from '@/assets/illustrations/illustration_dashboard.png';

import { paths } from '@routes/paths';

import { ReactComponent as IcJwt } from '@assets/icons/auth/ic_jwt.svg';
import { ReactComponent as Icfirebase } from '@assets/icons/auth/ic_firebase.svg';
import { ReactComponent as Auth0 } from '@assets/icons/auth/ic_auth0.svg';

const METHODS = [
  {
    id: 'jwt',
    label: 'Jwt',
    path: paths.auth.jwt.login,
    icon: IcJwt,
  },
  {
    id: 'wx',
    label: 'wx',
    path: paths.auth.jwt.login,
    icon: Icfirebase,
  },
  {
    id: 'github',
    label: 'github',
    path: paths.auth.jwt.login,
    icon: Auth0,
  },
];

function AuthClassicLayout({ children }) {

  const upMd = useResponsive('up', 'md');
  console.log('upMd', upMd);

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        margin: upMd ? '20px' : '40px',
      }}
    />
  );

  const renderContent = (
    <Flex vertical flex={2} justify='space-around' align='center'>

        <p style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1677ff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          letterSpacing: '2px'
        }}>欢迎来到回来</p>
   
        <img
          src={illustrationDashboard}
          alt="后台管理系统"
          style={{
            width: '720px'
          }} 
        />
  
      <Flex justify='center' gap={10}>
        {METHODS.map(method => (
          <Tooltip key={method.id} title={method.label}>
            <Link to={method.path}>
              <method.icon />
            </Link>
          </Tooltip>
        ))}
      </Flex>
    </Flex >
  )

  return (
      <Flex justify='flex-start' style={{ height: '100vh' }}>
        {renderLogo}
        
        {upMd && renderContent}

        {children && React.cloneElement(children, { sx: { flex: '1', minWidth: '480px' } })}
      </Flex >
  )
}   

export default AuthClassicLayout;

