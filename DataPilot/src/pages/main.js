import { Outlet } from 'react-router-dom';
// import React, { useState } from 'react';
import React from 'react';

import { Layout, theme } from 'antd';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
import { useSelector } from 'react-redux'
import CommonTag from '../components/commonTag';
import { RouterAuth } from '../router/routerAuth'


const { Content } = Layout;
const Main = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const collapsed = useSelector(state => state.tab.isCollapse)
    return (
        <RouterAuth>
            <Layout>
                <CommonAside collapsed={collapsed} />
                <Layout>
                    <CommonHeader collapsed={collapsed} />
                    <CommonTag />
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            </RouterAuth>
    );
}

export default Main;
