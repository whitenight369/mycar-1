import { Card, message, Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
const { TabPane } = Tabs;
export default class Tab extends Component {
    newTabIndex=0;
    callback=(key)=>{
        message.info("Hi,你选择了页签"+key)
    }
    componentWillMount(){
        
        const panes=[
            {
                title:"Tab 1",
                content:"Tab 1",
                key:'1'
            },
            {
                title:"Tab 2",
                content:"Tab 2",
                key:'2'
            },
            {
                title:"Tab 3",
                content:"Tab 3",
                key:'3'
            },
            {
                title:"Tab 4",
                content:"Tab 4",
                key:'4'
            },
        ];
        this.setState({ 
            activeKey:panes[0].key,
            panes
          });
    }

    onChange=(activeKey)=>{
        message.info("Hi,你选择了页签"+activeKey)
        this.setState({activeKey});
    }

    onEdit=(targetKey,action)=>{
        this[action](targetKey)
    }

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({
          panes: newPanes,
          activeKey,
        });
      };
    
      remove = targetKey => {
        //   关闭页签之后打开上一个页签 保存一下前面页签的key值就可以实现了
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
          const newPanes = panes.filter(pane => pane.key !== targetKey);
          if (newPanes.length && newActiveKey === targetKey) {
              if (lastIndex >= 0) {
                  newActiveKey = newPanes[lastIndex].key;
              } else {
                  newActiveKey = newPanes[0].key;
              }
          }
          this.setState({
              panes: newPanes,
              activeKey: newActiveKey,
          });
      }

    render() {
        return (
            <section>
                <Card className='card-wrap'  title="tab页签">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">
                           欢迎学习React
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            欢迎学习
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            学习
                        </TabPane>
                    </Tabs>
                </Card>
                <Card className='card-wrap' title="tab页签--带图">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={<span> <AppleOutlined />Tab 1</span>} key="1">
                           欢迎学习React
                        </TabPane>
                        <TabPane tab={<span>   <AndroidOutlined />Tab 2</span>} key="2">
                            欢迎学习
                        </TabPane>
                        <TabPane tab="Tab 3" key="3" disabled>
                            学习  加了disabled属性
                        </TabPane>
                    </Tabs>
                </Card>
                <Card className='card-wrap' title="tab页签--带图">
                    <Tabs activeKey={this.state.activeKey}  type="editable-card" onChange={this.onChange}  
                    onEdit={this.onEdit}
                    >
                        {this.state.panes.map(value=>{
                            return (
                                <TabPane
                                    tab={value.title}
                                    key={value.key}
                                    closable={value.closable}
                                >
                                    {value.content}
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </Card>
            </section>
        )
    }
}
