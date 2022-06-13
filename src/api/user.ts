// 引入接口
import { get, post } from "../utils/request";

// 引入接口路径
import api from "./index";

/**
 *  发送验证码
 * @param phone 手机号
 * @param fn 回调函数
 */
export async function captchaSentApi(phone: number, fn?: Function) {
  const res = await get(api.captchaSent, { phone });
  if (res.status === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @captchaSentApi");
}

type captchaVerifyParamsType = {
  phone: number;
  captcha: number;
};
/**
 * 验证 验证码
 * @param params 参数
 * @param fn 回调函数
 */
export async function captchaVerifyApi(params: captchaVerifyParamsType, fn?: Function) {
  const res = await get(api.captchaVerify, params);
  if (res.status === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @captchaVerifyApi");
}

/**
 * 手机号 验证码登录
 * @param params 参数
 * @param fn 回调函数
 */
export async function loginCellphoneApi(params: captchaVerifyParamsType, fn?: Function) {
  const res = await post(api.loginCellphone, params);
  if (res.status === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @loginCellphoneApi");
}

/**
 * 登陆后 获取账户信息
 * @param fn 回调函数
 */
export async function userAccountApi(fn?: Function) {
  const res = await get(api.userAccount);
  if (res.status === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @userAccountApi");
}
