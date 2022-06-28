<template>
	<view class="home_wrap">
		<view class="content">
			<template v-if="id">
				<view class="news_item">
					<view class="title">
						<view style="display: flex;align-items: center;">
							<view v-if="details.sjdj == 1" class="sjdj_wrap">预发布</view>
							<view v-else-if="details.sjdj == 2" class="sjdj_wrap" style="background: #2675FF;">进行中</view>
							<view v-else-if="details.sjdj == 3" class="sjdj_wrap" style="background: #FF4166;">受阻</view>
							<view v-else-if="details.sjdj == 4" class="sjdj_wrap" style="background: #FFB302;">暂缓</view>
							<view class="event_name">{{details.sjmc}}</view>
						</view>
						<!-- <view class="point">领导关注</view> -->
						<view class="level" v-if="details.sjdj == '1'" style="background: url('../../static/A2x.png')">
							A级
						</view>
						<view class="level" v-else-if="details.sjdj == '2'"
							style="background: url('../../static/B2x.png')">
							B级</view>
						<view class="level" v-else-if="details.sjdj == '3'"
							style="background: url('../../static/C2x.png')">
							C级</view>
						<view class="level" v-else style="background: url('../../static/D2x.png')">D级</view>
					</view>
					<view class="height22">
						<image src="@/static/time.png"></image>
						<uni-dateformat :date="details.bgsj"></uni-dateformat>
					</view>
					<view class="height22" style="margin-bottom: 10px;">
						<image src="@/static/site.png"></image> {{details.sjwz}}
					</view>
					<view class="line"></view>
					<view class="text">
						{{details.xcqk}}
					</view>
				</view>
				<template v-if="attachList.length >0">
					<view class="view_head">
						<view>图片/视频</view>
						<!-- 	<view class="seeAll">查看全部<image src="../../static/right.png"></image>
						</view> -->
					</view>
					<view class="img_list">
						<view class="img_wrap" v-for="(val,index) in attachList" :key="index">
							<template v-if="isVideo(val.wjlx)">
								<!-- #ifndef APP-PLUS -->
								<video :disabled="false" :controls="false" :src="getImg(val.id)">
									<cover-view class="image-upload-Item-video-fixed"
										@click.stop="previewVideo(getImg(val.id))">
									</cover-view>
								</video>
								<!-- #endif -->
								<!-- #ifdef APP-PLUS -->
								<view class="image-upload-Item-video-fixed" @click.stop="previewVideo(getImg(val.id))">
								</view>
								<image mode="widthFix" :src="appVideoPoster" />
								<!-- #endif -->
							</template>
							<image v-else :src="getImg(val.id)" @click.stop="prevImg(attachList,val)"></image>
						</view>
					</view>
				</template>
			</template>
			<NormalInfo v-else :details="normalInfo"></NormalInfo>



			<view class="view_head">
				<view>讨论区</view>
			</view>
			<view class="send_shade">
				<view class="send_wrap">
					<uni-easyinput @focus="toggle" type="textarea" :clearable="false" :inputBorder="false"
						v-model="commentText" placeholder="发表内容" />
					<!-- <view class="send_btn" @click="sendMessage">发送</view> -->
				</view>
				<Comment v-if="list.length > 0" @send="toggle" :list="list" :id="this.id"></Comment>
			</view>

			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="send_wrap">
					<!-- <uni-forms-item name="name">
						
					</uni-forms-item> -->
					<uni-easyinput :focus="true" type="textarea" :clearable="false" :inputBorder="false"
						v-model="commentText" placeholder="发表内容" />
					<view class="send_btn" @click="sendMessage">发送</view>
				</view>
			</uni-popup>
		</view>
		<view class="preview-full" v-if="previewVideoSrc!=''">
			<video :autoplay="true" :src="previewVideoSrc" :show-fullscreen-btn="false">
				<cover-view class="preview-full-close" @click="previewVideoClose"> ×
				</cover-view>
			</video>
		</view>
	</view>
</template>

<script>
	import config from "@/config.js"
	import Comment from "./comment"
	import NormalInfo from "./normalInfo.vue"
	import {
		addMsg,
		msgList,
		getUrgentEventDetails
	} from "@/api.js"
	export default {
		components: {
			Comment,
			NormalInfo
		},
		data() {
			return {
				appVideoPoster: '/static/htz-image-upload/play.png',
				title: 'Hello',
				list: [],
				attachList: [],
				details: {},
				id: '',
				pageParams: {
					current: 1,
					size: 10,
				},
				totalPage: 99,
				hfnrItem: {},
				commentText: '',
				userInfo: uni.getStorageSync('userinfo'),
				normalInfo: {},
				previewVideoSrc: '',
			}
		},
		onReachBottom() {
			this.pageParams.current++;
			if (this.pageParams.current > this.totalPage) {
				uni.hideNavigationBarLoading();
			} else {
				this.getMsgList();
			}
		},
		onLoad(options) {
			console.log('1', options)
			if (options.id) {
				this.id = options.id
				this.init()
				this.getMsgList()
			} else {
				this.normalInfo = JSON.parse(options.data)
				console.log(this.normalInfo)
				this.getMsgList()
			}
		},
		methods: {
			previewVideo(src) {
				this.previewVideoSrc = src;
			},
			previewVideoClose() {
				this.previewVideoSrc = ''
			},
			isVideo(item) {
				let isPass = false
				if (!/(gif|jpg|jpeg|png|gif|jpg|png)$/i.test(item)) {
					isPass = true
				}
				return isPass
			},
			prevImg(items, val) {
				console.log(items)
				let ids = []
				let index = 0
				let imgs = items.filter(v => !this.isVideo(v.wjlx))
				imgs.forEach((v, i) => {
					ids.push(this.getImg(v.id))
					if (val.id == v.id) {
						index = i
					}
				})
				let obj = {
					current: index,
					urls: ids
				}
				console.log(ids)
				uni.previewImage(obj)
			},
			sendMessage() {
				let params = {
					attIds: [],
					hfnr: this.hfnrItem.fsnr ? this.hfnrItem.fsnr : '',
					fsnr: this.commentText, //发送内容
					fsr: this.userInfo.role_name, // 回复内容
					sjid: this.id ? this.id : this.normalInfo.objectid, // 事件id
				}
				addMsg(params).then(res => {
					console.log(res)
					this.commentText = ''
					this.$refs.popup.close()
					this.pageParams = {
						current: 1,
						size: 10,
					}
					this.list = []
					this.getMsgList()
				})
			},
			getMsgList() {
				let params = {
					...this.pageParams,
					sjid: this.id ? this.id : this.normalInfo.objectid,
				}
				console.log(params)
				msgList(params).then(res => {
					this.list.push(...res.data.records)
					this.totalPage = res.data.pages
				})
			},
			toggle(val) {
				console.log('toggle', val)
				this.hfnrItem = val
				// this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.commentText = ''
				this.$refs.popup.open('bottom')
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			getImg(id) {
				return config.apiUrl + '/business/attach/view/' + id
			},
			init() {
				console.log(this.id)
				getUrgentEventDetails(this.id).then(res => {
					if (res.code == 200) {
						this.details = res.data.emergency
						this.attachList = res.data.attachList
					}
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
	}

	.home_wrap {
		height: 100%;
		width: 100%;
		/* background: linear-gradient(to bottom right,#199AFF,#FFFFFF); */
		background: #EEF2F6;
		/* background-color: ; */
		font-size: 13px;
		padding: 10px;
		box-sizing: border-box;
		overflow: auto;
	}

	.content {
		margin: 0 10px;
		// overflow: auto;
		// height: 100%;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px
	}

	.opacity {
		margin-top: 10px;
		opacity: 0.8;
	}

	.list_box {
		background-color: #EEF2F6;
	}

	.news_head {
		margin: 10px 0;
		font-size: 20px;
	}

	.news_item {
		background: #FFFFFF;
		border-radius: 9px;
		padding: 16px 12px;
	}

	.event_name {
		font-size: 16px;
		font-weight: 500;
		color: #1D2732;
	}

	.point {
		color: #0175FE;
		border: 1px solid #0175FE;
		border-radius: 2px;
		height: 18px
	}

	.level {
		width: 40px;
		height: 18px;
		line-height: 20px;
		border-radius: 2px;
		text-align: center;
		color: #FFFFFF;
		font-size: 13;
	}

	.news_item image {
		width: 14px;
		height: 14px;
		margin-right: 4px;
		flex-shrink: 0;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.line {
		width: 100%;
		height: 1px;
		background: #E4E9EE;
	}

	.text {
		margin: 10px 0 0;
		font-size: 15px;
		color: #4E5E72;
	}

	.view_head {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 600;
		color: #1D2732;
	}

	.view_head .seeAll {
		display: flex;
		align-items: center;
		font-size: 13px;
		font-weight: 400;
		color: #9EAEC1;
	}

	.seeAll image {
		width: 13px;
		height: 13px;
	}

	.img_list {
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		padding: 10px;
		border-radius: 10px;
	}

	.img_list .img_wrap {
		width: 32%;
		margin-right: 1%;
		margin-top: 4px;
		height: 0;
		padding-top: 32%;
		border-radius: 4px;
		position: relative;
	}

	.img_list .img_wrap image {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
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

	.height22 {
		margin: 6px 0;
		display: flex;
		align-items: center;
		font-weight: 400;
		color: #9EAEC1;
		font-size: 13px;
		// justify-content:space-between
	}

	.example-body {
		width: 100%;
		// padding: 20px;
	}

	.user_sidebar {
		font-size: 26px;
		height: 90px;
		display: flex;
		padding: 0 20px;
		align-items: center;
		border-bottom: 1px solid #E4E9EE;
	}

	.height60 {
		height: 60px;
		// width: 300px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 20px;
		font-size: 18px;
		border-bottom: 1px solid #E4E9EE;
	}

	.scroll-view {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1
	}

	// 处理抽屉内容滚动
	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.send_shade {
		// height: 100%;
		background-color: white;
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.send_wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
	}

	/deep/.uni-textarea-wrapper {
		background: #EFF3F7;
		border-radius: 4px;

		/* width: 80%; */
	}

	/deep/.uni-easyinput__placeholder-class {
		padding: 10px;
		box-sizing: border-box;
	}

	/deep/.uni-textarea-textarea {
		padding: 10px;
		box-sizing: border-box;
	}

	.send_btn {
		width: 80px;
		flex-shrink: 0;
		font-size: 18px;
		font-weight: 400;
		text-align: center;
		color: #9EAEC1;

	}

	.image-upload-Item-video-fixed {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		z-index: 996;
	}

	.img_wrap video {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	.preview-full {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1002;
	}

	.preview-full video {
		width: 100%;
		height: 100%;
		z-index: 1002;
	}

	.preview-full-close {
		position: fixed;
		right: 32rpx;
		top: 25rpx;
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		z-index: 1003;
		color: #fff;
		font-size: 65rpx;
		font-weight: bold;
	}

	.level {
		width: 40px;
		height: 18px;
		line-height: 20px;
		border-radius: 2px;
		text-align: center;
		color: #FFFFFF;
		font-size: 13;
		flex-shrink: 0;
	}

	.sjdj_wrap {
		padding: 2px 4px;
		margin-right: 4px;
		font-size: 12px;
		text-align: center;
		background: #9EAEC1;
		border-radius: 4px;
		color: white;
		flex-shrink: 0;
	}
</style>
