<template>
	<view class="home_wrap">
		<view class="content">
			<view class="news_item" v-for="(v,i) in list" :key="i">
				<view class="title">
					<view>{{v.title}}</view>
					<view class="point">领导关注</view>
					<view class="level" style="background: url('../../static/A级@2x.png')">A级</view>
				</view>
				<view class="height22">
					<image src="@/static/time.png"></image>{{v.time}}
				</view>
				<view class="height22" style="margin-bottom: 10px;">
					<image src="@/static/site.png"></image> {{v.site}}
				</view>
				<view class="line"></view>
				<view class="text">
					{{v.text}}
				</view>
			</view>
			<view class="view_head">
				<view>图片/视频</view>
				<view class="seeAll">查看全部<image src="../../static/right.png"></image></view>
			</view>
			<view class="img_list">
				<view class="img_wrap">
					<image src="../../static/A级@2x.png"></image>
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
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list: [{
						title: '浏阳河隧道积水3人被困车顶',
						time: '2022-05-12 10:12备份',
						site: '浏阳河隧道南往北方向隧道内距离出口100',
						text:'一辆白色保时捷SUV被积水淹没至车窗一辆白色保时捷SUV被积水淹没至车窗一辆白色保时捷SUV被积水淹没至车窗一辆白色保时捷SUV被积水淹没至车窗一辆白色保时捷SUV被积水淹没至车窗',
						img: [1, 2, 3]
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		},
	}
</script>

<style scoped lang="scss">
	.home_wrap {
		height: 100%;
		width: 100%;
		/* background: linear-gradient(to bottom right,#199AFF,#FFFFFF); */
		background: #EEF2F6;
		/* background-color: ; */
		font-size: 13px;
		padding: 10px;
		box-sizing: border-box;
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
	.point{
		color:#0175FE;
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
	}
	.title{
		height: 22px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.line{
		width: 100%;
		height: 1px;
		background: #E4E9EE;
	}
	.text{
		margin: 10px 0 0;
		font-size: 15px;
		color: #4E5E72;
	}
	.view_head{
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 600;
		color: #1D2732;
	}
	.view_head .seeAll{
		display: flex;
		align-items: center;
		font-size: 13px;
		font-weight: 400;
		color: #9EAEC1;
	}
	.seeAll image{
		width: 13px;
		height: 13px;
	}
	.img_list {
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		justify-content: space-between;
		padding: 10px;
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
		// justify-content:space-between
	}

	.example-body {
		width: 100%;
		// padding: 20px;
	}
	.user_sidebar{
		font-size: 26px;
		height: 90px;
		display: flex;
		padding: 0 20px;
		align-items: center;
		border-bottom: 1px solid #E4E9EE;
	}
	.height60{
		height: 60px;
		// width: 300px;
		display: flex;
		justify-content:space-between;
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
