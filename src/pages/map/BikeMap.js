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
        let list=res.data.route_list;
        this.map=new window.BMapGL.Map("container");
        let gps1=list[0].split(",");
        let gps2=list[list.length-1].split(",");
        let startPoint=new window.BMapGL.Point(gps1[0],gps1[1]);
        let endPoint=new window.BMapGL.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint,11);
        let startPointIcon=new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        let startMarker=new window.BMapGL.Marker(startPoint,{icon:startPointIcon});
        this.map.addOverlay(startMarker);
        let endPointIcon=new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
          imageSize:new window.BMapGL.Size(36,42),
          anchor:new window.BMapGL.Size(18,42)  
        })
        let endMarker=new window.BMapGL.Marker(endPoint,{icon:endPointIcon});
        this.map.addOverlay(endMarker);
        // 绘制路线图
        let routeList=[];
        list.map(item=>{
            let p=item.split(",");
            routeList.push(new window.BMapGL.Point(p[0],p[1]));
            return routeList;
        })
        let Polyline=new window.BMapGL.Polyline(routeList,{
            strokeColor:"#ef4136",
            strokeWeight:2
        })
        this.map.addOverlay(Polyline);
        // 绘制服务区
        let servicePointList=[];
        let serviceList=res.data.service_list;
        serviceList.map(item=>{
            servicePointList.push(new window.BMapGL.Point(item.lon,item.lat));
            return servicePointList;
        })
        // 服务区边框
        // let polyServiceLine=new window.BMapGL.Polyline(servicePointList,{
        //     strokeColor:"#ef4136",
        //     strokeWeight:2,
        //     fillColor:"#ff8605"
        // })
        // this.map.addOverlay(polyServiceLine);
        let polygon=new window.BMapGL.Polygon(servicePointList,{
            strokeColor:"#ce0000",
            strokeWeight:3,
            fillColor:"#ff8605",
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon)
        // 添加自行车图标
        let bikeList=res.data.bike_list;
        let bikeIcon=new window.BMapGL.Icon("/assets/bike.jpg",new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(36,42)//控制偏移量
        })
        bikeList.map(item=>{
            let p=item.split(",");
            let point=new window.BMapGL.Point(p[0],p[1]);
            let bikeMarker=new window.BMapGL.Marker(point,{icon:bikeIcon});
            this.map.addOverlay(bikeMarker);
        })

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
