<template>
	<view class="wrap">
		<normal></normal>
	</view>
</template>



<script>
	import Normal from '@/pages/event/publishNormal.vue'
	export default {
		components: {
			Normal
		},
		data() {
			return {
				formData: {
					name: '',
					time: '',
					area: '',
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

	// /deep/.is-input-border{
	// 	border: none;
	// }
	/deep/.is-input-error-border .uni-easyinput__placeholder-class {
		color: grey;
	}

	/deep/.uni-easyinput__content-input {
		padding-left: 0px !important;
	}

	/deep/.uni-forms-item__inner {
		border-bottom: 1px solid #E4E9EE;
		padding-bottom: 4px;
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
