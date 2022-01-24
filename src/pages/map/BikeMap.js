import React, { Component } from 'react'
import { Card, Form } from 'antd';
import axios from './../../axios';
import BaseForm from '../../components/BaseForm';

export default class BikeMap extends Component {
    state={}
    map={}
    formList=[
        {
            type:"城市"
        },{
            type:"时间查询",
            label:"订单时间"
        },{
            type:"SELECT",
            label:"订单状态",
            field:"order_status",
            placeholder:"全部",
            initialValue:"0",
            list:[{id:"0",name:"全部"},{id:"1",name:"进行中"},{id:"2",name:"行程结束"}],
            width:120
        }
    ]
    // 查询功能
    handleFilterSubmit =(filterParams)=>{
        this.params=filterParams;
        this.request()
    }
    // 查询数据
    request=()=>{
        axios.ajax({
            url:"/map/bike_list",
            data:{
                params:this.params
            }
        }).then(res=>{
            console.log("res",res);
            if(res.code=="0"){
                this.setState({
                    total:res.data.total
                })
                this.renderMap(res);
            }
        })
    }
    // 渲染地图
    renderMap=(res)=>{

    }
    componentDidMount(){
        this.request()
    }

    render() {
        return (
            <section>
                {/* 查询区域 */}
                <Card>
                    <BaseForm formList={this.formList}  filterSubmit={this.handleFilterSubmit}/>
                </Card>
                {/* 地图区域 */}
                <Card style={{marginTop:10}}>
                    <div>共有{this.state.total}辆车 </div>
                    <div id='container' style={{height:500}}></div>
                </Card>
            </section>
        )
    }
}
