import React, { Component } from 'react';
import {Card,Button,message,Modal,Table} from 'antd';
import axios from './../../axios/index';
import utils from '../../utils/utils';
export default class Basic extends Component {
    state={}
    componentDidMount(){
        const dataSource=[
            {id:"tom",userName:"hhh",sex:"男",state:"1",interest:"打篮球",birthday:"2000-09-24",time:"07:00"},
            {id:"susan",userName:"hhh",sex:"男",state:"1",interest:"打篮球",birthday:"2000-09-24",time:"07:00"},
            {id:"jarry",userName:"hhh",sex:"男",state:"1",interest:"打篮球",birthday:"2000-09-24",time:"07:00"},
            {id:"petter",userName:"hhh",sex:"男",state:"1",interest:"打篮球",birthday:"2000-09-24",time:"07:00"}
        ]
        dataSource.map((value,index)=>{
            value.key=index;
        })
        this.setState({dataSource})
        this.request()
    } 

    params={
        page:1//默认的页码是1
    }

    request=()=>{
        let _this=this;
        axios.ajax({
            url:"/table/basic",
            data:{
                params:{
                    page:this.params.page//后台的接口需要这个数据
                },
            }
        }).then(res=>{
            this.setState({
                dataSource1:res.data.list,
                selectedRowKeys:null,
                selectedRows:[],
                pagination:utils.pagination(res,current=>{//修改this上面的页码 然后根据这个页码从新取数据 下面的request就是从新取数据的过程  后台根据page来给数据
                    _this.params.page=current;
                    this.request();
                }),
                dataSource2:res.data.list
            })
        })
    }

    onRowClick=(record,index)=>{
        //record是点击行数的dom节点
        let selectKey=[index];//保存点击行数的索引
        console.log(record);
        Modal.info({
            title:"信息",
            content:`用户名:${record.userName}`

        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }

    // 删除选中框
    handleDelete=()=>{
        let rows=this.state.selectedRows;
        let ids=[];
        rows.map(item=>{
            ids.push(item.id);
        })
        Modal.confirm({
            title:"提示",
            content:`您确定删除吗?${ids.join(",")}`,
            onOk:()=>{
                console.log(ids);
                message.success('删除成功');
                this.request();
            }
        })
    }

    render() {
        const columns=[
            {title:"id",dataIndex:"id"},
            {title:"用户名",dataIndex:"userName"},
            {title:"性别",dataIndex:"sex",render(state){return state==1?"男":"女"}},
            {title:"昵称",dataIndex:"state",
                render(state){
                    let config={
                        "1":"还能说晚安吗",
                        "2":"别再贩卖黄昏了",
                        "3":"你携秋水揽星河",
                        "4":"可惜我只是文字",
                        "5":"不然还能拥抱你"
                    }
                    return config[state]
                }
            },
            {title:"爱好",dataIndex:"interest"},
            {title:"生日",dataIndex:"birthday"},
            {title:"早期时间",dataIndex:"time"}
        ]

       

        return (
            <section>
                <Card title="基础表格" className='card-wrap'>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态表格-Mock" className='card-wrap'>
                    <Table 
                        bordered
                        columns={columns}
                        pagination={false}
                        dataSource={this.state.dataSource1}
                    />
                </Card>
                <Card title="Mock-单选" className='card-wrap'>
                    <Table 
                        bordered
                        rowSelection={{type:"radio",selectedRowKeys:this.state.selectedRowKeys}}
                        // 这里用刚才传来的索引值去匹配key值
                        columns={columns}
                        pagination={false}
                        onRow={(record,index) => {
                            //   这里的index传来的是索引(从零开始) 不是key值
                            return {
                              onClick: ()=>{
                                  this.onRowClick(record,index)
                              }, // 点击行
                            };
                          }}
                        dataSource={this.state.dataSource1}
                    />
                </Card>
                <Button onClick={this.handleDelete}>删除</Button>
                <Card title="Mock-多选" className='card-wrap'>
                    <Table 
                        bordered
                        rowSelection={{
                            type: "checkbox", 
                            selectedRowKeys: this.state.selectedRowKeys, 
                            onChange:(selectedRowKeys, selectedRows)=> {
                                // 当前选中的key   全部选中的key
                                this.setState({
                                    selectedRows,
                                    selectedRowKeys
                                })
                            }
                        }}
                        // 这里用刚才传来的索引值去匹配key值
                        columns={columns}
                        pagination={false}
                        dataSource={this.state.dataSource1}
                    />
                </Card>
                <Card title="Mock-分页" className='card-wrap'>
                    <Table 
                        bordered
                        columns={columns}
                        pagination={this.state.pagination}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
            </section>
        )
    }
}
