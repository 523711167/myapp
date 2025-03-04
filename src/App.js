import React from 'react';
import './App.scss';

import Demo from '@components/demo';
import { useScrollToTop } from '@hooks/use-scroll-to-top';
import { AuthProvider } from '@auth/context/jwt/auth-provider';
import { AuthConsumer } from '@auth/context/jwt/auth-comsumer';
import ProgressBar from '@components/progress-bar/progress-bar';

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
    <AuthProvider>
        <ProgressBar />
        <AuthConsumer>
            <Demo />
        </AuthConsumer>
    </AuthProvider>
  );
}

export default App;
