import React from "react";
import ReactDOM from 'react-dom'; 
import { Button, Layout, Avatar, Dropdown, Menu } from 'antd';
import './index.css';  
import { MenuFoldOutlined, DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducer/tab'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout;

const CommonHeader = ({collapsed}) => {
    const dispatch = useDispatch()
    const setCollapsed = () => {
        dispatch(collapseMenu())
    }
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
      }

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">Personal Center</a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={logout}>Log out</a>
            </Menu.Item>
        </Menu>
    );



    return (
        <Header className="header-container">
            <Button
                type="text"
                icon={<MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    background: '#fff',
                    marginLeft: '10px' 
                }}
                onClick={setCollapsed}
            />

            <Dropdown overlay={menu} trigger={['hover']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Account <DownOutlined />
                </a>
            </Dropdown>

            <Avatar size={36} src={require("../../assets/images/Users.jpg")} />
        </Header>
    );
};

export default CommonHeader;