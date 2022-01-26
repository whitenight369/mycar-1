import React from 'react';
import utils from '../../utils/utils';
import { Table } from 'antd';
export default class ETable extends React.Component{

    onRowClick=(record,index)=>{
        let rowSelection= this.props.rowSelection;   
        if(rowSelection=="checkbox"){
            console.log("hhhh");
            // 如果是复选框  接收id  Dom数据 以及索引
            let selectedRowKeys=this.props.selectedRowKeys;//索引
            let selectedItem=this.props.selectedItem;//dom数据
            let selectedIds=this.props.selectedIds;//id
            if(selectedIds){//根据id数组判断是否已有选中 
                const i = selectedIds.indexOf(record.id);
                if(i===-1){//如果已有选中就把数据 id 索引推到数组中去
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{//如果是再次选中自己 需要把数据推出去
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);

                }
            }else{//如果没有选中就创建一个新的数组存储上面的id 数据和索引
                selectedIds=[record.id];
                selectedRowKeys=[index];
                selectedItem=[record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds)
        }else{
            let selectedRowKeys=[index];
            let selectedItem=record;
            this.props.updateSelectedItem(selectedRowKeys,selectedItem)
        }

    }

    tableInit=()=>{
        let row_selection=this.props.rowSelection;
        let selectedRowKeys=this.props.selectedRowKeys;
        const rowSelection={
            type:"radio",
            selectedRowKeys
        }
        if(row_selection===false||row_selection===null){
            row_selection=false;
        }else if(row_selection=="checkbox"){
            rowSelection.type="checkbox";
        }else{
            row_selection="radio";
        }
        return (
            <Table
            bordered
               {...this.props}
               rowSelection={row_selection?rowSelection:null} 
               onRow={(value,index)=>{
                   if(!row_selection){
                    return ;
                    }
                return {
                  onClick:()=>{
                    this.onRowClick(value,index)}
                }
              }}
            />
        )
            
        
    }
    render(){
        return (
            <div>
                {this.tableInit()}
            </div>
        )
    }
}