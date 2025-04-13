import {useCallback, useEffect, useState} from 'react';
import {throttle} from "lodash";

/**
 * 用户活动监测Hook
 */
function UseUserInactive(timeout = 1 * 20 * 1000, onInactive) {

    const [lastActivity, setLastActivity] = useState(Date.now());

    const [isActive, setIsActive] = useState(true);

    // 使用useCallback确保函数引用稳定
    // 使用节流优化
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const throttledUpdateActivity = useCallback(
        throttle(() => {
            setLastActivity(Date.now());
            setIsActive(true);
        }, 5000), []);


    useEffect(() => {

        const activityEvents = [
            'mousedown', 'mousemove', 'keypress',
            'scroll', 'touchstart', 'click', 'keydown'
        ];

        // 添加事件监听
        activityEvents.forEach(event => {
            document.addEventListener(event, throttledUpdateActivity);
        });

        // 设置检查定时器
        const checkInactivity = setInterval(() => {
            const timeNow = Date.now();

            if (timeNow - lastActivity > timeout) {
                setIsActive(false);
                if (onInactive && typeof onInactive === 'function') {
                    onInactive();
                }
            }
        }, 10000); // 每10秒检查一次

        // 清理函数
        return () => {
            activityEvents.forEach(event => {
                document.removeEventListener(event, throttledUpdateActivity);
            });
            clearInterval(checkInactivity);
        };
    }, [lastActivity, timeout, onInactive, throttledUpdateActivity])

    return isActive;

}

export default UseUserInactive;