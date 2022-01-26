import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import utils from './../utils/utils'
export default class Axios{
    static requestList(_this,url,params,isMock){
        var data={
            params,
            isMock
        }
        this.ajax({
            url,data
        }).then(res=>{
                let list=res.data.list.map((value,index)=>{
                  value.key=index;
                  return value;
                })

                _this.setState({
                      list,
                      pagination:utils.pagination(res,current=>{
                          _this.params.page=current;
                          _this.request();
                      })
                  })
        })
    }
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                if(response.status=="success"){
                    resolve(response)
                }else{
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        //isShowLoading不是false就展示loading
        if(options.data&&options.data.isShowLoading!==false){
            loading=document.getElementById("ajaxLoading");
            loading.style.display="block";
        }
        let baseApi=""
        if(options.isMock){
            baseApi="https://www.fastmock.site/mock/e6478be5d4a36a31d8658b1c558c8d09/car";
        }else{
            baseApi="https://www.fastmock.site/mock/e6478be5d4a36a31d8658b1c558c8d09/car";
        }
        
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:"get",
                baseURL:baseApi,
                timeout:5000,
                params:(options.data&&options.data.params)||""
            }).then((response)=>{
                if(options.data&&options.data.isShowLoading!==false){
                    loading=document.getElementById("ajaxLoading");
                    loading.style.display="none";
                }
                if(response.status===200){
                    let res=response.data;
                    if(res.code=="0000"){
                        resolve(res);
                    }else{
                        Modal.info({title:"提示",content:res.message})
                    }
                }else{
                    reject(response)
                }
            })
        })
    }
}