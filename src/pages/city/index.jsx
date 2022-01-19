import React, { Component } from 'react'
import {Card,Table,Button,Form,Select,Modal,message} from 'antd';
import axios from './../../axios/index';
import utils from './../../utils/utils';
const FormItem=Form.Item;
const {Option}=Select;
export default class City extends Component {
    state={isShowOpenCity:false};
    params={
        page:1
    }
    componentDidMount(){
        this.request()
    }
    // 默认请求接口数据
    request=()=>{
        let _this=this;
        axios.ajax({
            url:"/open_city",
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then(res=>{
            if(res.code==="0000"){
                this.setState({
                    list:res.data.list,
                    pagination:utils.pagination(res,current=>{
                        _this.params.page=current;
                        _this.request();
                    })
                })
            }
        })
    }

    //开通城市
    handleOpenCity=()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
    // 城市开通提交
    onSubmit=()=>{
        let cityInfo=this.myForm.myForm.getFieldValue();
        axios.ajax({
            url:"/city/open",
            data:{
                params:cityInfo
            }
        }).then(res=>{
            if(res.code==="0000"){
                console.log(cityInfo);
                message.success("开通成功");
                this.setState({
                    isShowOpenCity:false
                })
                this.request();
            }
        })
    }
    render() {
        const columns=[
            {title:"城市ID",dataIndex:"id"},
            {title:"城市名称",dataIndex:"name"},
            {title:"用车模式",dataIndex:"mode",render(mode){return mode===1?"停车点":"禁停区"}},
            {title:"运行模式",dataIndex:"op_mode",render(mode){return mode===1?"自营":"加盟"}},
            {title:"授权加盟商",dataIndex:"franchisee_name"},
            {title:"城市管理员",dataIndex:"city_admins",render(arr){return arr.map(item=>item.user_name).join(",")}},
            {title:"操作时间",dataIndex:"update_time",render:utils.formateDate},
            {title:"操作人",dataIndex:"sys_user_name"}
        ]
        return (
            <section>
                <Card className='card-wrap'>
                    <FilterForm/>
                </Card>
                <Card>
                    <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className='content-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.onSubmit}
                >
                    <OpenCityForm ref={item=>this.myForm=item}  />
                </Modal>
            </section>
        )
    }
}
class FilterForm extends Component{
    onFinish=(value)=>{
        console.log(value);
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.info("注册失败")
      };
    render(){
        return (
            <Form layout='inline'>
                <FormItem label="城市">
                    <Select placeholder="请选择" style={{width:100}} onChange={this.onFinish}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式" >
                    <Select placeholder="全部" style={{width:140}} onChange={this.onFinish}>
                        <Option value="">全部</Option>
                        <Option value="2">指定停车点模式</Option>
                        <Option value="3">禁停区模式</Option>
                    </Select>
                </FormItem>
                <FormItem label="运营模式" >
                    <Select placeholder="全部" style={{width:80}} onChange={this.onFinish}>
                        <Option value="">全部</Option>
                        <Option value="2">自营</Option>
                        <Option value="3">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem label="加盟商授权状态" >
                    <Select placeholder="全部" style={{width:100}} onChange={this.onFinish}>
                        <Option value="">全部</Option>
                        <Option value="2">已授权</Option>
                        <Option value="3">未授权</Option>
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
class OpenCityForm extends Component{
    render(){
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return (
            <Form layout='horizontal' ref={item=>this.myForm=item}  >
                <FormItem label="选择城市" name='city_id' initialValue="1" {...formItemLayout}>
                    <Select style={{width:120}}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                    </Select>
                </FormItem>
                <FormItem label="营运模式" name="op_mode" initialValue="1" {...formItemLayout}>
                    <Select>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式" name="use_mode" initialValue="1" {...formItemLayout}>
                    <Select>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
        )
    }
}
