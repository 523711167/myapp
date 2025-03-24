import React from 'react';

import MotionLazy from '@components/animate/motion-lazy';
import { useScrollToTop } from '@hooks/use-scroll-to-top';
import ProgressBar from '@components/progress-bar/progress-bar';
import { ProConfigProvider } from '@ant-design/pro-components';

import { AuthProvider } from '@auth/context/jwt/auth-provider';
import { AuthConsumer } from '@auth/context/jwt/auth-comsumer';

import Routes from "@routes/sections";

import './App.scss';


function App() {

  console.log(`

    ░░░    ░░░ 
    ▒▒▒▒  ▒▒▒▒ 
    ▒▒ ▒▒▒▒ ▒▒ 
    ▓▓  ▓▓  ▓▓ 
    ██      ██ 
      
      `)
    
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
