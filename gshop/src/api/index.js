/*
与后台交互模块
 */
import ajax from './ajax'

/**
 * 获取地址信息(根据经纬度串)
 */
export const reqAddress = geohash => ajax('/api/position/' + geohash);

/**
 * 获取msite页面食品分类列表
 */
export const reqCategorys = () => ajax('/api/index_category');

/**
 * 获取msite商铺列表(根据经纬度)
 */
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude});

/**
 * 发送请求短信验证码
 */
export const reqSendCode =(phone)=>ajax('/api/sendcode',{phone});
/**
 * 手机验证码登录请求
 */
export const reqSmsLogin =({phone,code})=>ajax('/api/login_sms',{phone,code},'POST');

/**
 * 账号登录请求
 */
export const reqPwdLogin =({name, pwd, captcha})=>ajax('/api/login_pwd',{name, pwd, captcha},'POST');
/**
 * 请求用户信息
 */
export const reqUser =()=>ajax('/api/userinfo');
/**
 * 退出登录
 */
export const reqLogout=()=>ajax('/api/logout');
/*
* 获取店家商品信息
* */
export const reqInfo = () => ajax('/info');
export const reqGoods = () => ajax('/goods');
export const reqRatings = () => ajax('/ratings');
