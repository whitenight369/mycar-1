import React, { Component } from 'react'
import {Card,Button,Modal} from 'antd'
import './ui.less';
export default class Models extends Component {
    state={
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false,
    }
    // 基础模态框的开启
    handleOpen=(type)=>{
        this.setState({
            [type]:true
        })
    }
    // 基础模态框的关闭
    handleClose=(type)=>{
        this.setState({
            [type]:false
        })
    }
    // 信息确认框的开启
    handleConfirm=(type)=>{
        Modal[type]({
            title:"你会吗?",
            content:"也许不会",
            onOk(){
                console.log("ok");
            },
            onCancel(){
                console.log("Cancel");
            }
        })
    }
    render() {
        return (
            <section>
                <Card title="基础模态框" className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleOpen("showModal1")}>Open</Button>
                    <Button type='primary' onClick={()=>this.handleOpen("showModal2")}>自定义页脚</Button>
                    <Button type='primary' onClick={()=>this.handleOpen("showModal3")}>顶部20px弹窗</Button>
                    <Button type='primary' onClick={()=>this.handleOpen("showModal4")}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleConfirm("confirm")}>Confirm</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("info")}>Info</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("success")}>Success</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("error")}>Error</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("warning")}>Warning</Button>
                </Card>
                {/* Open */}
                <Modal
                   title="React"
                   visible={this.state.showModal1}
                   onCancel={()=>{this.setState({showModal1:false})}}>
                    <p>欢迎来到1</p>
                </Modal>
                {/* 自定义页脚 */}
                <Modal
                   title="React"
                   okText="你好啊"
                   cancelText="我不好"
                   visible={this.state.showModal2}
                   onCancel={()=>{this.setState({showModal2:false})}}>
                    <p>欢迎来到2</p>
                </Modal>
                {/* 顶部20px */}
                <Modal
                   title="React"
                   style={{top:"20px"}}
                   visible={this.state.showModal3}
                   onOk={()=>this.handleClose('showModal3')}
                   onCancel={()=>{this.setState({showModal3:false})}}>
                    <p>欢迎来到3</p>
                </Modal>
                {/* 水平垂直居中 */}
                <Modal
                   title="React"
                   wrapClassName='vertical-center-modal'
                   visible={this.state.showModal4}
                   onCancel={()=>{this.setState({showModal4:false})}}>
                    <p>欢迎来到4</p>
                </Modal>
            </section>
        )
    }
}
