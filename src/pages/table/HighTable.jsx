import React, { Component } from 'react'
import {Card,Table,Badge, Modal, message, Button} from 'antd';
import axios from './../../axios/index';
import utils from '../../utils/utils';
export default class HighTable extends Component {
    state={}
    params={
        page:1
    }
    request=()=>{
        axios.ajax({
            url:"/table/high",
            data:{
                params:{
                    page:this.params.page//后台的接口需要这个数据
                },
            }
        }).then(res=>{
            this.setState({
                dataSource3:res.data.list,
                dataSource2:res.data.list
            })
        })
    }

    componentDidMount(){
        this.request()
    }

    handleDelete=(item)=>{
        console.log(item);
        let id=item.id;
        Modal.confirm({
            title:"确认",
            content:`您确认要删除此条数据吗?${id}`,
            onOk:()=>{
                message.success("删除成功")
                this.request();
            }
        })
    }

    render() {
        const columns=[
            {title:"id",dataIndex:"id",},
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
        const columns1=[
            {title:"id",dataIndex:"id",fixed:"left"},
            {title:"用户名",dataIndex:"userName",fixed:"left"},
            {title:"性别",dataIndex:"sex",render(state){return state==1?"男":"女"}},
            {title:"昵称",dataIndex:"state",width:150,
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
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"生日",dataIndex:"birthday"},
            {title:"早期时间",dataIndex:"time"},
            {title:"生日",dataIndex:"birthday"},
        ]
        const columns2=[
            {title:"id",dataIndex:"id",},
            {title:"用户名",dataIndex:"userName"},
            {title:"年龄",dataIndex:"age",sorter:(a,b)=>{
                return a.age-b.age
            }},
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
        const columns3=[
            {title:"id",dataIndex:"id",},
            {title:"用户名",dataIndex:"userName"},
            {title:"年龄",dataIndex:"age",sorter:(a,b)=>{
                return a.age-b.age
            }},
            {title:"性别",dataIndex:"sex",render(state){return state==1?"男":"女"}},
            {title:"昵称",dataIndex:"state",
                render(state){
                    let config={
                        "1":<Badge text="还能说晚安吗" status='error' />,
                        "2":<Badge text="别再贩卖黄昏了"  status='warning' />,
                        "3":<Badge text="你携秋水揽星河" status='success' />,
                        "4":<Badge text="可惜我只是文字" status='default' />,
                        "5":<Badge text="不然还能拥抱你" status='processing'/>
                    }
                    return config[state]
                }
            },
            {title:"爱好",dataIndex:"interest"},
            {title:"生日",dataIndex:"birthday"},
            {title:"操作",render:(text,item)=>{
                return <Button onClick={()=>{this.handleDelete(item)}} >删除</Button>
            }}
        ]
        return (
            <section>
                <Card title="头部固定" className='card-wrap'>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource3}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定-Mock" className='card-wrap'>
                    <Table 
                        bordered
                        columns={columns1}
                        pagination={false}
                        dataSource={this.state.dataSource3}
                        scroll={{x:2000}}
                    />
                </Card>
                <Card title="表格排序" className='card-wrap'>
                    <Table 
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource3}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="表格排序" className='card-wrap'>
                    <Table 
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource3}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
            </section>
        )
    }
}
