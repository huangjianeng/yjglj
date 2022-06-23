<template>
	<view class="wrap">
		<view class="tabs_wrap">
			<view :class="{'active':i===active,'tab_item':true}" @click="tabChange(i)" v-for="(v,i) in tabs" :key="i">
				{{v}}
			</view>
		</view>
		<view class="list_wrap">
			<view class="list_item" v-for="(v,i) in list" :key="i">
				<image v-if="v.bt === '事件消息'" src="@/static/yq@2x.png"></image>
				<image v-else-if="v.bt === '留言消息'" src="@/static/tl@2x.png"></image>
				<view>
					<view class="content">{{v.nr}}</view>
					<view class="time">
						<uni-dateformat :date="parseInt(v.sj)"></uni-dateformat>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		systemMsgList
	} from "@/api.js"
	export default {
		data() {
			return {
				active: 0,
				tabs: ['全部消息', '邀请通知', '讨论区'],
				title: 'Hello',
				list: [],
				pageParams: {
					current: 1,
					size: 10,
					descs:'sj'
				},
				totalPage: 99,
			}
		},
		onLoad() {
			this.init()
		},
		onReachBottom() {
			this.pageParams.current++;
			if (this.pageParams.current > this.totalPage) {
				uni.hideNavigationBarLoading();
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				this.init()
			}
		},
		methods: {
			init() {
				// ly:bt
				// DD("1", "调度消息"),
				// SJ("2", "事件消息"),
				// HS("3", "会商消息"),
				// LY("4", "留言消息"),
				// SYS("5", "系统消息");
				let params = {
					...this.pageParams
				}
				if (this.active == 1) {
					params.lx = 2
				} else if (this.active == 2) {
					params.lx = 4
				} else {
					params.lx_in = '2,4'
				}
				systemMsgList(params).then(res => {
					console.log(res)
					this.list.push(...res.data.records)
					this.totalPage = res.data.pages
				})
			},
			tabChange(i) {
				this.active = i
				this.pageParams = {
					current: 1,
					size: 10,
					descs:'sj'
				}
				this.totalPage = 99
				this.list = []
				this.init()
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tabs_wrap {
		height: 50px;
		border-bottom: 1px solid #E4E9EE;
		color: #4E5E72;
		font-size: 20px;
		display: flex;
		align-items: center;
		width: 100%;
	}

	.tab_item {
		padding: 0 16px;
	}

	.active {
		font-weight: 600;
		color: #1D2732;
	}

	.list_wrap {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0 10px 10px;
		box-sizing: border-box;
	}

	.list_item {
		border-bottom: 1px solid #E4E9EE;
		padding: 10px 0;
		display: flex;
		align-items: center;
	}

	.list_item image {
		width: 50px;
		height: 50px;
		flex-shrink: 0;
		margin-right: 10px;
	}

	.content {
		font-size: 15px;
		font-weight: 400;
		color: #1D2732;
	}

	.time {
		margin-top: 10px;
		font-size: 13px;
		font-weight: 400;
		color: #9EAEC1;
	}
</style>
