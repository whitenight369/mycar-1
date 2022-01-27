import React, { Component } from 'react'
import {Button, Card,Modal,Form,Select,Input,Tree, Transfer} from 'antd';
import ETable from './../../components/ETable';
import utils from '../../utils/utils';
import axios  from './../../axios';
import menuList from './../../config/menuConfig';
let Option=Select.Option;
let FormItem=Form.Item;
export default class PermissionUser extends Component {
    state={isRoleVisible:false,isPermissionVisible:false,isUserVisible:false}    

    requestList=()=>{
        axios.requestList(this,"/role/list",{})
    }

    componentDidMount(){
        axios.requestList(this,"/role/list",{})
    }

    // 点击显示创建员工的框
    handleRole=()=>{
        this.setState({
            isRoleVisible:true
        })
    }

    // 创建员工提交
    handleRoleSubmit=()=>{
        let data=this.roleForm.roleForm.getFieldValue();
        axios.ajax({
            url:"/role/create",
            data:{
                params:data
            }
        }).then(res=>{
            if(res.code=="0000"){
                this.setState({
                    isRoleVisible:false
                })
                this.roleForm.roleForm.resetFields();
                this.requestList()
            }
        })
    }

    // 权限设置
    handlePermission=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"请选择一个角色"
            })
            return ;
        }
        this.setState({
            isPermissionVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }

    // 权限提交
    handlePermissionSubmit=()=>{
        let data=this.permForm.permForm.getFieldValue();
        data.role_id=this.state.selectedItem.id;
        data.menus=this.state.menuInfo;
        axios.ajax({
            url:"/permission/edit",
            data:{
                params:{
                    ...data
                }
            }
        }).then(res=>{
            if(res){
                this.setState({
                    isPermissionVisible:false
                })

                this.requestList();
            }
        })
    }

    // 用户授权
    handleUserAuth=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"请选择一个角色"
            })
            return ;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
        this.getRoleUserList(item.id);
    }

    // 获取已经授权的名单和未授权名单
    getRoleUserList=(id)=>{
        axios.ajax({
            url:"/role/user_list",
            data:{
                params:{
                    id
                }
            }
        }).then(res=>{
            this.getAuthUserList(res.data);
        })
    }
    
    //筛选目标用户
    getAuthUserList=(dataSource)=>{
        const mockData=[];
        const targetKeys=[];
        if(dataSource&&dataSource.length>0){
            dataSource.map(value=>{
                const data={
                    key:value.user_id,
                    title:value.user_name,
                    status:value.status
                }
                if(data.status==1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
                return value;
            })
            this.setState({mockData,targetKeys})
        }
    }

    // 用户授权提交
    handleUserSubmit=()=>{
        let data={};
        data.user_ids=this.state.targetKeys;
        data.role_id=this.state.selectedItem.id;//这一项是选中的某种职务
        axios.ajax({
            url:"/role/user_role_edit",
            data:{
                params:{
                    ...data
                }
            }
        }).then(res=>{
            if(res){
                this.setState({
                    isUserVisible:false
                })
                this.requestList()
            }
        })
    }

    render() {
        let columns=[
            {
                title:"角色ID",
                dataIndex:"id"
            },
            {
                title:"角色名称",
                dataIndex:"role_name"
            },
            {
                title:"创建时间",
                dataIndex:"create_time",
                render(create_time){
                    return utils.formateDate(create_time)
                }
            },
            {
                title:"使用状态",
                dataIndex:"status",
                render(status){
                    return status===1?"启用":"停用";
                }
            },
            {
                title:"授权时间",
                dataIndex:"authorize_time",
                render(authorize_time){
                    return utils.formateDate(authorize_time)
                }
            },
            {
                title:"授权人 ",
                dataIndex:"authorize_user_name"
            }
        ]
        return (
            <section>
                <Card>
                    <Button type='primary' onClick={this.handleRole}>创建角色</Button>
                    <Button style={{marginLeft:10}} type='primary' onClick={this.handlePermission}>设置权限</Button>
                    <Button style={{marginLeft:10}} type='primary' onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className='content-wrap'>
                    <ETable 
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        columns={columns}
                        dataSource={this.state.list}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.roleForm.resetFields();

                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm ref={e=>this.roleForm=e}/>
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermissionVisible}
                    width={600}
                    onOk={this.handlePermissionSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermissionVisible:false
                        })
                    }}
                >
                    <PermEditForm  
                    ref={e=>this.permForm=e}
                    menuInfo={this.state.menuInfo}
                    detailInfo={this.state.detailInfo}
                    patchMenuInfo={checkedKeys=>{
                        this.setState({
                            menuInfo:checkedKeys
                        })
                    }}
                     />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible:false
                        })
                    }} 
                >
                    <RoleAuthForm  
                    ref={e=>this.roleAuthForm=e}
                    detailInfo={this.state.detailInfo}
                    mockData={this.state.mockData}
                    targetKeys={this.state.targetKeys}
                    patchUserInfo={(targetKeys)=>{
                        this.setState({
                            targetKeys
                        })
                    }}
                     />
                </Modal>
            </section>
        )
    }
}

class RoleForm extends Component{
    render(){
        const formItemLayOut={
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return (
            <Form layout="horizontal" ref={res=>this.roleForm=res}>
                <FormItem label="角色名称" {...formItemLayOut} name="role_name" > 
                    <Input type="text" placeholder="请输入角色名称" />
                </FormItem>
                <FormItem label="状态" {...formItemLayOut}  name="state" > 
                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </FormItem>
            </Form>
        )
    }
}

class PermEditForm extends Component{
     onCheck=(checkedKeys)=>{
         this.props.patchMenuInfo(checkedKeys)
     }

    render(){
        const treeData=[{
            title:"平台权限",
            key:"/platform_all",
            children:menuList
        }]
        const formItemLayOut={
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const detail_Info=this.props.detailInfo;
        const menuInfo=this.props.menuInfo;
        return (
            <Form layout="horizontal" ref={e=>this.permForm=e} >
                <FormItem label="角色名称" {...formItemLayOut}>
                    <Input disabled placeholder={detail_Info.role_name} />
                </FormItem> 
                <FormItem label="状态" name="status" initialValue="1" {...formItemLayOut} >
                    <Select>
                        <Option value="1">启用</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                   treeData={treeData}
                   autoExpandParent={true}
                   onCheck={ checkedKeys=>{
                       console.log(checkedKeys);
                       this.onCheck(checkedKeys)
                   } }
                   checkedKeys={menuInfo}//默认选中的
                />

            </Form>
        )
    }
}
class RoleAuthForm extends Component{


    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    handleChange=(targetKeys)=>{
          this.props.patchUserInfo(targetKeys)
    }

   render(){
       const formItemLayOut={
           labelCol:{span:6},
           wrapperCol:{span:18}
       }
       const detail_Info=this.props.detailInfo;
       return (
           <Form  layout='horizontal' ref={e=>this.roleAuthForm=e} >
               <FormItem label="角色名称" {...formItemLayOut}>
                   <Input disabled placeholder={detail_Info.role_name} />
               </FormItem> 
               <FormItem label="选择用户" {...formItemLayOut}>
               <Transfer
                showSearch
                listStyle={{width:200,height:400}}
                searchPlaceholder="输入用户名"
                targetKeys={this.props.targetKeys}
                dataSource={this.props.mockData}
                filterOption={this.filterOption}
                titles={["待选用户","已选用户"]}
                onChange={this.handleChange}
                render={i=>i.title}
               />
               </FormItem>
           </Form>
       )
   }
} 