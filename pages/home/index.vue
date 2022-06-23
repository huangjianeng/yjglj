<template>
	<view class="home_wrap">
		<view class="content">
			<view class="header">
				<view @click="showDrawer('showLeft')" class="user font24">Hello！{{userInfo.role_name}}<span
						class="font12">></span></view>
				<view class="mes_box">
					<image @click="gotoMessage" src="@/static/message.png"></image>
				</view>
			</view>
			<view class="event_enter">
				<view class="yj" @click="eventPulish(1)">
					<view class="font18">应急事件</view>
					<view class="opacity">紧急事件发布入口</view>
					<image src="@/static/yjsj.png" />
				</view>
				<view class="cg" @click="eventPulish(2)">
					<view class="font18">常规事件</view>
					<view class="opacity">常规事件发布入口</view>
					<image src="@/static/cgsj.png" />
				</view>
			</view>
			<view class="news_wrap">
				<view class="news_head">应急事件</view>
				<view class="news_item" @click="gotoDetails(v)" v-for="(v,i) in list" :key="i">
					<view class="height22" style="justify-content: space-between;">
						<view class="event_name">{{v.sjmc}}</view>
						<!-- <view class="level"></view> -->
						<view class="level" v-if="v.sjdj == '1'" style="background: url('../../static/A级@2x.png')">A级
						</view>
						<view class="level" v-else-if="v.sjdj == '2'" style="background: url('../../static/B级@2x.png')">
							B级</view>
						<view class="level" v-else-if="v.sjdj == '3'" style="background: url('../../static/C级@2x.png')">
							C级</view>
						<view class="level" v-else style="background: url('../../static/D级@2x.png')">D级</view>
					</view>
					<view class="height22">
						<image src="@/static/time.png"></image>
						<uni-dateformat :date="v.cjsj"></uni-dateformat>
					</view>
					<view class="height22">
						<image src="@/static/site.png"></image>
						<view class="site">{{v.sjwz}}</view>
					</view>
					<view class="img_list">
						<view class="img_wrap" v-for="(val,index) in v.attIds" @click.stop="prevImg(v.attIds,index)"
							:key="index" v-if="index <3">
							<image :src="getImg(val)"></image>
						</view>
						<view class="position_num" v-if="v.attIds.length > 3">
							+{{v.attIds.length}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event,'showLeft')">
			<view class="example-body">
				<view>
					<view class="user_sidebar">Hello！{{userInfo.role_name}}</view>
					<view class="height60" @click="gotoMessage">
						<view>消息中心</view>
						<view>></view>
					</view>
					<view class="height60" @click="gotoMyPublish">
						<view>我参与的事件</view>
						<view>></view>
					</view>
				</view>
				<view class="close">
					<button @click="logout">退出登录</button>
				</view>
			</view>
		</uni-drawer>
		<!-- 		<uni-section title="左侧弹出" type="line">


		</uni-section> -->
	</view>
</template>

<script>
	import config from "@/config.js"
	import {
		getUrgentEventList
	} from "@/api.js"
	export default {
		data() {
			return {
				title: 'Hello',
				list: [],
				userInfo: uni.getStorageSync('userinfo'),
				pageParams: {
					current: 1,
					size: 10,
				},
				totalPage: 99,
			}
		},
		onReachBottom() {
			this.pageParams.current++;
			if (this.pageParams.current > this.totalPage) {
				uni.hideNavigationBarLoading();
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				this.init();
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				getUrgentEventList(this.pageParams).then(res => {
					console.log(res)
					if (res.code === 200) {
						this.list.push(...res.data.records)
						this.totalPage = res.data.pages
					}
				})
			},
			prevImg(item, index) {
				let ids = []
				item.forEach(v => {
					ids.push(this.getImg(v))
				})
				let obj = {
					current: index,
					urls: ids
				}
				console.log(ids)
				uni.previewImage(obj)
			},
			logout() {
				uni.removeStorageSync('userinfo')
				uni.clearStorageSync();
				this.$refs.showLeft.close()
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			gotoMyPublish() {
				uni.navigateTo({
					url: '/pages/event/myPublish',
				});
			},
			gotoMessage() {
				uni.navigateTo({
					url: '/pages/my/message',
				});
			},
			eventPulish(type) {
				console.log(type)
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/event/publishUrgent',
					});
				} else {
					uni.navigateTo({
						url: '/pages/event/publishNormal',
					});
				}

			},
			gotoDetails(v) {
				console.log(uni)
				uni.navigateTo({
					url: '/pages/event/details?id=' + v.id,
				});
			},
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			getImg(id) {
				return config.apiUrl + '/business/attach/view/' + id
			}
		},
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		},
		// app端拦截返回事件 ，仅app端生效
		onBackPress() {
			if (this.showRight || this.showLeft) {
				this.$refs.showLeft.close()
				this.$refs.showRight.close()
				return true
			}
		}
	}
</script>

<style scoped lang="scss">
	.home_wrap {
		height: 100%;
		width: 100%;
		/* background: linear-gradient(to bottom right,#199AFF,#FFFFFF); */
		background: #EEF2F6 url("@/static/homeBG.png") no-repeat;
		/* background-color: ; */
		font-size: 13px;
	}

	.content {
		margin: 0 10px;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px
	}

	.user {
		display: flex;
		align-items: center;
	}

	.mes_box image {
		width: 20px;
		height: 20px;
	}

	.event_enter {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: white;
	}

	.event_enter image {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 48px;
		height: 48px;
	}

	.event_enter .yj {
		box-sizing: border-box;
		width: 185px;
		height: 82px;
		background: linear-gradient(316deg, #40D4FF 0%, #0074FE 100%);
		border-radius: 9px;
		padding: 10px 10px;
		position: relative;
	}


	.event_enter .cg {
		box-sizing: border-box;
		width: 185px;
		height: 82px;
		background: linear-gradient(314deg, #32EEE2 0%, #00C2E2 100%);
		border-radius: 9px;
		padding: 10px 10px;
		position: relative;
	}

	.opacity {
		margin-top: 10px;
		opacity: 0.8;
	}

	.list_box {
		background-color: #EEF2F6;
	}

	.news_wrap {
		padding-bottom: 2px;
	}

	.news_head {
		margin: 10px 0;
		font-size: 20px;
	}

	.news_item {
		background: #FFFFFF;
		border-radius: 9px;
		padding: 16px 12px;
		margin-bottom: 10px;
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
	}

	.img_list {
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
		margin-top: 4px;
		position: relative;
	}

	.position_num {
		position: absolute;
		color: white;
		right: 10px;
		bottom: 10px;
		width: 20px;
		height: 20px;
		border-radius: 10px;
		font-size: 12px;
		text-align: center;
		line-height: 18px;
		background-color: #4E5E72;
	}

	.img_list .img_wrap {
		width: 32%;
		margin-right: 1%;
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
		height: 22px;
		display: flex;
		align-items: center;
		font-size: 13px;
		font-weight: 400;
		color: #9EAEC1;
	}

	.site {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.event_name {
		font-size: 18px;
		font-weight: 500;
		color: #1D2732;
		width: 90%;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.example-body {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		// padding: 20px;
	}

	.close {
		margin: 30px;
	}

	/deep/.close button {
		width: 132px;
		height: 36px;
		background: #EFF3F7;
		border-radius: 4px;
		font-size: 15px;
		font-weight: 400;
		color: #4E5E72;
	}

	/deep/.close button::after {
		border: none;
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
</style>
