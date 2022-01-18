import React, { Component } from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Button, Card,Form,Input,message,Checkbox} from 'antd';
const FormItem=Form.Item
export default class FormLogin extends Component {
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error("登录失败")
      };
    onFinish = (values) => {
        console.log('Success:', values);
        message.success("登陆成功")
      };
    render() {
        return (
            <section>
                <Card title="登录行内表单" className='card-wrap'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" className='card-wrap'>
                    <Form style={{width:"300px"}} labelCol={{span:8}} onFinishFailed={this.onFinishFailed} onFinish={this.onFinish} >
                        <FormItem
                            label="UserName" 
                            name="UserName"
                            rules={[
                                {required:true,message:"请输入用户名"},
                                {min:5,max:15,message:"长度不在规定"}
                            ]}
                        >
                            <Input  prefix={<UserOutlined/>} placeholder="请输入用户名" />
                        </FormItem>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                            <a style={{float:"right"}}>忘记密码</a>
                        </Form.Item>
                        <FormItem>
                            <Button type='primary' htmlType='submit'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </section>
        )
    }
}
