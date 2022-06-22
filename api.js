import config from './config'
// import axios from 'axios'

// 新增常规事件
export async function loginApi(data){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/auth/oauth/token`,
            data,
            header: {
				'Authorization':'Basic UmFpbkZhbGxXZWI6UmFpbkZhbGxXZWIxMjM=',
                // 'x-token': userToken
				'Content-Type':'application/x-www-form-urlencoded'
            },
            success: (res) => r(res.data),
        });
    });
}

// 新增常规事件
export async function addNormalEvent(data){
	console.log(uni.getStorageSync('userinfo'))
	console.log(uni.getStorageSync('userinfo').access_token)
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/sde/normalEvent/save`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}

// 列表常规事件
export async function getNormalEventList(data){
	console.log(uni.getStorageSync('userinfo'))
	console.log(uni.getStorageSync('userinfo').access_token)
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/sde/normalEvent/list`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}

// 修改密码
export async function changePassword({confirmPassword, newPassword, oldPassword, userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "PUT",
            url: `${config.apiUrl}/x_organization_assemble_personal/jaxrs/person/password`,
            data: {
				confirmPassword,
				newPassword,
				oldPassword
            },
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}



// 登录接口
export async function login(credential, password){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/x_organization_assemble_authentication/jaxrs/authentication`,
            data: {
                credential,
                password,
            },
            header: {},
            success: (res) => r(res.data),
        });
    });
}

// 热点图片获取
export async function hotPic(page, count){
    return await new Promise((r) => {
        uni.request({
            method: "PUT",
            url: `${config.apiUrl}/x_hotpic_assemble_control/jaxrs/user/hotpic/filter/list/page/${page}/count/${count}`,
            data: {},
            header: {},
            success: (res) => r(res.data),
        });
    });
}

// 信息内容获取
export async function document({page, count, userToken = uni.getStorageSync('userinfo').token, data}){
    return await new Promise((r) => {
        uni.request({
            method: "PUT",
            url: `${config.apiUrl}/x_cms_assemble_control/jaxrs/document/filter/list/${page}/size/${count}`,
            data: data,
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 待办工作流程获取
export async function agencyWork({page, count, userToken = uni.getStorageSync('userinfo').token, data}){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/x_processplatform_assemble_surface/jaxrs/task/v2/list/paging/${page}/size/${count}`,
            data,
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 已办工作流程获取
export async function doneWork({page, count, userToken = uni.getStorageSync('userinfo').token, data}){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/x_processplatform_assemble_surface/jaxrs/taskcompleted/v2/list/paging/${page}/size/${count}`,
            data,
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 待阅工作流程获取
export async function toreadWork({page, count, userToken = uni.getStorageSync('userinfo').token, data}){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/x_processplatform_assemble_surface/jaxrs/read/v2/list/paging/${page}/size/${count}`,
            data,
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 已阅工作流程获取
export async function readWork({page, count, userToken = uni.getStorageSync('userinfo').token, data}){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/x_processplatform_assemble_surface/jaxrs/readcompleted/v2/list/paging/${page}/size/${count}`,
            data,
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// OA SSO单点登录Token加密接口
// 此接口的credential请使用login接口返回的用户unique参数
export async function ssoToken(credential, userToken){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/x_organization_assemble_authentication/jaxrs/sso/encrypt`,
            data: {
                client: config.ssoName,
                credential,
                key: config.ssoKey
            },
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 自定义门户获取（非系统自带的门户）
export async function portal(userToken){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/x_portal_assemble_surface/jaxrs/portal/list`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 当前用户可发起的流程
export async function processList({userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/x_processplatform_assemble_surface/jaxrs/application/list/complex`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 发起指定流程
export async function addProcess({id, title, userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/x_processplatform_assemble_surface/jaxrs/work/process/${id}`,
            data: {
                title: title || ''
            },
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 极光推送模块绑定设备id
export async function bindsys(deviceName, deviceType, userToken){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/x_jpush_assemble_control/jaxrs/device/bind`,
            data: {
                deviceName,
                deviceType,
            },
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 极光推送模块解除绑定设备id
export async function unbindsys(deviceName, deviceType, userToken){
    return await new Promise((r) => {
        uni.request({
            method: "DELETE",
            url: `${config.apiUrl}/x_jpush_assemble_control/jaxrs/device/unbind/${deviceName}/${deviceType}`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 获取当前用户极光推送模块绑定的设备id
export async function getbindsys(userToken){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/x_jpush_assemble_control/jaxrs/device/all`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 获取会议列表
export async function getmeeting({userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/x_meeting_assemble_control/jaxrs/meeting/list/coming/month/6`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 获取部门列表
export async function getunitlist({userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/x_organization_assemble_control/jaxrs/unit/list/45211b2d-0e03-4c8d-8d07-8ec7fbe399d3/sub/direct`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 根据部门获取部门人员列表
export async function getunituserlist({unitid, userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/x_organization_assemble_control/jaxrs/unit/${unitid}`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 获取人员头像
export async function getPersonIcon({userid, userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
			responseType: 'blob',
            url: `${config.apiUrl}/x_organization_assemble_control/jaxrs/person/${userid}/icon`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 人员查询
export async function getuser({userid, userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/x_organization_assemble_control/jaxrs/person/${userid}`,
            data: {},
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 人员姓名查询
export async function getusername({userName, userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "PUT",
            url: `${config.apiUrl}/x_organization_assemble_control/jaxrs/person/list/like`,
            data: {
                key: userName
            },
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}


// 人员查询
export async function setuser({data, userToken = uni.getStorageSync('userinfo').token}){
    return await new Promise((r) => {
        uni.request({
            method: "PUT",
            url: `${config.apiUrl}/x_organization_assemble_personal/jaxrs/person`,
            data,
            header: {
                'x-token': userToken
            },
            success: (res) => r(res.data),
        });
    });
}

// 天气查询
export async function weather(){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `http://www.weather.com.cn/data/cityinfo/101250101.html`,
            data: {},
            success: (res) => r(res.data),
        });
    });
}

// 注释原因：访问需要登录的页面时，可以通过传输get参数x-token的方式进行用户认证无需单点登录。
// OA SSO单点登录接口
// 此接口的token请使用ssoToken接口返回的加密token参数
// export async function ssoLogin(token, userToken){
//     return await new Promise((r) => {
//         uni.request({
//             method: "POST",
//             url: `${config.apiUrl}/x_organization_assemble_authentication/jaxrs/sso`,
//             data: {
//                 client: config.ssoName,
//                 token: token
//             },
//             header: {
//                 'x-token': userToken
//             },
//             success: (res) => r(res.data),
//         });
//     });
// }