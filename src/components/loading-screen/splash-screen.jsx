import React from 'react';

import { motion as m } from "motion/react"

import Logo from '@components/logo/logo';

function SplashScreen() {
    return (
        <div style={{
            right: 0,
            width: '100%',
            bottom: 0,
            height: '100%',
            zIndex: 9998,
            display: 'flex',
            position: 'fixed',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#FFFFFF',
        }}>

            <>
                <m.div
                    animate={{
                        scale: [1, 0.9, 0.9, 1, 1],
                        opacity: [1, 0.48, 0.48, 1, 1],
                    }}
                    transition={{
                        duration: 2,
                        ease: 'easeInOut',
                        repeatDelay: 1,
                        repeat: Infinity,
                    }}
                >
                     <Logo disabledLink sx={{ width: 64, height: 64 }} />
                </m.div>

                <m.div
                    transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
                    animate={{
                        scale: [1.6, 1, 1, 1.6, 1.6],
                        rotate: [270, 0, 0, 270, 270],
                        opacity: [0.25, 1, 1, 1, 0.25],
                        borderRadius: ['25%', '25%', '50%', '50%', '25%'],
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        position: 'absolute',
                        border: 'solid 3px rgba(0, 120, 103, 0.24)',
                    }}
                />

                <m.div
                    animate={{
                        scale: [1, 1.2, 1.2, 1, 1],
                        rotate: [0, 270, 270, 0, 0],
                        opacity: [1, 0.25, 0.25, 0.25, 1],
                        borderRadius: ['25%', '25%', '50%', '50%', '25%'],
                    }}
                    transition={{
                        ease: 'linear',
                        duration: 3.2,
                        repeat: Infinity,
                    }}
                    style={{
                        width: 120,
                        height: 120,
                        position: 'absolute',
                        border: 'solid 8px rgba(0, 120, 103, 0.24)',
                    }}
                />
            </>
        </div>
    )
}

export default SplashScreen;
