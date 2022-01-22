import React, { Component } from 'react'
import {Card,Table,Button,Form,Select,Modal,message, DatePicker} from 'antd';
import axios from '../../axios';
import utils from '../../utils/utils';
import BaseForm from './../../components/BaseForm'
import ETable from '../../components/ETable';
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
        field:"city",
        placeholder:"全部",
        initialValue:1,
        width:120,
        list:[{id:0,name:"全部"},{id:1,name:"北京市"},{id:2,name:"天津市"},{id:3,name:"上海市"}]
      },
      {
        type:"时间查询",
      },
      {
        type:"SELECT",
        label:"订单状态",
        field:"status",
        placeholder:"全部",
        initialValue:1,
        width:120,
        list:[{id:0,name:"全部"},{id:1,name:"进行中"},{id:2,name:"已完成"}]
      }
    ]

    componentDidMount(){
        this.request()
    }

    handleFilter=(params)=>{
          this.params=params;
          this.request()
    }


    // 默认请求接口数据
    request=()=>{
        let _this=this;
        axios.requestList(this,'/order/list',this.params,true)
        // axios.ajax({
        //     url:"/order/list",
        //     data:{
        //         params:this.params
        //     }
        // }).then(res=>{
        //     if(res.code==="0000"){
        //       let list=res.data.list.map((value,index)=>{
        //         value.key=index;
        //         return value;
        //       }),
        //         this.setState({
        //             list,
        //             pagination:utils.pagination(res,current=>{
        //                 _this.params.page=current;
        //                 _this.request();
        //             })
        //         })
        //     }
        // })
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
          console.log(this.state.selectedRowKeys);
        return (
            <section>
               <Card>
                <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
               </Card>
               <Card style={{marginTop:10}}>
                    <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
               </Card>
               <div className='content-wrap'>
                    <ETable
                      selectedIds={this.state.selectedIds}
                      selectedItem={this.state.selectedItem}
                      rowSelection={rowSelection}
                      columns={columns}
                      updateSelectedItem={utils.updateSelectedItem.bind(this)}
                      dataSource={this.state.list}
                      selectedRowKeys={this.state.selectedRowKeys}
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


