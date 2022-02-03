import React, { Component } from 'react';
import moment from 'moment';
import {Input ,Card,Radio,InputNumber,Space,Button,Form,Checkbox,Switch,Select,DatePicker,TimePicker,Upload,Icon,message} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const {Option}=Select;
const { TextArea } = Input;
export default class Register extends Component {
        state={}

    onFinish=(value)=>{
        console.log(value);
        message.info("注册成功")
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.info("注册失败")
      };

     getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    render() {
        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );
        return (
            <section>
                <Card title="注册表单" className='card-wrap'>
                    <Form labelCol={{span: 6}} wrapperCol={{span: 18}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <FormItem
                            label="UserName" 
                            name="UserName"
                            rules={[
                                {required:true,message:"请输入用户名"},
                                {min:5,max:15,message:"长度不在规定"}
                            ]}
                        >
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem
                            label="password" 
                            name="password"
                            rules={[ 
                                {required:true,message:"请输入用户名"},
                                {min:5,max:15,message:"长度不在规定"}
                            ]}
                        >
                            <Input.Password placeholder="请输密码" />
                        </FormItem>
                        <FormItem
                            label="性别" 
                            name="radio-group"
                        >
                            
                            <RadioGroup>
                                <Radio value="a">男</Radio>
                                <Radio value="b">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            label="年龄" 
                        >
                            <InputNumber defaultValue={18} min={1} max={118} />
                        </FormItem>
                        <FormItem
                            label="当前状态" 
                        >
                            <Select>
                                <Option  value="1">选项1</Option>
                                <Option  value="2">选项2</Option>
                                <Option  value="3">选项3</Option>
                                <Option  value="4">选项4</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="多选菜单" 
                        >
                            <Select mode="multiple" defaultValue={['1','2']}>
                                <Option  value="1">选项1</Option>
                                <Option  value="2">选项2</Option>
                                <Option  value="3">选项3</Option>
                                <Option  value="4">选项4</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="IsMerry" 
                            name="IsMerry"
                        >
                            <Switch defaultChecked />
                        </FormItem>
                        <FormItem
                            label="出生日期" 
                            name="birthday"
                        >
                            <Space direction="vertical">
                                <DatePicker showTime defaultValue={moment('2000-10-21 00:00:00')} format="YYYY-MM-DD HH:mm:ss"/>
                                <DatePicker picker="week" />
                            </Space>
                        </FormItem>
                        <FormItem
                            label="联系地址" 
                        >
                                <TextArea defaultValue="地球 亚洲 中国 河北省" autoSize={{minRows:4,maxRows:8}} />
                        </FormItem>
                        <FormItem
                            label="早期时间" 
                        >
                                <TimePicker defaultValue={moment("05:20:13")}/>
                        </FormItem>
                        <FormItem
                            label="上传头像" 
                        >
                                <Upload 
                                listType='picture-card'
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                showUploadList={false}
                                onChange={this.handleChange}
                                >
                                    {this.state.imageUrl?<img src={this.state.imageUrl} />:uploadButton}
                                </Upload>
                        </FormItem>
                        <FormItem
                            wrapperCol={{offset:6}}
                        >
                            <Checkbox> 我不同意 <a >你的协议</a></Checkbox>
                        </FormItem>
                        <FormItem
                            wrapperCol={{offset:6}}
                        >
                           <Button type='primary' htmlType='submit'>提交</Button>
                        </FormItem>
                    </Form>
                </Card>
            </section>
        )
    }
}
