<template>
	<view class="comment_item">
		<template v-if="level == 1">
			<view class="head">
				<view>{{item.fsr}}</view>
				<view class="time">
					<uni-dateformat :date="item.cjsj"></uni-dateformat>
				</view>
			</view>
			<view class="text">
				{{item.fsnr}}
			</view>
			<view class="reply">
				<view @click="replyComment(item)">
					<image src="@/static/hf@2x.png"></image>回复
				</view>
			</view>
		</template>
		<view class="child_head" v-if="item.childs && item.childs.length > 0 && level == 1">
			<view class="nums"> {{item.childs.length}}条讨论 </view>
			<view class="isOpen" @click="isOpen = !isOpen">
				<template v-if="isOpen">
					收起评论<image src="@/static/shouqi@2x.png"></image>
				</template>
				<template v-if="!isOpen">
					展开评论<image src="@/static/open@2x.png"></image>
				</template>
			</view>
		</view>
		<view class="comment_item_2" v-else-if="level == 2">
			<view>
				<view class="head">
					<view>{{item.fsr}}</view>
					<view class="time">
						<uni-dateformat :date="item.cjsj"></uni-dateformat>
					</view>
				</view>
				<view class="text">
					{{item.fsnr}}
				</view>
				<view class="reply">
					<view @click="replyComment(item)">
						<image src="@/static/hf@2x.png"></image>回复
					</view>
				</view>
			</view>
		</view>
		<comment-item v-if="item.childs && item.childs.length > 0 && isOpen" v-for="(v,i) in item.childs" :item="v"
			:itemIndex="i" :parent="item" level="2">
		</comment-item>
	</view>
</template>

<script>
	export default {
		name: 'comment-item',
		props: {
			// id:{
			// 	typeof:Number | String,
			// },
			itemIndex: {
				type: Number
			},
			item: {
				type: Object
			},
			parent: {
				type: Object
			},
			level: {
				type: String
			}
		},
		data() {
			return {
				title: 'Hello',
				isOpen: true,
			}
		},
		onLoad() {

		},
		methods: {
			replyComment(val) {
				console.log('回复')
				this.$emit('send', val)
				// this.toggle()
			},


		}
	}
</script>

<style>
	.comment_item {}

	page {
		height: 100%;
	}

	.head {
		display: flex;
		height: 30px;
		align-items: center;
		font-size: 13px;
		font-weight: 400;
		color: #9EAEC1;
	}

	.time {
		margin-left: 10px;
	}

	.text {
		font-size: 15px;
		font-weight: 400;
		color: #4E5E72;
		line-height: 15px;
	}

	.reply image {
		width: 18px;
		height: 18px;
		margin-right: 4px;
	}

	.reply {
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: right;
		/* text-align: right; */
	}

	.reply view {
		display: flex;
		align-items: center;
	}

	.child_head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;

	}

	.child_head .nums {
		font-size: 18px;
		font-weight: 500;
		color: #1D2732;
	}

	.isOpen {
		display: flex;
		align-items: center;
	}

	.child_head image {
		width: 16px;
		height: 16px;
		margin-left: 4px;
	}

	.comment_item_2 {
		background: #F5F8FB;
		border-radius: 4px;
		font-size: 13px;
		font-weight: 400;
		color: #9EAEC1;
		line-height: 13px;
		padding: 10px;
	}
</style>
