import React, { Component } from 'react';
import {Input,Card,Select,Button,Checkbox,Radio,Form, DatePicker} from 'antd';
import utils from '../../utils/utils';
const  FormItem=Form.Item;
const Option=Select.Option;
export default class FilterForm extends Component{
    // 查询
    hanleFilterSubmit=()=>{
        //在这里获取数据需要添加name值  没有name值获取不到数据
        let fieldValue=this.myform.getFieldsValue();
        this.props.filterSubmit(fieldValue);
    }
    
    // 重置
    reset=()=>{
        this.myform.resetFields();
    }

    initFormList=()=>{
        const formList=this.props.formList;
        const formListItem=[];
        if(formList&&formList.length>0){
            formList.map((item,i)=>{
                let label=item.label;
                let field=item.field;
                let initValue=item.initialValue||"";
                let placeholder=item.placeholder;
                let width=item.width;
                if(item.type==="时间查询"){
                    const begin_time=<FormItem name={"start_time"} label={label}  key={field} >
                                         <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'   placeholder={placeholder} />
                                     </FormItem>;
                    formListItem.push(begin_time);
                    const end_time=<FormItem name={"end_time"} key={field} label='~' colon={false} >
                    <DatePicker showTime  format='YYYY-MM-DD HH:mm:ss' placeholder={placeholder} />
                            </FormItem>;
                        formListItem.push(end_time);
                }else
                if(item.type==="INPUT"){//文本框
                    const INPUT=<FormItem name={field} label={label} key={field} >
                                    <Input type="text" placeholder={placeholder} />
                                </FormItem>;
                        formListItem.push(INPUT);
                }else if(item.type==="SELECT"){//下拉框
                    const SELECT=<FormItem name={field} initialValue={initValue} label={label} key={field} >

                        <Select  placeholder={placeholder} style={{width:width}}>
                            {utils.getOptionList(item.list)}
                        </Select>
                    </FormItem>;
                    formListItem.push(SELECT);
                }else if(item.type==="CHECKBOX"){//下拉框
                    const CHECKBOX=<FormItem name={field} label={label} key={field} >
                        <Checkbox >
                            {label}
                        </Checkbox>
                    </FormItem>;
                    formListItem.push(CHECKBOX);
                }else 
                if(item.type==="datapicker"){//文本框
                    const Date=<FormItem name={field} key={field} label='~' colon={false} >
                    <DatePicker showTime  format='YYYY-MM-DD HH:mm:ss' placeholder={placeholder} />
                            </FormItem>;
                        formListItem.push(Date);
                }else
                if(item.type==="城市"){//下拉框
                    const city=<FormItem name="city"  label="城市" key="city" >
                       <Select  placeholder={placeholder} defaultValue="0"  style={{width:80}}>
                            {utils.getOptionList([{id:"0",name:"全部"},{id:"1",name:"北京"},{id:"2",name:"上海"},{id:"3",name:"天津"},{id:"4",name:"杭州"}])}
                        </Select>
                    </FormItem>;
                    formListItem.push(city);
                }
            })
        }
           return formListItem; 
    }
    render(){
        return (
            <Form layout='inline' ref={res=>this.myform=res}>
                {this.initFormList()}
                <FormItem>
                    <Button type='primary' style={{margin:"0px 20px"}} onClick={this.hanleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}