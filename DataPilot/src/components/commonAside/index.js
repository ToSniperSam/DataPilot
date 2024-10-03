import React from "react";
import MenuConfig from "../../config"
import * as Icon from '@ant-design/icons';
import { App, Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { selectMenuList } from '../../store/reducer/tab'

const { Sider } = Layout;

const iconToElement = (name) => React.createElement(Icon[name]);

const items = MenuConfig.map((icon) => {
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label
    };
    if (icon.children) {
        child.children = icon.children.map(item => {
            return {
                key: item.path,
                label: item.label,
                icon: iconToElement(item.icon)
            };
        });
    }
    return child;
});




const CommonAside = ({ collapsed }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const setTabsList = (val) => {
        dispatch(selectMenuList(val))
    }

    const selectMenu = (e) => {
        let data
        MenuConfig.forEach((item) => {

            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                data = item

                if (e.keyPath.length > 1) {
                    data = item.children.find((child) => {
                        return child.path === e.key
                    })
                }
            }
        })
        setTabsList({
            path: data.path,
            name: data.name,
            label: data.label
        })

        navigate(e.key)
    }

    return (
        <Sider trigger={null} collapsed={collapsed}>
            <h3 className='app-name'>{collapsed ? 'Bench' : 'ITSC System'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                items={items}
                onClick={selectMenu}
            />
        </Sider>
    );
};

export default CommonAside;
