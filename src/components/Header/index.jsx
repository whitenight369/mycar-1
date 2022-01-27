import React, { Component } from 'react';
import {Row,Col} from 'antd';
import { connect } from 'react-redux';
import './index.less';
import Utils from '../../utils/utils';
import axios from 'axios';
class Header extends Component {
    componentWillMount(){
        this.setState({
            userName:"河畔一角"
        })
        // 时间
        setInterval(()=>{
            let sysTime=Utils.formateDate(new Date().getTime());
            this.setState({sysTime})
        },1000)
        
        this.getWeatherAPIDate();
        
    }
    // 获取天气
    getWeatherAPIDate(){
        let city="101010100"
            axios(
                "https://devapi.qweather.com/v7/weather/3d?location="+city+"&key=f7b02327dbcb41cebc8dd7bd82a4c2d8"
            ).then(res=>{
                if(res.status===200){
                    this.setState({
                        weather:res.data.daily[0].textDay
                    })
                }
            }).catch(e=>{
                console.log(e);
                this.setState({
                    weather:"获取天气失败"
                })
            })
    }
    render() {
        const menuType=this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType?
                        <Col span="6" className='logo-ant'  >
                            <img src='/assets/logo.svg'/>
                            <span>Imooc 通用管理系统</span>
                        </Col>:""
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎,{this.state.userName}</span>
                        <a href="#"> 退出</a>
                    </Col>
                </Row>
                {
                    menuType?"":
                    <Row className='breadcrumb'>
                    <Col span="4" className='breadcrumb-title'>
                        {this.props.menuName}
                    </Col>
                    <Col span="20" className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-detail'>{this.state.weather}</span>
                    </Col>
                </Row>
                }
                
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        menuName: state.menuName
    }
}
export default  connect(mapStateToProps)(Header);