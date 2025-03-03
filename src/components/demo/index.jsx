import React from 'react';

// 使用css module 1 class命名规则文件名+类名+随机数
// import styles from './index.module.css';

// 使用scss module 1
import styles from './index.module.scss';

function Logo() {
    return (
        // 使用css module 2
        <div className={styles.logo}>
            <h1>Logo</h1>
        </div>
    )
}

export default Logo;
