import { Button, Card, message } from 'antd'
import React, { Component } from 'react'

export default class Message extends Component {
    showMessage=(type)=>{
        message[type]("React晋级失败")
    }
    render() {
        return (
            <section>
                <Card className='card-wrap' title="全局提示框">
                    <Button type='primary' onClick={()=>this.showMessage('message')}>Success</Button>
                    <Button type='primary' onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type='primary' onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type='primary' onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type='primary' onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </section>
        )
    }
}
