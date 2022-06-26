<template>
	<view class="wrap">
		<view class="tabs_wrap">
			<view :class="{'active':i===active,'tab_item':true}" @click="tabChange(i)" v-for="(v,i) in tabs" :key="i">
				{{v}}
			</view>
		</view>
		<view class="list_wrap" v-if="active == 0">
			<view class="list_item" v-for="(v,i) in list" :key="i" @click="gotoDetails(v)">
				<view class="height22">
					<view class="event_name">{{v.sjmc}}</view>
					<view class="level"></view>
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
					<view class="img_wrap" v-for="(val,index) in v.attIds" @click.stop="prevImg(v.attIds,index)"
						v-if="index <3" :key="index">
						<image :src="getImg(val)"></image>
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
					<view class="level"></view>
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
					<view class="img_wrap" v-for="(val,index) in v.picIds.split(',')" v-if="index <3"
						@click.stop="prevImg(v.picIds.split(','),index)" :key="index">
						<image :src="getImg(val)"></image>
					</view>
					<view class="position_num" v-if="v.picIds.split(',').length > 3">
						+{{v.picIds.split(',').length}}
					</view>
				</view>
			</view>
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
				active: 0,
				tabs: ['应急事件', '常规事件'],
				title: 'Hello',
				list: [],
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
				this.init()
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
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
					ascs:'bgsj'
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
					ascs:'timestamp'
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
	.site{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.event_name{
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
</style>
