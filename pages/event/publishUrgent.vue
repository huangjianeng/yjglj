<template>
	<view class="wrap">
		<view class="form_content">
			<uni-forms ref="valiForm" :modelValue="formData" :rules="rules" labelPosition="top" labelWidth="300">
				<view class="area_form">
					<view class="uni-form-item uni-column">
						<view class="value_wrap">
							<uni-forms-item name="name" label="事件名称" required>
								<uni-easyinput :inputBorder="false" clearable v-model="formData.name"
									placeholder="请输入事件名称"></uni-easyinput>
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="time" label="发生时间" required>
								<uni-datetime-picker v-model="formData.time" placeholder="请选择事件发生时间" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="area" label="详细地址" required>
								<uni-easyinput :inputBorder="false" clearable suffixIcon="location"
									v-model="formData.area" placeholder="如区、街道、桥、路等" />
							</uni-forms-item>
						</view>
					</view>
				</view>
				<view class="area_form">
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="content" label="现场状况" required>
								<uni-easyinput :inputBorder="false" clearable type="textarea" v-model="formData.content"
									placeholder="请对现场基本状况进行描述" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="textarea" label="主要工作目标/需求">
								<uni-easyinput :inputBorder="false" clearable type="textarea"
									v-model="formData.textarea" placeholder="请输入工作目标/需求 1. 2. …" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="value_wrap ">
							<uni-forms-item name="textarea" label="图片/视频">
								<view class="value_wrap">
									<!-- 									<u-upload
										:fileList="fileList"
										@afterRead="afterRead"
										@delete="deletePic"
										name="5"
										multiple
										:maxCount="3"
									></u-upload> -->
									<uni-file-picker :auto-upload="false" @select="selectFile" v-model="fileList">
									</uni-file-picker>
								</view>
							</uni-forms-item>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button @click="formSubmit">发布事件</button>
				</view>
			</uni-forms>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				formData: {
					name: '1',
					time: '2',
					area: '3',
					content: '4',
					textarea: '',
					imageValue: [],
				},
				fileList: [],
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					time: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					area: {
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
					}
				},
			}
		},
		methods: {
			selectFile(files) {
				console.log(files)
				files.tempFilePaths.pop()
				const file = files.tempFiles.pop();
				this.fileList.push(file)
			},
			bindTimeChange() {

			},
			formSubmit() {
				this.$refs['valiForm'].validate().then(res => {
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

	/deep/.uni-icons {
		display: none;
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
