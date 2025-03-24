import React, {useState} from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {useResponsive} from "@hooks/use-responsive";
import Logo from "@components/logo/logo";


const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    }),
);

export default function DashboardLayout({ children }) {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const upMd = useResponsive('up', 'md');

    const horizontalMenu = (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
            style={{
                flex: 1,
                minWidth: 0,
            }}
        />
    )

    const siderMenu = (
        <Sider
            width={200}
            style={{
                background: colorBgContainer,
            }}
        >
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={items}
            />
        </Sider>

    )


    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >

                <div style={{
                }}>
                    <Logo/>
                </div>
                { !upMd && horizontalMenu}
            </Header>
            <Layout>
                { upMd && siderMenu }
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        items={[
                            {
                                title: 'Home',
                            },
                            {
                                title: 'List',
                            },
                            {
                                title: 'App',
                            },
                        ]}
                        style={{
                            margin: '16px 0',
                        }}
                    />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        { children }
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )

}