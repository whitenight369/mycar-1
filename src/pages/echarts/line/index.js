import React, { Component } from 'react'
import {Card } from 'antd';
import * as echarts from 'echarts/core';
// import echartTheme from '../echartTheme';//引入需要注册的主题
import ReactEcharts from 'echarts-for-react';
export default class Line extends Component {
    // componentWillMount(){ //主题注册
    //     echarts.registerTheme('Imooc',echartTheme);
    // }

    getOptions1=()=>{
        let option={
            title:{
                text:"用户骑行订单"
            },
            tooltip:{
                trigger:'item',
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
                    type:"line",
                    data:[1300,1400,1800,3000,2000,1500,1300]
                }
            ]
        }
        return option;
    }

    getOptions2(){
        let option={
            title:{
                text:"用户骑行订单"
            },
            tooltip:{
                trigger:'item',
            },
            xAxis:{
                data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
            },
            yAxis:{
                type:"value"
            },
            legend:{
                top:"10px"
            },
            series:[
                {
                    name:"OFO",
                    type:"line",
                    data:[2500,1400,1800,3000,2000,1500,5000]
                },
                {
                    name:"小蓝",
                    type:"line",
                    data:[2000,1400,1500,3000,5000,1500,1300]
                },
                {
                    name:"摩拜",
                    type:"line",
                    data:[3500,1400,1800,5000,2000,1500,1300]
                }
            ]
        }
        return option;
    }

    getOptions3(){
        let option={
            title:{
                text:"用户骑行订单"
            },
            tooltip:{
                trigger:'item',
            },
            xAxis:{
                boundaryGap: false,//刻度留白
                data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
            },
            yAxis:{
                type:"value"
            },
            series:[
                {
                    name:"订单量",
                    type:"line",
                    data:[1300,1400,1800,3000,2000,1500,1300],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <section>
                <Card title="折线图表之一">
                    <ReactEcharts option={this.getOptions1()} theme="Imooc" style={{height:500}} />
                </Card>
                <Card title="折线图表之二">
                    <ReactEcharts option={this.getOptions2()} theme="Imooc" style={{height:500}} />
                </Card>
                <Card title="折线图表之三">
                    <ReactEcharts option={this.getOptions3()} theme="Imooc" style={{height:500}} />
                </Card>
            </section>
        )
    }
}
