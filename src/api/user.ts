// 引入接口
import { get, post } from "../utils/request";

// 引入接口路径
import api from "./index";

import { totalTip } from "../hooks/common";

/**
 *  发送验证码
 * @param phone 手机号
 * @param fn 回调函数
 */
export async function captchaSentApi(phone: number, fn?: Function) {
  const res = await get(api.captchaSent, { phone });
  if (res?.data?.data) {
    totalTip("验证码发送成功");
    fn && fn();
  } else console.log("数据获取失败 ==> @captchaSentApi");
}

type captchaVerifyParamsType = {
  phone: number | null;
  captcha: number | null;
};
/**
 * 验证 验证码 // 并进行登录
 * @param params 参数
 * @param fn 回调函数
 */
export async function captchaVerifyApi(params: captchaVerifyParamsType, fn?: Function) {
  if (!params.phone || !params.captcha) return totalTip("请填写完整信息");
  const res = await get(api.captchaVerify, params);
  if (res?.data?.data) {
    loginCellphoneApi(params, fn); // 验证通过后,进行登录
  } else console.log("数据获取失败 ==> @captchaVerifyApi");
}

/**
 * 手机号 验证码登录
 * @param params 参数
 * @param fn 回调函数
 */
export async function loginCellphoneApi(params: captchaVerifyParamsType, fn?: Function) {
  const res = await post(api.loginCellphone, params);
  if (res.status === 200) {
    const result = res.data;

    fn && fn(result);
  } else console.log("数据获取失败 ==> @loginCellphoneApi");
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

/** 登录状态 */
export async function loginStatusApi(fn?: Function) {
  const res = await get(api.loginStatus);
  if (res.status === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @loginStatusApi");
}
/** 退出登录 */
export async function logoutApi(fn?: Function) {
  const res = await get(api.logout);
  if (res.status === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @logoutApi");
}
