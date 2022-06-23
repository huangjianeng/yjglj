import config from './config'
// import axios from 'axios'

// 登录
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


// http://175.6.136.216:8092/api/NormalEvent/insertNormalEvent?eventID=2&entity={}&x=112&y=28
// 新增常规事件
export async function addNormalEvent(data){
	// console.log(uni.getStorageSync('userinfo'))
	// console.log(uni.getStorageSync('userinfo').access_token)
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl2}/api/NormalEvent/insertNormalEvent`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}


//  获取当前时间段的预警id
export async function getEventId(data){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/business/hlEvent/getCurEventByTime`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => {
				// console.log(res)
				r(res.data)
				
			},
        });
    });
}
// http://175.6.177.203:8082/sde/normalEvent/list
// 列表常规事件
export async function getNormalEventList(data){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/sde/normalEvent/list`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => {
				// console.log(res)
				r(res.data)				
			},
        });
    });
}

// 新增应急事件
export async function addUrgentEvent(data){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/business/emergency/save`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}

// 列表应急事件
export async function getUrgentEventList(data){
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/business/emergency/list`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}

// 列表应急事件
export async function getUrgentEventDetails(data){
    return await new Promise((r) => {
        uni.request({
            method: "GET",
            url: `${config.apiUrl}/business/emergency/get?id=${data}`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}


// 事件评论
export async function addMsg(data){
	console.log(data)
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/business/reqMsg/save`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}

// 事件评论列表
export async function msgList(data){
	console.log(data)
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/business/reqMsg/list`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}

// 系统消息
export async function systemMsgList(data){
	// console.log(data)
    return await new Promise((r) => {
        uni.request({
            method: "POST",
            url: `${config.apiUrl}/business/sysMsg/list`,
            data,
            header: {
                'Blade-Auth': uni.getStorageSync('userinfo').access_token
            },
            success: (res) => r(res.data),
        });
    });
}
