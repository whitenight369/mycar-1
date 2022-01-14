import React, { Component } from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import menuList from './../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;
export default class NavLeft extends Component {
    componentWillMount(){
        const menuTreeNode=this.renderMenu(menuList);
        this.setState({menuTreeNode})
    }
    renderMenu=(data)=>{
            return data.map(item=>{
            if(item.children){
                return (
                    //有子节点说明是主菜单 返回一个主菜单 然后再调用renderMenu去输出二级菜单
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }else{
                // 没有子菜单证明是二级菜单 直接输出DOM就ok
              return  (
              <Menu.Item title={item.title} key={item.key} >
                  <NavLink to={item.key}>{item.title}</NavLink>
                  {/* {item.title} */}
              </Menu.Item>)
            }
        })
    }
    render() {
        return (
            <div>
                <div className='logo'>
                    <img src='./assets/logo.svg' alt=''/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu
                    theme='dark'
                >
                    {this.state.menuTreeNode}
                    
                </Menu>
            </div>
        )
    }
}
