import React, { Component } from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action';
import menuList from './../../config/menuConfig'
import './index.less';

const { SubMenu } = Menu;
class NavLeft extends Component {
    state={
        currentKey:""
    }
    componentWillMount(){
        const menuTreeNode=this.renderMenu(menuList);
        let currentKey=window.location.hash.replace(/#|\?.*$/g,"");
        this.setState({menuTreeNode,currentKey})
    }

    // 处理点击事件
    handleClick=(item)=>{
        console.log(item);
        const {dispatch}=this.props;
        dispatch(switchMenu(item.item.props.title));
        console.log(item.item.props.title);
        this.setState({
            currentKey:item.key
        })
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
              <Menu.Item title={item.title}  key={item.key} >
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
                    // selectedKeys={this.state.currentKey}
                    onClick={e=>{
                        this.handleClick(e)
                    }}
                >
                    {this.state.menuTreeNode}
                    
                </Menu>
            </div>
        )
    }
}
export default connect()(NavLeft)
