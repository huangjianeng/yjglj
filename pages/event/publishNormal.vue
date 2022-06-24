<template>
	<view class="wrap">
		<view class="form_content">
			<uni-forms ref="valiForm" :modelValue="formData" :rules="rules" labelPosition="top" labelWidth="300">
				<view class="area_form">
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="content" label="事件内容" required>
								<uni-easyinput :inputBorder="false" clearable type="textarea" v-model="formData.content"
									placeholder="请对现场基本状况进行描述" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item label="图片/视频">
								<view class="value_wrap">
									<uni-file-picker @delete="deleteFile" :auto-upload="false" @select="selectFile"
										v-model="fileList">
									</uni-file-picker>
								</view>
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="state" label="处理情况">
								<uni-easyinput :inputBorder="false" clearable type="state" v-model="formData.state"
									placeholder="请输入目前处理的情况" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap time_box">
							<uni-forms-item name="timestamp" label="发生时间" required>
								<uni-datetime-picker returnType="timestamp" v-model="formData.timestamp"
									placeholder="请选择事件发生时间" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="addr" label="详细地址" required>
								<uni-easyinput :inputBorder="false" clearable @iconClick="getSite" suffixIcon="location"
									v-model="formData.addr" placeholder="如区、街道、桥、路等" />
							</uni-forms-item>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button @click="formSubmit">上报事件</button>
				</view>
			</uni-forms>

		</view>
	</view>
</template>

<script>
	import {
		addNormalEvent,
		getEventId
	} from '@/api'
	import config from '@/config.js'
	export default {
		data() {
			return {
				fileList: [],
				fileList2: [],
				formData: {
					state: '',
					timestamp: new Date().getTime(),
					addr: '',
					content: '',
					pic_attr: [],
					pic_ids: []
					// imageValue: [],
				},
				rules: {
					// state: {
					// 	rules: [{
					// 		required: true,
					// 		errorMessage: '不能为空'
					// 	}]
					// },
					timestamp: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					addr: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					content: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					eventId: '',
					latitude: '',
					longitude: '',
				},
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '常规事件'
			})
			this.init()
			this.getSite()
		},
		methods: {
			init() {
				let params = {
					time: new Date().getTime()
				}
				getEventId(params).then(res => {
					console.log(res)
					this.eventId = res.data
				})
			},
			deleteFile(files) {
				let index = this.fileList2.findIndex(v => v.uuid === files.tempFile.uuid)
				let item = this.fileList2.splice(index, 1)[0]
				for (let i = 0; i < this.formData.pic_ids.length; i++) {
					if (this.formData.pic_ids[i] == item.fileId) {
						this.formData.pic_attr.splice(i, 1)
						this.formData.pic_ids.splice(i, 1)
					}
				}
			},
			selectFile(files) {
				console.log(files)
				const fileUrl = files.tempFilePaths.pop()
				const file = files.tempFiles.pop();
				const that = this
				uni.uploadFile({
					url: `${config.apiUrl}/business/attach/upload`, // api地址
					files: [{
						name: 'file',
						uri: fileUrl
					}],
					name: 'file',
					header: {
						'Blade-Auth': uni.getStorageSync('userinfo').access_token
					},
					success: function(res) {
						const result = JSON.parse(res.data)
						if (result.code == 200) {
							console.log('success', result);
							that.fileList.push(file)
							that.fileList2.push({
								...file,
								fileId: result.data.id
							})
							that.formData.pic_ids.push(result.data.id)
							that.formData.pic_attr.push(result.data.fjmc)
						}
					}
				});
			},
			getSite() {
				const that = this
				uni.getLocation({
					geocode: true,
					success(res) {
						console.log('经纬度', res)
						let {
							latitude,
							longitude
						} = res
						that.latitude = latitude
						that.longitude = longitude
						let params = {
							tk: config.BowSiteKey,
							type: `geocode`,
							postStr: {
								"lon": longitude,
								"lat": latitude,
								"ver": 1
							},

						}
						uni.request({
							url: 'https://api.tianditu.gov.cn/geocoder',
							data: params
						}).then(result => {
							console.log('位置', result)
							let sjwz = result[1].data.result.formatted_address
							console.log(sjwz)
							that.formData.addr = sjwz
						})
					}
				})
			},
			bindTimeChange() {

			},
			formSubmit() {
				this.$refs['valiForm'].validate().then(res => {
					// let objectid = Math.round(Math.random()*1000000)
					// let obj = {eventId:2,objectid}
					// eventID=2&
					// this.formData.pic_attr.splice(i, 1)
					// this.formData.pic_ids.splice(i, 1)
					let entity = {
						...this.formData,
						pic_attr: this.formData.pic_attr.join(','),
						pic_ids: this.formData.pic_ids.join(',')

					}
					let params = {
						eventID: this.eventId,
						entity,
						x: this.longitude,
						y: this.latitude
					}
					addNormalEvent(params).then(res => {
						if (res.result) {
							uni.showToast({
								title: '提交成功',
								duration: 1000,
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/home/index'
								})
							}, 1000)
						}
						// console.log(res)
					})
					// console.log('success', res);
				}).catch(err => {
					console.log('err', err);
				})
				console.log(this.fileList)
				console.log(this.formData)
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
	}

	.wrap {
		display: flex;
		width: 100%;
		min-height: 100%;
		background: #EEF2F6;
		flex-direction: column;
	}

	.form_content {}

	.title {
		height: 22px;
		display: flex;
		align-items: center;
		font-size: 18px;
		font-weight: 500;
	}

	.required {
		color: red;
	}

	/deep/.uni-forms-item__label {
		padding: 0;
	}

	/deep/.label-text span {
		font-size: 16px !important;
		font-weight: 600;
		color: #1D2732;
	}

	.value_wrap {
		font-size: 13px;
		// padding: 6px 0 10px;
		// border-bottom: 1px solid #E4E9EE;
		// margin-bottom: 4px;
	}

	.uni-input-placeholder {
		color: grey;
		font-size: 13px;
		font-weight: 500;
	}

	.area_form {
		margin: 10px 10px 10px;
		padding: 10px;
		background-color: white;
		border-radius: 9px;
	}

	// /deep/.is-input-border{
	// 	border: none;
	// }
	/deep/.is-input-error-border .uni-easyinput__placeholder-class {
		color: grey;
	}

	/deep/.uni-easyinput__content-input {
		padding-left: 0px !important;
	}

	/deep/.uni-easyinput__content-textarea {
		min-height: 42px;
		height: 42px;
	}

	/deep/.uni-easyinput__placeholder-class {
		font-size: 13px;
		font-weight: 500;
		color: grey;
	}

	/deep/.uni-forms-item__inner {
		border-bottom: 1px solid #E4E9EE;
		padding-bottom: 8px;
	}

	/deep/.uni-date__x-input {
		padding: 0;
	}

	/deep/.uni-date-x {
		padding: 0;
	}

	/deep/ .time_box .uni-icons {
		display: none;
	}

	/deep/.uni-icons {
		font-size: 20px !important;

	}

	/deep/.uni-date-x--border {
		border: none;
	}

	.uni-btn-v {
		margin: 10px 0;
	}

	.uni-btn-v button {
		width: 90%;
		margin: auto;
		background: #2675FF;
		color: #fff;
	}


	.font12 {
		font-size: 18px;
	}

	.font18 {
		font-size: 18px;
	}

	.font22 {
		font-size: 22px;
	}

	.font24 {
		font-size: 24px;
	}
</style>
