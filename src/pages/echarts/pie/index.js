import React, { Component } from 'react'
import {Card } from 'antd';
import * as echarts from 'echarts/core';
// import echartTheme from '../echartTheme';//引入需要注册的主题
import ReactEcharts from 'echarts-for-react';
export default class Pie extends Component {
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
                formatter:'{a}<br/>{b}:{c}({d}%)'//按照模版显示提示框
            },
            legend:{
                orient:"vertical",
                right:"right"//应该设置为true就可以
            },
            series:[
                {
                    name:"订单量",
                    type:"pie",
                    data:[
                        {
                            value:1000,
                            name:"周一"
                        },
                        {
                            value:1000,
                            name:"周二"
                        },
                        {
                            value:1200,
                            name:"周三"
                        },
                        {
                            value:1400,
                            name:"周四"
                        },
                        {
                            value:1500,
                            name:"周五"
                        },
                        {
                            value:2000,
                            name:"周六"
                        },
                        {
                            value:1300,
                            name:"周日"
                        }
                    ]
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
                formatter:'{a}<br/>{b}:{c}({d}%)'//按照模版显示提示框
            },
            legend:{
                orient:"vertical",
                right:"right"//应该设置为true就可以
            },
            series:[
                {
                    name:"订单量",
                    type:"pie",
                    radius:['50%','80%'],
                    data:[
                        {
                            value:1000,
                            name:"周一"
                        },
                        {
                            value:1000,
                            name:"周二"
                        },
                        {
                            value:1200,
                            name:"周三"
                        },
                        {
                            value:1400,
                            name:"周四"
                        },
                        {
                            value:1500,
                            name:"周五"
                        },
                        {
                            value:2000,
                            name:"周六"
                        },
                        {
                            value:1300,
                            name:"周日"
                        }
                    ]
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
                formatter:'{a}<br/>{b}:{c}({d}%)'//按照模版显示提示框
            },
            legend:{
                orient:"vertical",
                right:"right"//应该设置为true就可以
            },
            series:[
                {
                    name:"订单量",
                    type:"pie",
                    data:[
                        {
                            value:1000,
                            name:"周一"
                        },
                        {
                            value:1000,
                            name:"周二"
                        },
                        {
                            value:1200,
                            name:"周三"
                        },
                        {
                            value:1400,
                            name:"周四"
                        },
                        {
                            value:1500,
                            name:"周五"
                        },
                        {
                            value:2000,
                            name:"周六"
                        },
                        {
                            value:1300,
                            name:"周日"
                        }
                    ].sort((a,b)=>{
                        return a.value-b.value;
                    }),
                    roseType:"raduis",
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <section>
                <Card title="饼形图表之一">
                    <ReactEcharts option={this.getOptions1()} theme="Imooc" style={{height:500}} />
                </Card>
                <Card title="饼形图表之二">
                    <ReactEcharts option={this.getOptions2()} theme="Imooc" style={{height:500}} />
                </Card>
                <Card title="饼形图表之三">
                    <ReactEcharts option={this.getOptions3()} theme="Imooc" style={{height:500}} />
                </Card>
            </section>
        )
    }
}
