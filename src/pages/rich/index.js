import React, { Component } from 'react'
import {Button, Card,Modal} from 'antd';
import { Editor } from "react-draft-wysiwyg";
import draftjs from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default class Rich extends Component {
    state={showRichText:false,editorState:""}

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };
    //   清空文本   
    handleClearContent=()=>{
        this.setState({
            editorState:""
          });
    }
    // 获取文本
    handleGetContent=()=>{
        this.setState({
            showRichText:true
        })
    }
    // 文本变化
    onEditorChange=(cntentState)=>{
        this.setState({
            cntentState
        })
    }

    render() {
        const { editorState } = this.state;
        return (
            <section>
                <Card>
                    <Button type='primary' onClick={this.handleClearContent}>清空内容</Button>
                    <Button type='primary' onClick={this.handleGetContent} style={{marginLeft:10}}>获取html文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        onContentStateChange={this.onEditorChange}
                        editorState={editorState}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.cntentState)}
                </Modal>
            </section>
        )
    }
}
