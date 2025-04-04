import {LoginForm, ProFormCheckbox, ProFormText, setAlpha} from "@ant-design/pro-components";
import {Alert, Space, Tabs, theme} from "antd";
import {
    AlipayCircleOutlined,
    LockOutlined, TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined
} from "@ant-design/icons";
import {useResponsive} from "@hooks/use-responsive";
import {useState} from "react";
import {useAuthContext} from "@auth/hooks/use-auth-context";
import {useSearchParams} from "@routes/hook/use-search-params";
import {PATH_AFTER_LOGIN} from "@/config-global";


function Login({ sx }) {

    const {token} = theme.useToken();
    const { login } = useAuthContext();
    const [loginType, setLoginType] = useState('account');
    const upMd = useResponsive('up', 'md');
    const [errorMsg, setErrorMsg] = useState('');
    const searchParams = useSearchParams();

    const returnTo = searchParams.get('returnTo');

    const iconStyles = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };

    const containerStyle = {
        flex: '2',
        backgroundColor: token.colorBgContainer,
        padding: upMd ? '200px 90px' : '100px 5px',
        ...sx
    }

    const onFinish = async record => {
        try {
            await login?.(record);
            window.location.href = returnTo || PATH_AFTER_LOGIN;
        } catch (error) {
            console.error(error)
            setErrorMsg(typeof error === 'string' ? error : error.message);
        }
    }

    return (
        <div style={containerStyle}>
            <LoginForm
                initialValues={{
                    username: 'admin',
                    password: '123'
                }}
                message={(
                    errorMsg && <Alert
                        showIcon
                        message={errorMsg}
                        type="warning"
                        closable
                        onClose={() => setErrorMsg("")}
                    />
                )}
                onFinish={onFinish}
                title="拼叨叨的个人项目"
                actions={
                    <Space>
                        其他登录方式
                        <AlipayCircleOutlined style={iconStyles}/>
                        <TaobaoCircleOutlined style={iconStyles}/>
                        <WeiboCircleOutlined style={iconStyles}/>
                    </Space>
                }
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey)}
                >
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
                    <Tabs.TabPane disabled key={'phone'} tab={'手机号登录'}/>
                </Tabs>

                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'}/>,
                    }}
                    placeholder={'用户名: 123'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'}/>,
                        strengthText:
                            '密码需要数字、字母、特殊字符，最少8位',
                        statusRender: (value) => {
                            const getStatus = () => {
                                if (value && value.length > 12) {
                                    return 'ok';
                                }
                                if (value && value.length > 6) {
                                    return 'pass';
                                }
                                return 'poor';
                            };
                            const status = getStatus();
                            if (status === 'pass') {
                                return (
                                    <div style={{color: token.colorWarning}}>
                                        强度：中
                                    </div>
                                );
                            }
                            if (status === 'ok') {
                                return (
                                    <div style={{color: token.colorSuccess}}>
                                        强度：强
                                    </div>
                                );
                            }
                            return (
                                <div style={{color: token.colorError}}>强度：弱</div>
                            );
                        },
                    }}
                    placeholder={'密码: 123'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />

                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                </div>
            </LoginForm>
        </div>
    )
}

export default Login