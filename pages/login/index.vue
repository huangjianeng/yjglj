<template>
	<view class="login_wrap">
		<view class="title">
			开福区雨洪监测预警指挥决策系统
		</view>
		<view class="login">
			<view class="login_title">登录账户</view>
			<uni-forms ref="valiForm" :modelValue="formData" :rules="rules">
				<view class="area_form">
					<view class="uni-form-item uni-column">
						<uni-forms-item name="username" required>
							<uni-easyinput :inputBorder="false" clearable v-model="formData.username"
								placeholder="请输入登录账号" />
						</uni-forms-item>
					</view>
					<view class="uni-form-item uni-column">
						<uni-forms-item name="password" required>
							<uni-easyinput type="password" :inputBorder="false" clearable v-model="formData.password"
								placeholder="请输入密码" />
						</uni-forms-item>
						<!-- suffixIcon="eye" -->
					</view>
				</view>
				<view class="uni-btn-v">
					<button @click="formSubmit">立即登录</button>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		loginApi
	} from '@/api'
	export default {
		data() {
			return {
				title: 'Hello',
				formData: {
					username: '1001',
					password: '123456',
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					}
				}
			}
		},
		onLoad() {

		},
		methods: {
			formSubmit() {
				this.$refs['valiForm'].validate().then(res => {
					let obj = {...this.formData,grantType:'password'}
					loginApi(obj).then(res=>{
						// console.log(res)
						uni.clearStorageSync();
						uni.setStorageSync('userinfo', res)
						// uni.setStorageSync('loginTime', Date.now())
						uni.navigateTo({
							url:'/pages/home/index'
						})
					})
			
					console.log('success', res);
				}).catch(err => {
					console.log('err', err);
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	page {
		height: 100%;
	}

	.title {
		font-size: 20px;
		font-weight: 600;
		color: #FFFFFF;
		margin: auto;
		text-align: center;
		padding: 60px 0 20px;
		color: white;
	}

	.login_wrap {
		width: 100%;
		height: 100%;
		background: url('../../static/bg@2x.png') no-repeat;
		/* background: url(images/bg.png) no-repeat; */
		background-size: 100% 100%;

	}

	.login {
		margin: 30px;
		padding: 10px 20px;
		background-color: white;
		border-radius: 10px;
	}

	.login_title {
		font-size: 20px;
		font-weight: 600;
		color: #1D2732;
		padding: 30px;
		margin: auto;
		text-align: center;
	}

	/deep/.is-required {
		display: none;
	}

	/deep/ .uni-easyinput__placeholder-class {
		font-size: 13px;
		color: #9EAEC1 !important;
		font-weight: 400;
	}

	/deep/.uni-easyinput__content{
		/* 	width: 299px;
		height: 49px; */
/* 		margin: auto;
		width: 90%; */
		min-height: 50px;
		background: #EFF3F7;
		border-radius: 9px;
	}

	/deep/.uni-input-wrapper {}

	/deep/.uni-btn-v button {
		background: #2675FF;
		border-radius: 9px;
		font-size: 18px;
		font-weight: 600;
		color: white;
		/* width: 90%; */
		margin: 30px auto;
	}
</style>
