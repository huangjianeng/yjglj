// 全局请求封装
export default (params) => {
	// const token = uni.getStorageSync('token');
	console.log('1111')
	uni.showLoading({
		title: "加载中"
	});
	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			complete(res) {
				uni.hideLoading();
				if(res.data.code === 401){
					console.log(res)
					uni.showToast({
						icon:'error',
						title: '请登录',
						duration: 1000,
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/index'
						})
					}, 1000)
				}
				
			},
		});
	});
};
