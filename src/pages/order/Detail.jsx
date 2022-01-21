import React, { Component } from 'react'
import {Card,Table,Button,Form,Select,Modal,message, DatePicker} from 'antd';
import axios from '../../axios';
import utils from '../../utils/utils';
import './detail.less'
const {Option} =Select;
const FormItem=Form.Item;


export default class Detail extends Component {
    state={orderInfo:{}}
    componentDidMount(){
        let orderId=this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo(orderId)
        }
    }
    getDetailInfo=(orderId)=>{
        axios.ajax({
            url:"/order/detail",
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then(res=>{
            console.log(res);
            if(res.code==="0000"){
               this.setState({
                   orderInfo:res.data
               })
               this.renderMap(res.data)
            }
        })
    }
    // 地图初始化
    renderMap=(res)=>{
        this.map=new window.BMapGL.Map("orderDetailMap");
        this.map.centerAndZoom('北京', 11);
        this.addMapControl();
        this.drawBikeRoute(res.position_list);//绘制行驶路线图
        this.drawServiceArea(res.area);//绘制服务区
    }
    //添加地图控件
    addMapControl=()=>{
        let map=this.map;
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.addControl(new window.BMapGL.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))//添加比例尺
    }
    // 绘制路线图
    drawBikeRoute=(positionList)=>{
        let map=this.map;
        let startPoint="";
        let endPoint="";
        if(positionList.length>0){
            // 上面是起点的图标
            let first=positionList[0];
            let last=positionList[positionList.length-1]
            startPoint=new window.BMapGL.Point(first.lon,first.lat);
            let startIcon=new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),
                anchor:new window.BMapGL.Size(36,42)
            })
            let startMarker=new window.BMapGL.Marker(startPoint,{icon:startIcon});
            this.map.addOverlay(startMarker);
            // 下面是终点的图标
            endPoint=new window.BMapGL.Point(last.lon,last.lat);
            let endIcon=new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),
                anchor:new window.BMapGL.Size(36,42)
            })
            let endMarker=new window.BMapGL.Marker(endPoint,{icon:endIcon});
            this.map.addOverlay(endMarker);

            // 生成路线图
            let trackPoint=[];
            for(let i=0;i<positionList.length;i++){
                let point=positionList[i];
                trackPoint.push(new window.BMapGL.Point(point.lon,point.lat));
            }
            let polyline=new window.BMapGL.Polyline(trackPoint,{
                storkeColor:"#1869AD",
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);

        }
    }

    // 绘制服务区
    drawServiceArea=(positionList)=>{
        let trackPoint=[];
        for(let i=0;i<positionList.length;i++){
            let point=positionList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon,point.lat));
        }
        let polygon=new window.BMapGL.Polyline(trackPoint,{
            strokeColor: "#CE0000",
            strokeWeight: 3,
            fillColor:"#ffffff",
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon);
    }

    render() {
        return (
            <section>
                <Card>
                    <div id='orderDetailMap' className='order-map'></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                             <li>
                                 <div className="detail-form-left">用车模式</div>
                                 <div className="detail-form-content">{this.state.orderInfo.mode==1?"停车点":"服务区模式"}</div>
                             </li>
                             <li>
                                 <div className="detail-form-left">订单编号</div>
                                 <div className="detail-form-content">{this.state.orderInfo.order_sn}</div>
                             </li>
                             <li>
                                 <div className="detail-form-left">车辆编号</div>
                                 <div className="detail-form-content">{this.state.orderInfo.bike_sn}</div>
                             </li>
                             <li>
                                 <div className="detail-form-left">用户姓名</div>
                                 <div className="detail-form-content">{this.state.orderInfo.user_name}</div>
                             </li>
                             <li>
                                 <div className="detail-form-left">手机号码</div>
                                 <div className="detail-form-content">{this.state.orderInfo.mobile}</div>
                             </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                             <li>
                                 <div className="detail-form-left">行驶起点</div>
                                 <div className="detail-form-content">{this.state.orderInfo.start_location}</div>
                             </li>
                             <li>
                                 <div className="detail-form-left">行程终点</div>
                                 <div className="detail-form-content">{this.state.orderInfo.end_location}</div>
                             </li>
                             <li>
                                 <div className="detail-form-left">行驶里程</div>
                                 <div className="detail-form-content">{this.state.orderInfo.distance/1000+"km"}</div>
                             </li>
                        </ul>
                    </div>
                </Card>
            </section>
        )
    }
}


