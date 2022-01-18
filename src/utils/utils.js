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
    }

}