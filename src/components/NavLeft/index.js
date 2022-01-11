import React, { Component } from 'react'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import menuList from './../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;
export default class NavLeft extends Component {
    render() {
        return (
            <div>
                <div className='logo'>
                    <img src='./resource/logo.svg' alt=''/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu
                    theme='dark'
                >
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
