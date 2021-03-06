import React, { Component } from 'react'
import {Card } from 'antd';
// import echarts from 'echarts';
import * as echarts from 'echarts/core';
// import { BarChart } from 'echarts/charts';
// import 'echarts/lib/component/title';
// import echartTheme from '../echartTheme';//引入需要注册的主题
import ReactEcharts from 'echarts-for-react';
export default class Bar extends Component {
    // componentWillMount(){ //主题注册
    //     echarts.registerTheme('Imooc',echartTheme);
    // }

    getOptions1=()=>{
        let option={
            title:{
                text:"用户骑行订单",
            },
            tooltip:{
                trigger:"axis"
            },
            xAxis:{
                data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
            },
            yAxis:{
                type:"value"
            },
            series:[
                {
                    name:"订单量",
                    type:"bar",
                    data:[1300,1400,1800,3000,2000,1500,1300]
                }
            ]
        }
        return option;
    }

    getOptions2(){
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [2000,3000,5500,7000,8000,12000,20000]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1500,3000,4500,6000,8000,10000,15000]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [1000,2000,2500,4000,6000,7000,8000]
                },
            ]
        }
        return option;
    }

    render() {
        return (
            <section>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOptions1()} theme="Imooc" style={{height:500}} />
                </Card>
                <Card title="柱形图表之二">
                    <ReactEcharts option={this.getOptions2()} theme="Imooc" style={{height:500}} />
                </Card>
            </section>
        )
    }
}
