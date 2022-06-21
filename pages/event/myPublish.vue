<template>
	<view class="wrap">
		<view class="tabs_wrap">
			<view :class="{'active':i===active,'tab_item':true}" @click="tabChange(i)" v-for="(v,i) in tabs" :key="i">
				{{v}}
			</view>
		</view>
		<view class="list_wrap">
			<view class="list_item" v-for="(v,i) in list" :key="i">
				<view class="height22">
					<view>{{v.title}}</view>
					<view class="level"></view>
				</view>
				<view class="height22">
					<image src="@/static/time.png"></image>{{v.time}}
				</view>
				<view class="height22">
					<image src="@/static/site.png"></image> {{v.site}}
				</view>
				<view class="img_list">
					<view class="img_wrap">
						<image src="../../static/logo.png"></image>
					</view>
					<view class="img_wrap">
						<image src="../../static/logo.png"></image>
					</view>
					<view class="img_wrap">
						<image src="../../static/logo.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				tabs: ['全部', '应急事件', '常规事件'],
				title: 'Hello',
				list: [{
						title: '浏阳河隧道积水3人被困车顶',
						time: '2022-05-12 10:12备份',
						site: '浏阳河隧道南往北方向隧道内距离出口100',
						img: [1, 2, 3]
					},
					{
						title: '浏阳河隧道积水3人被困车顶',
						time: '2022-05-12 10:12备份',
						site: '浏阳河隧道南往北方向隧道内距离出口100',
						img: [1, 2, 3]
					},
					{
						title: '浏阳河隧道积水3人被困车顶',
						time: '2022-05-12 10:12备份',
						site: '浏阳河隧道南往北方向隧道内距离出口100',
						img: [1, 2, 3]
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			tabChange(i) {
				this.active = i
				this.list = this.list.concat(this.list)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.wrap {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #EEF2F6;
	}

	.tabs_wrap {
		height: 50px;
		color: #4E5E72;
		font-size: 20px;
		display: flex;
		align-items: center;
		width: 100%;
		flex-shrink: 0;
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
		height: 100%;
		overflow: auto;
		padding: 0 10px 10px;
		box-sizing: border-box;
	}

	.list_item {
		padding: 10px;
		// display: flex;
		// align-items: center;
		background-color: white;
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.list_item image {
		width: 50px;
		height: 50px;
		flex-shrink: 0;
		margin-right: 10px;
	}
	.list_item image {
		width: 14px;
		height: 14px;
	}

	.img_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 4px;
	}

	.img_list .img_wrap {
		width: 33%;
		height: 0;
		padding-top: 33%;
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
	.height22 {
		height: 22px;
		display: flex;
		align-items: center;
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
