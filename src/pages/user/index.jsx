import React, { Component } from 'react'
import { Card,Button,Modal,Form, Radio, Select,Input, DatePicker } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import moment from 'moment';
import axios from './../../axios';
import utils from '../../utils/utils';
import ETable from './../../components/ETable';
import BaseForm from './../../components/BaseForm';
import TextArea from 'antd/lib/input/TextArea';
const Option=Select.Option;
const FormItem=Form.Item;
export default class User extends Component {
    params={
        page:1
    }
    state={isVisible:false}
    formList=[
        {
            type:"INPUT",
            label:"用户名",
            field:"user_name",
            placeholder:"请输入用户名",
            width:130
        },
        {
            type:"INPUT",
            label:"手机号",
            field:"user_mobile",
            placeholder:"请输入手机号",
            width:140
        },
        {
            type:"datepicker",
            label:"请选择入职日期",
            field:"user_date",
            placeholder:"请输入日期"
        },
    ]

    handleFilter=(params)=>{
        this.params=params;
        this.request()
    }

    request=()=>{
        axios.requestList(this,'/table/list1',this.params);
    }

    componentDidMount(){
        this.request()
    }

    // 功能区操作
    handleOperate=(type)=>{
        let item=this.state.selectedItem;
        if(type==="create"){
            this.setState({
                type,
                isVisible:true,
                title:"创建员工"
            })
        }else 
        if(type==="edit"){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return ;
            }
            this.setState({
                type,
                isVisible:true,
                title:"编辑员工",
                userInfo:item //选中员工的详细信息
            })
        }else 
        if(type==="detail"){
            this.setState({
                type,
                isVisible:true,
                title:"员工详情",
                userInfo:item //选中员工的详细信息
            })
        }else{
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return ;
            }
            let _this=this;
            Modal.confirm({
                title:"确认删除",
                onOk(){
                    axios.ajax({
                        url:"/user/add",
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        if(res.code===0){
                            _this.setState({
                                isVisible:false
                            })
                            _this.request()
                        }
                    })
                }
            })

        }
    }

    // 创建员工提交
    handleSubmit=()=>{
        let type=this.state.type;
        let data=this.userForm.userForm.getFieldsValue();

        axios.ajax({
            url:type=="create"?'/user/add':"/user/add",
            data:{
                params:data
            }
        }).then(res=>{
            if(res.code==0){
                this.setState({
                    isVisible:false
                })
                this.request()
            }
        })
    }

    render() {
        const columns=[
            {
                title:"id",
                dataIndex:"id"
            },
            {
                title:"用户名",
                dataIndex:"username"
            },
            {
                title:"性别",
                dataIndex:"sex"
            },
            {
                title:"状态",
                dataIndex:"state"
            },
            {
                title:"爱好",
                dataIndex:"interest"
            },
            {
                title:"生日",
                dataIndex:"birthday"
            },
            {
                title:"联系地址",
                dataIndex:"address"
            },
            {
                title:"早期时间",
                dataIndex:"time"
            }
        ]
        let footer={};
        if(this.state.type==="detail"){ //取消modal弹窗的确认和取消按钮
            footer={
                footer:null
            }
        }
        return (
            <section>
                <Card>
                   <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/> 
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type='primary' icon={<PlusOutlined />} onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type='primary' icon={<PlusOutlined />} style={{marginLeft:10}} onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type='primary' icon={<PlusOutlined />} style={{marginLeft:10}} onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type='primary' icon={<PlusOutlined />} style={{marginLeft:10}} onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                    
               </Card>
               <ETable
                    style={{marginTop:20}}
                      selectedItem={this.state.selectedItem}//存储选中的行的id
                      columns={columns}
                      updateSelectedItem={utils.updateSelectedItem.bind(this)}
                      dataSource={this.state.list}
                      selectedRowKeys={this.state.selectedRowKeys}
                      pagination={this.state.pagination}
                    />
                    <Modal 
                        title={this.state.title}
                        visible={this.state.isVisible}
                        onOk={this.handleSubmit}
                        onCancel={()=>{
                            this.userForm.userForm.resetFields()
                            this.setState({
                                isVisible:false
                            })
                        }}
                        width={600}
                        {...footer}
                    >
                        <UserForm type={this.state.type} userInfo={this.state.userInfo} ref={res=>this.userForm=res}/>
                    </Modal>
               
            </section>
        )
    }
}

class UserForm extends Component{
    render(){
        let type=this.props.type;
        let userInfo=this.props.userInfo||{};
        console.log(userInfo);
        const formItemLayOut={
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return (
            <Form layout="horizontal" ref={res=>this.userForm=res}>
                <FormItem label="用户名" {...formItemLayOut} name="user_name" initialValue={userInfo.username} > 
                    {type=="detail"?userInfo.username:<Input type="text" placeholder="请输入用户名" />}
                </FormItem>
                <FormItem label="性别" {...formItemLayOut} name="sex"  initialValue={userInfo.sex} > 
                    {
                        type==="detail"?userInfo.sex===1?"男":"女":<Radio.Group placeholder="请输入用户名" >
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                    </Radio.Group>
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayOut}  name="state" initialValue={userInfo.state}> 
                    <Select>
                        <Option value={1}>PlanB</Option>
                        <Option value={2}>A计划</Option>
                        <Option value={3}>晚安</Option>
                    </Select>
                </FormItem>
                <FormItem label="生日" name="birthday" {...formItemLayOut} initialValue={moment(userInfo.birthday)}> 
                    <DatePicker/>
                </FormItem>
                <FormItem label="联系地址" {...formItemLayOut} name='address' initialValue={userInfo.address}> 
                    <TextArea  placeholder='请输入联系地址' rows={3} />
                </FormItem>
            </Form>
        )
    }
}
