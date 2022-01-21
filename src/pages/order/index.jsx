import React, { Component } from 'react'
import {Card,Table,Button,Form,Select,Modal,message, DatePicker} from 'antd';
import axios from '../../axios';
import utils from '../../utils/utils';
const {Option} =Select;
const FormItem=Form.Item;
export default class Order extends Component {
    state={orderConfirmVisible:false,orderInfo:{}}

    params={
        page:1
    }

    formList=[
      {
        type:"SELECT",
        label:"城市",
        placeholder:"全部",
        initialValue:1,
        list:[{id:0,name:"全部"},{id:1,name:"北京市"},{id:2,name:"天津市"},{id:3,name:"上海市"}]
      }
    ]

    componentDidMount(){
        this.request()
    }
    // 默认请求接口数据
    request=()=>{
        let _this=this;
        axios.ajax({
            url:"/order/list",
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then(res=>{
            if(res.code==="0000"){
                this.setState({
                    list:res.data.list.map((value,index)=>{
                      value.key=index;
                      return value;
                    }),
                    pagination:utils.pagination(res,current=>{
                        _this.params.page=current;
                        _this.request();
                    })
                })
            }
        })
    }
    // 结束订单
    handleConfirm=()=>{
      let item=this.state.selectedItem;
      if(!item){Modal.info({title:"信息",content:"请选择一条订单进行结束"}); return ;}
      axios.ajax({
        url:"/order/ebike_info",
        data:{
          params:{
            orderId:item.id
          }
        }
      }).then((res)=>{
        if(res.code==="0000"){
          this.setState({
            orderInfo:res.data.list,
            orderConfirmVisible:true
          })
        }
      })   
    }
    //结束订单确认 
    onhandleFinishOrder=()=>{
      axios.ajax({
        url:"/order/finishOrder",
        data:{
          params:1
        }
      }).then((res)=>{
        if(res.code==="0000"){
          this.setState({
            orderConfirmVisible:false
          })
          message.success("订单结束成功");
          this.request()
        }
      }) 
    }
    // 每一行的点击事件
    onRowClick=(value,index)=>{
      //record是点击行数的dom节点
      let selectKey=[index];//保存点击行数的索引
      this.setState({
          selectedRowKeys:selectKey,
          selectedItem:value
      })
    }
    // 订单详情
    openOrderDetail=()=>{
      let item=this.state.selectedItem;
      if(!item){Modal.info({title:"信息",content:"请先选择一条订单"}); return ;}
      window.open(`/#/common/order/detail/${item.id}`,'_blank');
    }
    render() {
        const columns = [{
            title: '订单编号', 
            dataIndex: "order_sn"
          }, {
            title: '车辆编号',
            dataIndex: "bike_sn"
          }, {
            title: '用户名',
            dataIndex: "user_name"
          }, {
            title: '手机号',
            dataIndex: "mobile"
          }, {
            title: '里程',
            dataIndex: "distance",
            render(distance) {
              return distance / 1000 + 'km';
            }
          }, {
            title: '行驶时长',
            dataIndex: "total_time"
          }, {
            title: '状态',
            dataIndex: "status",
            render(status) {
              return status === 1 ? "进行中" : "结束行程"
            }
          }, {
            title: '开始时间',
            dataIndex: "start_time"
          }, {
            title: '结束时间',
            dataIndex: "end_time"
          }, {
            title: '订单金额',
            dataIndex: "total_fee"
          }, {
            title: '实付金额',
            dataIndex: "user_pay"
          }]
          const formItemLayout={
              labelCol:{span:5},
              wrapperCol:{span5:19}
          }
          const rowSelection={
            type:"radio",
            selectedRowKeys: this.state.selectedRowKeys, 
          }
        return (
            <section>
               <Card>
                <FilterForm/>
               </Card>
               <Card style={{marginTop:10}}>
                    <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
               </Card>
               <div className='content-wrap'>
                <Table
                        rowSelection={rowSelection}
                        onRow={(value,index)=>{
                          return {
                            onClick:()=>this.onRowClick(value,index)
                          }
                        }}
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
               </div>
               <Modal  
                title="结束订单"
                visible={this.state.orderConfirmVisible}
                onCancel={()=>{
                  this.setState({
                    orderConfirmVisible:false
                  })
                }}
                onOk={this.onhandleFinishOrder}
                width={600}
               >
                 <Form layout='horizontal'>
                   <FormItem label="车辆编号" {...formItemLayout}>{this.state.orderInfo.bike_sn}</FormItem>
                   <FormItem label="剩余电量" {...formItemLayout}>{this.state.orderInfo.battery+"%"}</FormItem>
                   <FormItem label="开始时间" {...formItemLayout}>{this.state.orderInfo.start_time}</FormItem>
                   <FormItem label="当前位置" {...formItemLayout}>{this.state.orderInfo.location}</FormItem>
                 </Form>
               </Modal>
            </section>
        )
    }
}

class FilterForm extends Component{
    render(){
        return (
            <Form layout='inline'>
                <FormItem label="城市">
                    <Select placeholder="请选择" style={{width:100}}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="订单时间"  >
                    <DatePicker showTime name="start_time" />
                </FormItem>
                <FormItem>
                    <DatePicker showTime style={{marginLeft:10}} name="end_time" />
                </FormItem>
                <FormItem label="订单状态" >
                    <Select placeholder="全部" style={{width:120}} >
                        <Option value="">全部</Option>
                        <Option value="2">进行中</Option>
                        <Option value="3">结束行程</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type='primary' style={{margin:"0px 20px"}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
