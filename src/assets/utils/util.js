export const getQueryString=(name)=>{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
  if(r!=null)return  decodeURIComponent(r[2]).trim(); return null;
}