<template>
	<view class="wrap">
		<view class="form_content">
			<uni-forms ref="valiForm" :modelValue="formData" :rules="rules" labelPosition="top" labelWidth="300">
				<view class="area_form">
					<view class="uni-form-item uni-column">
						<view class="value_wrap">
							<uni-forms-item name="sjmc" label="事件名称" required>
								<uni-easyinput :inputBorder="false" clearable v-model="formData.sjmc"
									placeholder="请输入事件名称"></uni-easyinput>
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap time_box">
							<uni-forms-item name="bgsj" label="发生时间" required>
								<uni-datetime-picker v-model="formData.bgsj" placeholder="请选择事件发生时间" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="sjwz" label="详细地址" required>
								<uni-easyinput :inputBorder="false" suffixIcon="location" @iconClick="getSite"
									v-model="formData.sjwz" placeholder="如区、街道、桥、路等" />
							</uni-forms-item>
						</view>
					</view>
				</view>
				<view class="area_form">
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="xcqk" label="现场状况" required>
								<uni-easyinput :inputBorder="false" clearable type="textarea" v-model="formData.xcqk"
									placeholder="请对现场基本状况进行描述" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="gzyq" label="主要工作目标/需求">
								<uni-easyinput :inputBorder="false" clearable type="textarea" v-model="formData.gzyq"
									placeholder="请输入工作目标/需求 1. 2. …" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item label="图片/视频">
								<view class="value_wrap">
									<!-- 									<uni-file-picker :auto-upload="false" @select="selectFile" @delete="deleteFile"
										v-model="fileList">
									</uni-file-picker> -->
									<htz-image-upload mediaType="all" :max="9" :dataType="1" v-model="ceshiData"
										@imgDelete="fileDelete" @uploadSuccess="uploadSuccess" :action="getUrl()">
									</htz-image-upload>
								</view>
							</uni-forms-item>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button @click="formSubmit">上报事件</button>
				</view>
			</uni-forms>
			<!-- <u-toast ref="uToast"></u-toast> -->
		</view>
	</view>
</template>

<script>
	import {
		addUrgentEvent,
		fileUpload,
		getEventId
	} from "@/api.js"
	import UploadFile from "@/components/htz-image-upload/htz-image-upload.vue"
	import config from '@/config.js'
	export default {
		components: {
			UploadFile
		},
		data() {
			return {
				fileList: [],
				formData: {
					sjmc: '',
					bgsj: new Date().getTime(), // 报告时间
					xcqk: '', //现场状况
					gzyq: '', // 工作目标
					attIds: [],
					sjwz: '', // 事件地点
					sjdj: 1, // 事件等级
					sjzt: '1',
					xy: '',
					hlsjid: '',
				},
				fileList2: [],
				rules: {
					sjmc: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					bgsj: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					sjwz: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					xcqk: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					}
				},
				// eventId:'',
				// latitude:'',
				// longitude:'',
				ceshiData: []
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '应急事件'
			})
			this.init()
			this.getSite()
		},
		methods: {
			getUrl() {
				return `${config.apiUrl}/business/attach/upload`
			},
			fileDelete(val){
				console.log(val.del.id)
			},
			uploadSuccess(res) { //上传成功
				console.log(res)
				var _res = JSON.parse(res.data);
				if (_res.code == 200) {
					let fileType = _res.data.wjlx.split('/')[1]
					let type = 1 // 0 图片  1视频
					console.log(fileType)
					if (/(gif|jpg|jpeg|png|gif|jpg|png)$/i.test(fileType)) {
						console.log(fileType)
						type = 0
					}
					let url = this.getImg(_res.data.id)
					this.ceshiData.push({
						url,
						type,
						id: _res.data.id
					});
				}
				console.log(this.ceshiData)
			},
			getImg(id) {
				return config.apiUrl + '/business/attach/view/' + id
			},
			init() {
				let params = {
					time: new Date().getTime()
				}
				getEventId(params).then(res => {
					console.log(res)
					this.formData.hlsjid = res.data
				})
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
						// that.latitude = latitude
						// that.longitude = longitude
						that.formData.xy = longitude + ',' + latitude
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
							that.formData.sjwz = sjwz
						})
					}
				})
			},
			deleteFile(files) {
				let index = this.fileList2.findIndex(v => v.uuid === files.tempFile.uuid)
				let item = this.fileList2.splice(index, 1)[0]
				for (let i = 0; i < this.formData.attIds.length; i++) {
					if (this.formData.attIds[i] == item.fileId) {
						this.formData.attIds.splice(i, 1)
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
							// console.log('success', result);
							that.fileList.push(file)
							that.fileList2.push({
								...file,
								fileId: result.data.id
							})
							that.formData.attIds.push(result.data.id)
						}
					}
				});
			},
			formSubmit() {
				this.$refs['valiForm'].validate().then(res => {
					let attIds = []
					this.ceshiData.forEach(v => {
						attIds.push(v.id)
					})
					let params = {
						...this.formData,
						attIds
					}
					addUrgentEvent(params).then(res => {
						if (res.code === 200) {
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
					})
					console.log('success', res);
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

	/deep/.time_box .uni-icons {
		display: none;
	}

	/deep/ .uni-icons {
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
