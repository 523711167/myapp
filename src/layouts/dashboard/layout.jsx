import React from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined, DesktopOutlined,
    MailOutlined, PieChartOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {useResponsive} from "@hooks/use-responsive";
import Logo from "@components/logo/logo";


const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        key: '1',
        icon: <PieChartOutlined />,
        label: '工作台',
    },
    {
        key: '2',
        icon: <DesktopOutlined />,
        label: 'Option 2',
    },
    {
        key: '3',
        icon: <ContainerOutlined />,
        label: 'Option 3',
    },
    {
        key: 'sub1',
        label: '订单管理',
        icon: <MailOutlined />,
        children: [
            {
                key: '5',
                label: '订单查看',
            },
            {
                key: '6',
                label: 'Option 6',
            },
            {
                key: '7',
                label: 'Option 7',
            }
        ],
    },
    {
        key: 'sub2',
        label: '系统管理',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: '9',
                label: '菜单管理',
            },
            {
                key: '10',
                label: '用户管理',
            },
            {
                key: '20',
                label: '角色管理',
            },
            {
                key: '21',
                label: '字典管理',
            },
            {
                key: 'sub3',
                label: '日志管理',
                children: [
                    {
                        key: '11',
                        label: '操作日志',
                    }
                ],
            },
        ],
    },
];

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
        <Layout style={{
            height: '100vh'
        }}>
            <Header
                style={{
                    display: 'flex',
                    // alignItem: 'center',
                }}
            >
                <Logo sx={{
                    marginTop: '12px'
                }}/>
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