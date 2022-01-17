import React, { Component } from 'react'
import {Card,Button,Spin,Alert} from 'antd';
import {QuestionOutlined,CloseOutlined} from '@ant-design/icons'
export default class Loading extends Component {
    render() {
        const a=<QuestionOutlined spin style={{fontSize:"24px"}}/>
        const b=<CloseOutlined spin />
        return (
            <section>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size='small' />
                    <Spin  style={{margin:"0 20px"}}/>
                    <Spin size='large'/>
                    <Spin indicator={a} style={{margin:"0 10px"}} />
                    <Spin indicator={b} style={{margin:"0 10px"}} />
                </Card>
                <Card title="遮罩层" className='card-wrap'>
                    <Alert 
                        message="React"
                        description="欢迎来到"
                        type='info'
                    />
                    <Alert 
                        message="React"
                        description="欢迎来到"
                        type='warning'
                    />
                    <Spin indicator={b}>
                        <Alert  
                            message="React"
                            description="欢迎来到"
                            type='error'
                        />
                    </Spin>
                    <Spin tip="加载中..." >
                        <Alert 
                            message="React"
                            description="欢迎来到"
                            type='error'
                        />
                    </Spin>
                </Card>
            </section>
        )
    }
}
