import React from 'react';

import MotionLazy from '@components/animate/motion-lazy';
// import Demo from '@components/demo';
import { useScrollToTop } from '@hooks/use-scroll-to-top';
import { AuthProvider } from '@auth/context/jwt/auth-provider';
import { AuthConsumer } from '@auth/context/jwt/auth-comsumer';
import ProgressBar from '@components/progress-bar/progress-bar';
import Routes from '@routes/sections/index';
import { ProConfigProvider } from '@ant-design/pro-components';

import './App.scss';

function App() {

  console.log(`

    ░░░    ░░░ 
    ▒▒▒▒  ▒▒▒▒ 
    ▒▒ ▒▒▒▒ ▒▒ 
    ▓▓  ▓▓  ▓▓ 
    ██      ██ 
      
      `);
    
  useScrollToTop();

  return (
    <AuthProvider >
      <ProConfigProvider hashed={false}>
        <MotionLazy>
          <ProgressBar />
          <AuthConsumer>
            <Routes />
          </AuthConsumer>
        </MotionLazy>
      </ProConfigProvider>
    </AuthProvider>
  );
}

export default App;
