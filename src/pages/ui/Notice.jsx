import React, { Component } from 'react'
import {Card,Button, notification} from 'antd'
export default class Notice extends Component {
    openNotification=(type,placement)=>{
        if(placement){
            notification[type]({
                message:"发工资了",
                description:"一天发了10块钱", 
                placement
            })
        }else{
            notification[type]({
                message:"发工资了",
                description:"一天发了10块钱", 
            })
        }
        
    }
    render() {
        return (
            <section>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type='primary' onClick={()=>this.openNotification('success')}> Success</Button>
                    <Button type='primary' onClick={()=>this.openNotification('info')}> Info</Button>
                    <Button type='primary' onClick={()=>this.openNotification('error')}> Error</Button>
                    <Button type='primary' onClick={()=>this.openNotification('warning')}> Warning</Button>
                </Card>
                <Card title="通知提醒框--控制方向" className="card-wrap">
                    <Button type='primary' onClick={()=>this.openNotification('success','topLeft')}> Success--topLeft</Button>
                    <Button type='primary' onClick={()=>this.openNotification('info','topRight')}> Info--topRight</Button>
                    <Button type='primary' onClick={()=>this.openNotification('error','bottomLeft')}> Error--bottomLeft</Button>
                    <Button type='primary' onClick={()=>this.openNotification('warning','bottomRight')}> Warning--bottomRight</Button>
                </Card>
            </section>
        )
    }
}
