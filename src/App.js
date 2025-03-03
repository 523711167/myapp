import React from 'react';
import './App.scss';

import Demo from '@components/demo';
import { useScrollToTop } from '@hooks/use-scroll-to-top';

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
    <div className="App">
      <Demo />
    </div>
  );
}

export default App;
