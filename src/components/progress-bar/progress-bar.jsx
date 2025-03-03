import { useMemo, useEffect } from 'react';

import NProgress from 'nprogress';

import 'nprogress/nprogress.css';


function ProgressBar() {

    NProgress.configure({ showSpinner: false, minimum: 0.3 });

    useMemo(() => {
        NProgress.start();
     }, []);
   
     useEffect(() => {
        NProgress.done(); 
     }, []);

    return (<></>)
}

export default ProgressBar;
