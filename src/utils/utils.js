import React from 'react'
import {Select} from 'antd';
let Option=Select.Option;
export default{
    // 时间
    formateDate(time){
        if(!time)return '';
        let date=new Date(time);
        return date.getFullYear()+"-"+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes())+":"+(date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds())
    },
    // 分页
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.page,
            pageSize:data.page_size,
            total:data.total,
            showTotal:()=>{
                return `共${data.total}条`;
            },
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if(!data){return ;};
        let options=[];
        data.map(item=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){
            this.setState({
                selectedItem,
                selectedRowKeys,
                selectedIds
            })
        }else{
            this.setState({
                selectedItem,
                selectedRowKeys
            }) 
        }
        // console.log(selectedItem);
    }

}