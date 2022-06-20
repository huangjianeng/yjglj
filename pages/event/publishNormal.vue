<template>
	<view class="wrap">
		<view class="form_content">
			<uni-forms ref="valiForm" :modelValue="formData" :rules="rules" label-position="top">
				<view class="area_form">
					<view class="uni-form-item uni-column">
<!-- 						<view class="title">
							<text class="required">*</text>
							事件名称
						</view> -->
						<view class="value_wrap">
							<uni-forms-item name="name" label="事件名称" required>
								<uni-easyinput :inputBorder="false" clearable v-model="formData.name"
									placeholder="请输入事件名称"></uni-easyinput>
								<!-- <uni-easyinput v-model="formData.name"  placeholder="请输入事件名称" ></uni-easyinput> -->
								<!-- <input class="uni-input" v-model="formData.name" maxlength="20" placeholder="请输入事件名称" /> -->
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
	<!-- 					<view class="title">
							<text class="required">*</text>
							发生时间
						</view> -->
						<view class="value_wrap">
							<uni-forms-item name="time" label="事件名称" required>
								<uni-datetime-picker v-model="formData.time" placeholder="请选择事件发生时间" />
							</uni-forms-item>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<text class="required">*</text>
							详细地址
						</view>
						<uni-forms-item name="area" label="事件名称" required>
							<uni-easyinput  :inputBorder="false" clearable suffixIcon="location" v-model="formData.area"
								placeholder="如区、街道、桥、路等" />
						</uni-forms-item>
					</view>
				</view>
				<view class="area_form">
					<view class="uni-form-item uni-column">
						<view class="title">
							<text class="required">*</text>
							现场状况
						</view>
						<uni-forms-item name="content">
							<uni-easyinput :placeholderStyl="placeholderStyl" style="height: 50px;" :inputBorder="false" clearable type="textarea"
								v-model="formData.content" placeholder="请对现场基本状况进行描述" />
							<!-- <textarea style="height: 50px;" v-model="formData.content" placeholder="" /> -->
						</uni-forms-item>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<!-- <text class="required">*</text> -->
							主要工作目标/需求
						</view>
						<view class="uni-textarea value_wrap">
							<uni-easyinput style="height: 50px;" :inputBorder="false" clearable type="textarea"
								v-model="formData.textarea" placeholder="请输入工作目标/需求 1. 2. …" />
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<!-- <text class="required">*</text> -->
							图片/视频
						</view>
						<view class="value_wrap">
							<uni-file-picker v-model="formData.imageValue"></uni-file-picker>
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
				placeholderStyl:{
					color:'grey',
					fontWeight:500,
				},
				formData: {
					name: '1',
					time: '2',
					area: '3',
					content: '4',
					textarea: '',
					imageValue: [],
				},
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
			bindTimeChange() {

			},
			formSubmit() {
				this.$refs['valiForm'].validate().then(res => {
					console.log('success', res);
				}).catch(err => {
					console.log('err', err);
				})
				console.log(this.formData)
				// var formdata = e.detail.value
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
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

	.value_wrap {
		font-size: 13px;
		padding: 6px 0 10px;
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

	.uni-textarea-placeholder {
		font-weight: 500;
	}

	/deep/.is-input-error-border .uni-easyinput__placeholder-class {
		color: grey;
	}

	/deep/.uni-easyinput__content-input {
		padding-left: 0px !important;
	}

	/deep/.uni-forms-item__inner {
		// border-bottom: 1px solid #E4E9EE;
		// padding-bottom: 4px;
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
