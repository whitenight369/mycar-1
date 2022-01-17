import React, { Component } from 'react'
import {Card,Carousel} from 'antd'
export default class Carouse extends Component {
    render() {
        const contentStyle = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
          };
        return (
            <section>
                <Card title="文字背景轮播图" className='card-wrap'>
                    <Carousel autoplay effect='fade'>
                        <div><h3 style={contentStyle}>Ant React</h3></div>
                        <div><h3 style={contentStyle}>Ant Vue</h3></div>
                        <div><h3 style={contentStyle}>Ant Angle</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片背景轮播图" className='card-wrap'>
                    <Carousel autoplay>
                        <div>
                            <img src='/carousel-img/carousel-1.jpg' />
                        </div>
                        <div>
                            <img src='/carousel-img/carousel-2.jpg' />
                        </div>
                        <div>
                            <img src='/carousel-img/carousel-3.jpg' />
                        </div>
                    </Carousel>
                </Card>
            </section>
        )
    }
}
