import service from '../utils/request'
/**
 * 登录接口
 * 
 */
export function loginApi(data){
  return  service.request({
        url:'/login/',
        method:'post',
        data:data ,       //请求类型位post
        //params:data   //请求类型位get
    })
}
/**
 * 获取验证码接口
 * 
 */
export function getSmsApi(data){
  return  service.request({
        url:'/getSms/',
        method:'post',
        data:data ,       //请求类型位post
        //params:data   //请求类型位get
    })
}
