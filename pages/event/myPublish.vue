<template>
	<view class="wrap">
		<view class="tabs_wrap">
			<view :class="{'active':i===active,'tab_item':true}" @click="tabChange(i)" v-for="(v,i) in tabs" :key="i">
				{{v}}
			</view>
		</view>
		<view class="list_wrap" v-if="active == 0">
			<view class="list_item" v-for="(v,i) in list" :key="i" @click="gotoDetails(v)">
				<view class="height22" style="height: 24px;">
					<view v-if="v.sjdj == 1" class="sjdj_wrap">预发布</view>
					<view v-else-if="v.sjdj == 2" class="sjdj_wrap" style="background: #2675FF;">进行中</view>
					<view v-else-if="v.sjdj == 3" class="sjdj_wrap" style="background: #FF4166;">受阻</view>
					<view v-else-if="v.sjdj == 4" class="sjdj_wrap" style="background: #FFB302;">暂缓</view>
					<view class="event_name">{{v.sjmc}}</view>
					<view class="level" v-if="v.sjdj == '1'" style="background: url('../../static/A2x.png')">A级
					</view>
					<view class="level" v-else-if="v.sjdj == '2'" style="background: url('../../static/B2x.png')">
						B级</view>
					<view class="level" v-else-if="v.sjdj == '3'" style="background: url('../../static/C2x.png')">
						C级</view>
					<view class="level" v-else-if="v.sjdj == '4'" style="background: url('../../static/D2x.png')">D级
					</view>
				</view>
				<view class="height22">
					<image src="@/static/time.png"></image>
					<uni-dateformat :date="v.bgsj"></uni-dateformat>
				</view>
				<view class="height22">
					<image src="@/static/site.png"></image>
					<view class="site">{{v.sjwz}}</view>
				</view>
				<view class="img_list">
					<view class="img_wrap" v-for="(val,index) in v.attachList" v-if="index <3" :key="index">
						<template v-if="isVideo(val.wjlx,index)">
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
							<image style="width: 100%;height: 100%;" mode="widthFix" :src="appVideoPoster">
							</image>
							<!-- #endif -->
						</template>
						<image v-else :src="getImg(val.id)" @click.stop="prevImg(v.attachList,val)"></image>
					</view>
					<view class="position_num" v-if="v.attIds.length > 3">
						+{{v.attIds.length}}
					</view>
				</view>
			</view>
		</view>
		<view class="list_wrap" v-if="active == 1">
			<view class="list_item" v-for="(v,i) in list" :key="i" @click="gotoDetails(v)">
				<view class="height22 event_name">
					<view class="event_name">{{v.content}}</view>
					<!-- <view class="level"></view> -->
				</view>
				<view class="height22">
					<image src="@/static/time.png"></image>
					<uni-dateformat :date="parseInt(v.timestamp)"></uni-dateformat>
				</view>
				<view class="height22">
					<image src="@/static/site.png"></image>
					<view class="site">{{v.addr}}</view>
				</view>
				<view class="img_list">
					<!-- {{v.picIds.split(',')}} -->
					<view class="img_wrap" v-for="(val,index) in v.picIds.split(',')" v-if="v.picIds && index <3"
						:key="index">
						<template v-if="isVideo(v.picAttr.split(',')[index])">
							<!-- #ifndef APP-PLUS -->
							<video :disabled="false" :controls="false" :src="getImg(val)">
								<cover-view class="image-upload-Item-video-fixed"
									@click.stop="previewVideo(getImg(val))">
								</cover-view>
							</video>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<view class="image-upload-Item-video-fixed" @click.stop="previewVideo(getImg(val))">
							</view>
							<image style="width: 100%;height: 100%;" mode="widthFix" :src="appVideoPoster">
							</image>
							<!-- #endif -->
						</template>
						<image v-else :src="getImg(val)" @click.stop="prevImg2(v,val)"></image>
					</view>
					<view class="position_num" v-if="v.picIds.split(',').length > 3">
						+{{v.picIds.split(',').length}}
					</view>
				</view>
			</view>
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
	import {
		addMsg,
		msgList,
		getNormalEventList,
		getUrgentEventList
	} from "@/api.js"
	import config from "@/config.js"
	export default {
		data() {
			return {
				appVideoPoster:'/static/htz-image-upload/play.png',
				active: 0,
				tabs: ['应急事件', '常规事件'],
				title: 'Hello',
				list: [],
				pageParams: {
					current: 1,
					size: 10,
				},
				totalPage: 99,
				previewVideoSrc: '',
			}
		},
		onPullDownRefresh() {
			this.pageParams = {
				current: 1,
				size: 10,
			}
			this.totalPage = 99
			this.list = []
			this.init();
			uni.stopPullDownRefresh()
			// console.log('111')
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
		onLoad() {
			this.init()
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
			isVideo2(item) {
				let picAttr = item.picAttr
				let isPass = false
				if (!/(gif|jpg|jpeg|png|gif|jpg|png)$/i.test(item)) {
					isPass = true
				}
				return isPass
			},
			prevImg(items, val) {
				let ids = []
				let index = 0
				let imgs =  items.filter(v=>!this.isVideo(v.wjlx))
				imgs.forEach((v,i) => {
					ids.push(this.getImg(v.id))
					if(val.id == v.id){
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
			prevImg2(item, id) {
				let ids = item.picIds.split(',')
				let fileTypes = item.picAttr.split(',')
				fileTypes.forEach((v,i) => {
					if(!this.isVideo(v)){
						ids.splice(i,1)
					}
					// ids.push(this.getImg(v))
				})
				let urls = []
				let current = 0
				ids.forEach((v,i)=>{
					if(id == v.id){
						current = i
					}
					ids.push(this.getImg(v))
				})
				let obj = {
					current,
					urls
				}
				// console.log(ids)
				uni.previewImage(obj)
			},
			init() {
				console.log(this.active, typeof this.active)
				if (this.active == 0) {
					this.getList1()
				} else if (this.active == 1) {
					this.getList()
				}
			},
			gotoDetails(v) {
				if (this.active == 1) {
					uni.navigateTo({
						url: '/pages/event/details?data=' + JSON.stringify(v),
					});
				} else {
					let id = v.id
					uni.navigateTo({
						url: '/pages/event/details?id=' + id,
					});
				}

			},
			getList1() {
				let params = {
					...this.pageParams,
					descs: 'bgsj'
				}
				getUrgentEventList(params).then(res => {
					console.log(res)
					if (res.code === 200) {
						this.list.push(...res.data.records)
						this.totalPage = res.data.pages
					}
				})
			},
			getList() {
				// console.log(data.data.code)
				let params = {
					...this.pageParams,
					descs: 'timestamp',
					// user_id:Number(uni.getStorageSync('userinfo').user_id)
				}
				getNormalEventList(params).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.list.push(...res.data.records)
						this.totalPage = res.data.pages
					}
					console.log(this.list)
				})
			},
			getImg(id) {
				return config.apiUrl + '/business/attach/view/' + id
			},
			tabChange(i) {
				this.active = i
				this.pageParams = {
					current: 1,
					size: 10,
				}
				this.totalPage = 99
				this.list = []
				this.init()
				// this.list = this.list.concat(this.list)
			}
		}
	}
</script>

<style lang="scss">
	page {
		// height: 100%;
	}

	.wrap {
		width: 100%;
		height: 100%;
		// display: flex;
		// flex-direction: column;
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
		// display: flex;
		// flex-direction: column;
		width: 100%;
		height: 100%;
		// overflow: auto;
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
		margin-top: 4px;
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



	.height22 {
		height: 22px;
		display: flex;
		align-items: center;
		width: 100%;
		overflow: hidden;
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

	// .event_name view{

	// }
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
		width: 80rpx;
		height: 80rpx;
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
	.sjdj_wrap{
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
